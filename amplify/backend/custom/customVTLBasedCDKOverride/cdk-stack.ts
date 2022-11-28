import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import * as path from 'path';
import * as fs from 'fs';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
  
    // Access other Amplify Resources 
    const retVal: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this, 
      amplifyResourceProps.category, 
      amplifyResourceProps.resourceName, 
      [{
        category: "api",
        resourceName: "jsresolvers"
      }]
    );

    const apiId = cdk.Fn.ref(retVal.api.jsresolvers.GraphQLAPIIdOutput);

    const vtlFunction = new appsync.CfnFunctionConfiguration(this as unknown as any, 'myCustomVTLFunction', {
      apiId,
      dataSourceName: 'NONE_DS',
      functionVersion: '2018-05-29',
      name: 'myCustomVTLFunction',
      requestMappingTemplate: `$util.toJson({})`,
      responseMappingTemplate: `#set( $data = $context.prev.result )
$util.qr($data.put("cdkBasedVTLOverride", "I was set by a cdk-based VTL resolver"))
$util.toJson($data)`,
    });

    const jsFunction = new cdk.CfnResource(this, 'myCustomJSFunction', {
      type: 'AWS::AppSync::FunctionConfiguration',
      properties: {
        ApiId: apiId,
        Code: fs.readFileSync(path.join(__dirname, '..', 'resolvers', 'simpleResolver.js'), 'utf-8'),
        DataSourceName: 'NONE_DS',
        Name: 'myCustomJSFunction',
        Runtime: { 
          Name: 'APPSYNC_JS',
          RuntimeVersion: '1.0.0',
        },
      }
    });

    new appsync.CfnResolver(this as unknown as any, 'myCustomResolver', {
      apiId,
      typeName: 'Query',
      fieldName: 'myCustomQuery',
      kind: 'PIPELINE',
      pipelineConfig: {
        functions: [
          vtlFunction.attrFunctionId,
          jsFunction.getAtt('FunctionId').toString(),
        ]
      },
      requestMappingTemplate: '$util.toJson({})',
      responseMappingTemplate: '$util.toJson($ctx.prev.result)',
    });
  }
}

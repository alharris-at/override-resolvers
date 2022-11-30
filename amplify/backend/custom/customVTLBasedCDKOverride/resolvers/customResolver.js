import { util } from '@aws-appsync/utils';

/**
 * No-op pipeline request.
 */
export function request() {
  return {};
}

/**
 * Returns the previous response
 * @param ctx the request context
 */
export function response(ctx) {
  const data = ctx.prev.result;
  data.cdkBasedJSOverride = 'I was set by a cdk-based JS resolver';
  data.id = util.autoId();
  return data;
}
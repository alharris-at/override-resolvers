/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const myCustomQuery = /* GraphQL */ `
  query MyCustomQuery {
    myCustomQuery
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      fileBasedVTLOverride
      fileBasedJSOverride
      id
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        fileBasedVTLOverride
        fileBasedJSOverride
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      content
      content_es
      id
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        content
        content_es
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

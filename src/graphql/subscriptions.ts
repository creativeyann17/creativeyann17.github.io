/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateArticle = /* GraphQL */ `
  subscription OnCreateArticle($filter: ModelSubscriptionArticleFilterInput) {
    onCreateArticle(filter: $filter) {
      id
      name
      views
      likes
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateArticle = /* GraphQL */ `
  subscription OnUpdateArticle($filter: ModelSubscriptionArticleFilterInput) {
    onUpdateArticle(filter: $filter) {
      id
      name
      views
      likes
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteArticle = /* GraphQL */ `
  subscription OnDeleteArticle($filter: ModelSubscriptionArticleFilterInput) {
    onDeleteArticle(filter: $filter) {
      id
      name
      views
      likes
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

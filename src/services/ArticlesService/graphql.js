import { gql } from '@apollo/client';

export const getViewArticleQuery = gql`
  query getViewArticleQuery($article: String!) {
    getViewArticle(article: $article) {
      article
      count
    }
  }
`;

export const postViewArticleQuery = gql`
  mutation postViewArticleQuery($article: String!) {
    postViewArticle(article: $article) {
      article
      count
    }
  }
`;

export const getLikeArticleQuery = gql`
  query getLikeArticleQuery($article: String!) {
    getLikeArticle(article: $article) {
      article
      count
    }
  }
`;

export const postLikeArticleQuery = gql`
  mutation postLikeArticleQuery($article: String!) {
    postLikeArticle(article: $article) {
      article
      count
    }
  }
`;

export const PROD = process.env.NODE_ENV === 'production';
export const DEV = !PROD;

export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
export const API_URL = process.env.REACT_APP_API_URL;

export const BACK_TO_TOP_THRESHOLD = 100;
export const GLOBAL_REQUEST_TIMEOUT = 5;

export const REDIRECT = process.env.REACT_APP_REDIRECT;
export const AWS = process.env.REACT_APP_AWS === "true"

export const useGraphQL = process.env.REACT_APP_USE_GRAPHQL === "true";

export const WEBSOCKET_RETRY = {
  DELAY: 5000,
  MAX_ATTEMPTS: 10,
};

export const ROUTER_PREFIX = '/#';

const ROUTES_PREFIX = '/';

export const ROUTES = {
  HOME: ROUTES_PREFIX,
  ARTICLES: ROUTES_PREFIX + 'articles',
  ARTICLE: ROUTES_PREFIX + 'article',
  SEARCH: ROUTES_PREFIX + 'search',
  ABOUT: ROUTES_PREFIX + 'about',
  EXTERNALS: {
    GITHUB: 'https://github.com/creativeyann17',
    GITHUB_PAGE: 'https://github.com/creativeyann17/creativeyann17.github.io',
    GITHUB_PRIVACY: 'https://docs.github.com/en/github/site-policy/github-privacy-statement',
    GITHUB_TOS: 'https://docs.github.com/en/github/site-policy/github-terms-of-service',
    LINKED_IN: 'https://www.linkedin.com/in/yann-marcou-21280267',
    TWITTER: 'https://twitter.com/CreativeYann17',
    INSTAGRAM: 'https://www.instagram.com/yannou17',
  },
};

export const TAGS = {
  CLOUD: 'cloud',
  MICRONAUT: 'micronaut',
  REACT: 'react',
  SPRING_BOOT: 'spring-boot',
  GOLANG: 'golang',
};

export const NEWS_PAGINATION = 5;

export const ARTICLES_JSON = '/articles.json';
export const NEWS_JSON = '/news.json';

export const ARTICLES_FOLDER = '/articles';
export const THUMBNAILS_FOLDER = '/thumbnails';

export const ARTICLE_IS_NEW_UP_TO_DAYS = 5;

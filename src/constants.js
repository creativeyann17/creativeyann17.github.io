export const PROD = process.env.NODE_ENV === 'production';
export const DEV = !PROD;

export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
export const API_URL = process.env.REACT_APP_API_URL;

export const BACK_TO_TOP_THRESHOLD = 100;
export const GLOBAL_REQUEST_TIMEOUT = 5;

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
    LINKED_IN: 'https://www.linkedin.com/in/yann-marcou-21280267/',
    TWITTER: 'https://twitter.com/CreativeYann17',
  },
};

export const TAGS = {
  SPRING_BOOT: 'spring-boot',
  MICRONAUT: 'micronaut',
  REACT: 'react',
};

export const NEWS_PAGINATION = 3;

export const ARTICLES_JSON = '/articles.json';
export const NEWS_JSON = '/news.json';

export const ARTICLES_FOLDER = '/articles';
export const THUMBNAILS_FOLDER = '/thumbnails';

export const ARTICLE_IS_NEW_UP_TO_DAYS = 5;

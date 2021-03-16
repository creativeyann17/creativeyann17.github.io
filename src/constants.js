export const PROD = process.env.NODE_ENV === 'production';
export const DEV = !PROD;

export const BACK_TO_TOP_THRESHOLD = 100;
export const GLOBAL_REQUEST_TIMEOUT = 5;

const ROUTES_PREFIX = '/';

export const ROUTES = {
  HOME: ROUTES_PREFIX,
  ARTICLES: ROUTES_PREFIX + 'articles',
  ARTICLE: ROUTES_PREFIX + 'article',
  SEARCH: ROUTES_PREFIX + 'search',
  EXTERNALS: {
    GITHUB: 'https://github.com/creativeyann17',
    GITHUB_PAGE: 'https://github.com/creativeyann17/creativeyann17.github.io',
    GITHUB_PRIVACY: 'https://docs.github.com/en/github/site-policy/github-privacy-statement',
    GITHUB_TOS: 'https://docs.github.com/en/github/site-policy/github-terms-of-service',
    LINKEDIN: 'https://www.linkedin.com/in/yann-marcou-21280267/',
  },
};

export const TAGS = {
  SPRING_BOOT: 'spring-boot',
  MICRONAUT: 'micronaut',
};

export const ARTICLES_JSON = '/articles.json';

export const ARTICLES_FOLDER = '/articles';
export const THUMBAILS_FOLDER = '/thumbnails';

export const ARTICLE_IS_NEW_UP_TO_DAYS = 5;

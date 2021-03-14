export const PROD = process.env.NODE_ENV === 'production';
export const DEV = !PROD;

const ROUTES_PREFIX = '/';

export const ROUTES = {
  HOME: ROUTES_PREFIX,
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

export const ARTICLES_JSON = '/articles.json';

export const ARTICLES_FOLDER = '/articles/';
export const THUMBAILS_FOLDER = '/thumbnails/';

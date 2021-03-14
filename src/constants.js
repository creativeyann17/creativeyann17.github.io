export const PROD = process.env.NODE_ENV === 'production';
export const DEV = !PROD;

// in case we want to switch between HashRouter / BrowserRouter
const ROUTES_PREFIX = '/';

export const ROUTES = {
  HOME: ROUTES_PREFIX,
  ARTICLES: ROUTES_PREFIX + 'articles',
  SEARCH: ROUTES_PREFIX + 'search',
  EXTERNALS: {
    GITHUB: 'https://github.com/creativeyann17',
    GITHUB_PRIVACY: 'https://docs.github.com/en/github/site-policy/github-privacy-statement',
    GITHUB_TOS: 'https://docs.github.com/en/github/site-policy/github-terms-of-service',
    LINKEDIN: 'https://www.linkedin.com/in/yann-marcou-21280267/',
  },
};

export const ARTICLES = 'articles.json';
export const THUMBAILS = 'thumbnails/';

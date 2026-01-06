/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_GA_TRACKING_ID: string;
  readonly VITE_REACT_APP_GA_SITE_VERIFICATION: string;
  readonly VITE_REACT_APP_API_URL: string;
  readonly VITE_REACT_APP_USE_GRAPHQL: string;
  readonly VITE_REACT_APP_REDIRECT: string;
  readonly VITE_REACT_APP_AWS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

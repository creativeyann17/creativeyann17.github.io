import { ROUTES } from '../constants';

export const externalLink = (path, label) => (
  <a target="_blank" rel="noreferrer" href={path}>
    {label}
  </a>
);

export const buildArticleUrl = (article) =>
  `${window.location.origin.toString()}${ROUTES.ARTICLE}/${article.id}`;

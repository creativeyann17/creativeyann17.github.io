import { ROUTES } from '../constants';

export const openExternalLink = (link) => {
  window.open(link, '_blank');
};

export const externalLink = (path, label) => (
  <a target="_blank" rel="noreferrer" href={path}>
    {label}
  </a>
);

export const externalIconLink = (path, icon) => (
  <a target="_blank" rel="noreferrer" href={path}>
    <img src={icon} alt={`external-links-to-${path}`} width={32} />
  </a>
);

export const buildArticleUrl = (article) =>
  `${window.location.origin.toString()}${ROUTES.ARTICLE}/${article.id}`;

import { ROUTES } from '../constants';

export const stopEvent = (event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
};

// routing

export const openArticleById = (history, id, event) => {
  stopEvent(event);
  history.push(`${ROUTES.ARTICLE}/${id}`);
};

export const openSearchByFilter = (history, filter, event) => {
  stopEvent(event);
  history.push(`${ROUTES.SEARCH}/${filter}`);
};

export const openInternalLink = (history, path, event) => {
  stopEvent(event);
  history.push(path);
};

export const openExternalLink = (link, event) => {
  stopEvent(event);
  window.open(link, '_blank');
};

// render

export const renderExternalLinkByUrlAndLabel = (url, label) => (
  <a target="_blank" rel="noreferrer" href={url}>
    {label}
  </a>
);

export const renderExternalLinkByUrlAndIcon = (url, icon) => (
  <a target="_blank" rel="noreferrer" href={url}>
    <img src={icon} alt={`external-links-to-${url}`} width={32} />
  </a>
);

// toString

export const getArticleUrl = (article) =>
  `${window.location.origin.toString()}${ROUTES.ARTICLE}/${article.id}`;

import { ROUTES } from '../constants';
import filter from 'lodash/filter';
import toLower from 'lodash/toLower';
import trim from 'lodash/trim';
import replace from 'lodash/replace';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import words from 'lodash/words';
import { DEV, ARTICLE_IS_NEW_UP_TO_DAYS } from '../constants';

export const debug = (message, ...args) => {
  if (DEV) {
    if (!isEmpty(args)) {
      console.log(message, args);
    } else {
      console.log(message);
    }
  }
};

export const stopEvent = (event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
};

export const sanitizeText = (text) => replace(text, /[^a-zA-Z0-9-_@ ]/g, '');

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

export const renderExternalLinkByUrlAndLabel = (url, label, className) => (
  <a target="_blank" rel="noreferrer" href={url} className={className}>
    {label}
  </a>
);

export const renderExternalLinkByUrlAndIcon = (url, icon, className) => (
  <a target="_blank" rel="noreferrer" href={url} className={className}>
    <img src={icon} alt={`external-links-to-${url}`} height={32} width={32} />
  </a>
);

// toString

export const getArticleUrl = (article) =>
  `${window.location.origin.toString()}${ROUTES.ARTICLE}/${article.id}`;

// articles

export const findFeaturedArticle = (articles) => find(articles, { featured: true });

const ONE_DAY = 1000 * 60 * 60 * 24;

export const isArticleNew = (article) => {
  const date = Date.parse(article.date);
  const now = new Date();
  const diff = Math.abs(now - date);
  return Math.round(diff / ONE_DAY) <= ARTICLE_IS_NEW_UP_TO_DAYS;
};

export const findArticlesByFilter = (articles, searchFiler) => {
  const filterWords = words(
    replace(replace(toLower(trim(sanitizeText(searchFiler))), '-', ' '), '_', ' ')
  ); // could be from query param, need to be cleaned
  return filter(articles, (article) => {
    // using indirect return because easier to read than direct return
    return !isEmpty(
      filter(filterWords, (word) => {
        return !isEmpty(
          filter(article.tags, (tag) => {
            return contains(tag, word);
          })
        );
      })
    );
  });
};

const contains = (str1, str2) => !isEmpty(str2) && str1.indexOf(str2) !== -1;

import { ROUTES } from '../constants';
import filter from 'lodash/filter';
import toLower from 'lodash/toLower';
import trim from 'lodash/trim';
import replace from 'lodash/replace';
import split from 'lodash/split';
import isEmpty from 'lodash/isEmpty';
import toString from 'lodash/toString';
import { DEV } from '../constants';

export const debug = (message, ...args) => {
  if (DEV) {
    if (!isEmpty) {
      console.log(message, toString(args));
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

// search

export const findArticlesByFilter = (articles, searchFiler) => {
  const filterWords = split(replace(replace(toLower(trim(searchFiler)), '-', ' '), '_', ' '), ' '); // could be from query param, need to be cleaned
  return filter(articles, (article) => {
    // easier to read than direct return
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

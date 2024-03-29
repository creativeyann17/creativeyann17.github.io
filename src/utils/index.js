import { Col, Pagination } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { ArticleCard } from '../components';
import filter from 'lodash/filter';
import toLower from 'lodash/toLower';
import trim from 'lodash/trim';
import replace from 'lodash/replace';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import words from 'lodash/words';
import size from 'lodash/size';
import round from 'lodash/round';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTER_PREFIX } from '../constants';
import { DEV, ARTICLE_IS_NEW_UP_TO_DAYS, API_URL } from '../constants';

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

export const buildAPIRequestUrl = (path) => {
  return API_URL ? new URL(path, window.location.protocol + '//' + API_URL).toString() : "";
};

// routing

export const openArticleById = (history, id, event) => {
  stopEvent(event);
  history.push(`${ROUTES.ARTICLE}/${id}`);
};

export const openSearchByFilter = (history, filter, event) => {
  stopEvent(event);
  const searchFilter = trim(sanitizeText(filter));
  if (!isEmpty(searchFilter)) {
    history.push(`${ROUTES.SEARCH}/${searchFilter}`);
  }
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

export const renderInternalLinkToArticleId = (article, className) => (
  <Link className={className} title={'Open article ' + article} to={`${ROUTES.ARTICLE}/${article}`}>
    article
  </Link>
);

export const renderExternalLinkByUrlAndLabel = (url, label, className) => (
  <a
    target="_blank"
    rel="noreferrer"
    href={url}
    className={className}
    title={'Open a new page to ' + url}>
    {label}
  </a>
);

export const renderExternalLinkByUrlAndIcon = (url, icon, className) => (
  <a
    target="_blank"
    rel="noreferrer"
    href={url}
    className={className}
    title={'Open a new page to ' + url}>
    <img src={icon} alt={`external-links-to-${url}`} height={32} width={32} />
  </a>
);

export const renderArticleInsideColumn = (article, withFeatured = false) => (
  <Col md={4} lg={3} key={article.id} className="d-flex align-items-stretch">
    <FadeIn>
      <ArticleCard key={article.id} article={article} withFeatured={withFeatured} />
    </FadeIn>
  </Col>
);

export const renderAnchorFromName = (name) =>
  replace(replace(toLower(name), /[^a-zA-Z0-9 ]/g, ''), / /g, '-');

export const renderPagination = (array, maxPageSize, selectedPage, callback) => {
  const countOfPages = round(size(array) / maxPageSize);
  let items = [];
  for (let number = 1; number <= countOfPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === selectedPage}
        onClick={() => callback(number)}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div className="center">
      <Pagination>{items}</Pagination>
    </div>
  );
};

// toString

export const getArticleUrl = (article) =>
  `${window.location.origin.toString()}${ROUTER_PREFIX}${ROUTES.ARTICLE}/${article.id}`;

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

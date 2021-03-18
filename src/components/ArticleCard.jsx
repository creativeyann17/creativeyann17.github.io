import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import cx from 'classnames';
import map from 'lodash/map';
import { useHistory } from 'react-router-dom';
import { THUMBNAILS_FOLDER } from '../constants';
import { openArticleById, openSearchByFilter } from '../utils';
import ArticleDetails from './ArticleDetails';

const ArticleCard = ({ className, article }) => {
  const history = useHistory();
  const renderTag = (badge) => {
    return (
      <Badge
        role="button"
        aria-label="Search all articles that match this tag"
        className="article-card-badge mb-2 mr-2"
        key={badge}
        variant="light"
        onClick={() => openSearchByFilter(history, badge)}>
        {badge}
      </Badge>
    );
  };
  return (
    <Card className={cx('article-card', className, 'mb-3')}>
      {article.featured && <Card.Header>Featured article</Card.Header>}
      <Card.Img
        role="button"
        aria-label="Open the article"
        alt={article.thumbnail}
        variant="top"
        src={`${THUMBNAILS_FOLDER}/${article.thumbnail}`}
        onClick={() => openArticleById(history, article.id)}
      />
      <Card.Body>
        <ArticleDetails article={article} />
        <Card.Text>{article.description}</Card.Text>
        <Card.Text>{map(article.tags, renderTag)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;

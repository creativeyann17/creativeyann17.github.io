import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import map from 'lodash/map';
import { useHistory } from 'react-router-dom';
import { THUMBAILS_FOLDER, ROUTES } from '../constants';
import ArticleDetails from './ArticleDetails';

const ArticleCard = ({ article }) => {
  const history = useHistory();
  const renderTag = (badge) => {
    return (
      <Badge key={badge} variant="light" onClick={() => handleSearch(badge)}>
        {badge}
      </Badge>
    );
  };
  const handleCardClick = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    history.push(`${ROUTES.ARTICLE}/${id}`);
  };
  const handleSearch = (searchFilter) => {
    history.push(`${ROUTES.SEARCH}/${searchFilter}`);
  };
  return (
    <Card>
      <Card.Img
        variant="top"
        src={`${THUMBAILS_FOLDER}${article.thumbnail}`}
        onClick={(e) => handleCardClick(e, article.id)}
      />
      <Card.Body>
        <ArticleDetails article={article} />
        <Card.Text className="with-margin-top">{article.description}</Card.Text>
        <Card.Text>{map(article.tags, renderTag)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;

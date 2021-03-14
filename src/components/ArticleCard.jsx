import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import map from 'lodash/map';
import { MdUpdate } from 'react-icons/md';
import { BiGitRepoForked } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { THUMBAILS, ROUTES } from '../constants';
import { externalLink } from '../utils/utils';

const ArticleCard = ({ article }) => {
  const history = useHistory();
  const renderTag = (badge) => {
    return (
      <Badge key={badge} variant="light">
        {badge}
      </Badge>
    );
  };
  const handleCardClick = (event, id) => {
    event.preventDefault();
    history.push(`${ROUTES.ARTICLES}/${id}`);
  };
  return (
    <Card key={article.id}>
      <Card.Img
        variant="top"
        src={`${THUMBAILS}${article.thumbnail}`}
        onClick={(e) => handleCardClick(e, article.id)}
      />
      <Card.Body>
        <Card.Text className="details">
          <MdUpdate /> {article.date}
          <BiGitRepoForked />
          {externalLink(article.repository, 'sources')}
        </Card.Text>
        <Card.Text>{article.description}</Card.Text>
        <Card.Text>{map(article.tags, renderTag)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;

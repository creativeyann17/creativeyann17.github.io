import React from 'react';
import { Badge } from 'react-bootstrap';
import { MdUpdate, MdTimer } from 'react-icons/md';
import { BiGitRepoForked } from 'react-icons/bi';
import { externalLink } from '../utils/utils';

// https://react-icons.github.io/react-icons/search?q=top

const ArticleDetails = ({ article, promo }) => {
  return (
    <div className="article-details">
      <span className="attribute">
        <MdUpdate /> {article.date}
      </span>
      <span className="attribute">
        <BiGitRepoForked />
        {externalLink(article.repository, 'sources')}
      </span>
      <span className="attribute">
        <MdTimer />
        {`${article.time} min`}
      </span>
      {article.promo && <Badge variant="success">new</Badge>}
    </div>
  );
};

export default ArticleDetails;

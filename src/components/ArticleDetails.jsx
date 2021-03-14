import React from 'react';
import { MdUpdate, MdTimer } from 'react-icons/md';
import { BiGitRepoForked } from 'react-icons/bi';
import { externalLink } from '../utils/utils';

// https://react-icons.github.io/react-icons/search?q=top

const ArticleDetails = ({ article }) => {
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
    </div>
  );
};

export default ArticleDetails;

import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { getTableOfContents } from '../../services/ArticlesService/selectors';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

const TableOfContents = ({ tableOfContents }) => {
  if (isEmpty(tableOfContents)) return null;

  const renderContent = (content) => (
    <HashLink to={`#${content.tag}`} role="button" aria-label={`go to ${content.title}`}>
      {content.title}
    </HashLink>
  );

  const renderWithLevel = (content, index) => {
    const renderedContent = renderContent(content);
    switch (content.level) {
      case 1:
        return <li key={index}>{renderedContent}</li>;
      case 2:
        return (
          <ul key={index}>
            <li>{renderedContent}</li>
          </ul>
        );
      case 3:
        return (
          <ul key={index}>
            <ul>
              <li>{renderedContent}</li>
            </ul>
          </ul>
        );
      default:
        return <li key={index}>{renderedContent}</li>;
    }
  };

  return (
    <div className="table-of-contents">
      <h1>Table of contents</h1>
      <ul>{map(tableOfContents, (content, index) => renderWithLevel(content, index))}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tableOfContents: getTableOfContents(state),
  };
};

export default connect(mapStateToProps)(TableOfContents);

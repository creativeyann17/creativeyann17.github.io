import React from 'react';
import { connect } from 'react-redux';
import { renderAnchorFromName } from '../../utils';
import { articlesPushArticleContent } from '../../services/ArticlesService/actions';

const Headings = ({ level, children, pushArticleContent }) => {
  // Access actual (string) value of heading
  const heading = children[0].props.value;

  // If we have a heading, make it lower case
  let anchor = typeof heading === 'string' ? renderAnchorFromName(heading) : '';

  pushArticleContent({ level: level, title: heading, tag: anchor });

  // Utility
  const container = (children) => (
    <div>
      <div className="anchor" id={anchor} />
      <span>{children}</span>
    </div>
  );

  switch (level) {
    case 1:
      return <h1>{container(children)}</h1>;
    case 2:
      return <h2>{container(children)}</h2>;
    case 3:
      return <h3>{container(children)}</h3>;

    default:
      return <h6>{container(children)}</h6>;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushArticleContent: (content) => dispatch(articlesPushArticleContent(content)),
  };
};

export default connect(null, mapDispatchToProps)(Headings);

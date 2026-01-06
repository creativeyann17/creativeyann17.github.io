import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { renderAnchorFromName } from '../../utils';
import { articlesPushArticleContent } from '../../services/ArticlesService/actions';

const HeadingBase = ({ level, children, pushArticleContent }) => {
  // Access actual (string) value of heading
  // In react-markdown v9, children is now the text content directly
  const heading = typeof children === 'string' ? children : (children && children[0] ? String(children[0]) : '');

  // If we have a heading, make it lower case
  let anchor = typeof heading === 'string' ? renderAnchorFromName(heading) : '';

  useEffect(() => {
    pushArticleContent({ level: level, title: heading, tag: anchor });
  }, [level, heading, anchor, pushArticleContent]);

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
    case 4:
      return <h4>{container(children)}</h4>;
    case 5:
      return <h5>{container(children)}</h5>;
    case 6:
      return <h6>{container(children)}</h6>;
    default:
      return <h6>{container(children)}</h6>;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushArticleContent: (content) => dispatch(articlesPushArticleContent(content)),
  };
};

const ConnectedHeading = connect(null, mapDispatchToProps)(HeadingBase);

// Export wrapper components for each heading level
export const H1 = (props) => <ConnectedHeading level={1} {...props} />;
export const H2 = (props) => <ConnectedHeading level={2} {...props} />;
export const H3 = (props) => <ConnectedHeading level={3} {...props} />;
export const H4 = (props) => <ConnectedHeading level={4} {...props} />;
export const H5 = (props) => <ConnectedHeading level={5} {...props} />;
export const H6 = (props) => <ConnectedHeading level={6} {...props} />;

export default ConnectedHeading;

import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { articlesResetTableOfContents } from '../../services/ArticlesService/actions';
import Loading from '../Loading';
import CodeBlock from './CodeBlock';
import { H1, H2, H3, H4, H5, H6 } from './Headings';

import './style.css';

// using component for fun :)
class Markdown extends Component {
  constructor(props) {
    super(props);
    this.state = { text: null };
  }

  componentDidMount() {
    this.props.resetTableOfContents();
    fetch(this.props.source)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        this.setState({ text });
      });
  }

  componentWillUnmount() {
    this.props.resetTableOfContents();
  }

  render() {
    const { text } = this.state;
    return (
      <div className="markdown">
        {text ? (
          <ReactMarkdown
            className="markdown-body"
            components={{ code: CodeBlock, h1: H1, h2: H2, h3: H3, h4: H4, h5: H5, h6: H6 }}
          >
            {text}
          </ReactMarkdown>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetTableOfContents: () => dispatch(articlesResetTableOfContents()),
  };
};

export default connect(null, mapDispatchToProps)(Markdown);

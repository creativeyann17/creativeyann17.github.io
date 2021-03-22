import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { articlesResetTableOfContents } from '../../services/ArticlesService/actions';
import Loading from '../Loading';
import CodeBlock from './CodeBlock';
import Headings from './Headings';

import './style.css';

// using component for fun :)
class Markdown extends Component {
  constructor(props) {
    super(props);
    this.state = { text: null };
  }

  componentDidMount() {
    fetch(this.props.source)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        this.setState({ text });
      });
  }

  render() {
    const { text } = this.state;
    this.props.resetTableOfContents();
    return (
      <div className="markdown">
        {text ? (
          <ReactMarkdown
            className="markdown-body"
            source={text}
            linkTarget="_blank"
            renderers={{ code: CodeBlock, heading: Headings }}
          />
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

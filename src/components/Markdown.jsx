import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import CodeBlock from './CodeBlock';

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
    return (
      <div className="markdown">
        {text && <ReactMarkdown source={text} renderers={{ code: CodeBlock }} />}
      </div>
    );
  }
}

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Markdown;

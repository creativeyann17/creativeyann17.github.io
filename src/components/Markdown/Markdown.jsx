import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
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
    return (
      <div className="markdown">
        {text ? (
          <ReactMarkdown
            className="markdown-body"
            source={text}
            renderers={{ code: CodeBlock, heading: Headings }}
          />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default Markdown;

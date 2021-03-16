import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

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
        {text && <ReactMarkdown source={text} renderers={{ code: CodeBlock }} />}
      </div>
    );
  }
}

export default Markdown;

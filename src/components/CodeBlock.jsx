import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD
import { duotoneSea } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={duotoneSea}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;

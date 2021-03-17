import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// My peak: coldarkDark coldarkCold okaidia tomorrow vscDarkPlus vs nord materialOceanic materialDark dracula
const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;

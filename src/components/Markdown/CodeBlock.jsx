import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// My peak: coldarkDark coldarkCold okaidia tomorrow vscDarkPlus vs nord materialOceanic materialDark dracula
const CodeBlock = ({ inline, className, children, node, ...props }) => {
  // In react-markdown v9, language is in className as "language-xxx"
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  // Check if it's inline code
  // Inline code: no className with language, or explicitly marked inline, or no newlines
  const isInline = inline || !match || !String(children).includes('\n');

  // Render inline code differently from code blocks
  if (isInline) {
    return <code className={className}>{children}</code>;
  }

  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;

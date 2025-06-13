import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const CodeHighlighter = ({ code, language = "react" }) => {
  return (
    <SyntaxHighlighter language={language} style={docco} >
      {code}
    </SyntaxHighlighter>
  );
};

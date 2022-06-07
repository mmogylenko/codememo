import './syntax.css';
import React from 'react';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import MonacoEditor from '@monaco-editor/react';

import styles from './CodeEditor.module.scss';

interface CodeEditorProps {
  onChange(value: string): void;
  value: string;
}

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const onEditorChange = (code: string | undefined) => {
    props.onChange(code || '');
  };

  const onFormatClick = () => {
    const code = prettier
      .format(props.value, {
        parser: 'babel',
        plugins: [parserBabel],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    props.onChange(code);
  };

  return (
    <div id="editor-wrapper" className={styles['editor-wrapper']}>
      <button
        className={`button button-format is-primary is-small ${styles['button-format']}`}
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        defaultValue="const a = 1;"
        value={props.value}
        onChange={onEditorChange}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
        theme="vs-dark"
        language="javascript"
        height="100%"
      />
    </div>
  );
};
export default CodeEditor;

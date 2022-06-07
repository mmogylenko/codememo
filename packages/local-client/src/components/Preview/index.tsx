import React from 'react';
import { useEffect, useRef } from 'react';

import styles from './Preview.module.scss';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <style> html { background-color: white; }></style>
  </head>
  <body>
    <div id="root"></div>
    <script>
        const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime error:</h4>' + err + '</div>';
            console.error(err);
        };
        window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.err);
        });
        window.addEventListener('message', (event) => {
            try {
                eval(event.data);
            } catch (err) {
                handleError(err);
            }
        }, false);
    </script>
  </body>
</html>
    `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;

    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className={styles['preview-wrapper']}>
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && <div className={styles['preview-error']}>{err}</div>}
    </div>
  );
};

export default Preview;

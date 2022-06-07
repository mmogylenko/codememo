import React, { useEffect } from 'react';
import CodeEditor from '../CodeEditor';
import Resizable from '../Resizable';
import Preview from '../Preview';
import { Cell } from '../../state';
import { useActions, useTypedSelector, useCumulativeCode } from '../../hooks';
import styles from './CodeCell.module.scss';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  // @ts-ignore
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className={styles['code-cell']}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCell(cell.id, value)}
            value={cell.content}
          />
        </Resizable>
        <div className={styles.preview__wrapper}>
          {!bundle || bundle.loading ? (
            <div className={styles['progress__wrapper']}>
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;

import React from 'react';
import { Cell } from '../../state';
import CodeCell from '../CodeCell';
import TextEditor from '../TextEditor';
import ActionBar from '../ActionBar';
import styles from './CellListItem.module.scss';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <>
        <div className={styles['action-bar-wrapper']}>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor id={cell.id} content={cell.content} type={cell.type} />
        <ActionBar id={cell.id} />
      </>
    );
  }

  return <div className={styles['cell-list-item']}>{child}</div>;
};

export default CellListItem;

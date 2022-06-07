import React from 'react';
import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../../hooks';
import AddCell from '../AddCell';
import CellListItem from '../CellListItem';
import styles from './CellList.module.scss';
import { useActions } from '../../hooks';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id}></AddCell>
    </Fragment>
  ));
  return (
    <div className={styles['cell-list']}>
      <AddCell
        key="z"
        visible={cells.length === 0}
        previousCellId={null}
      ></AddCell>
      {renderedCells}
    </div>
  );
};

export default CellList;

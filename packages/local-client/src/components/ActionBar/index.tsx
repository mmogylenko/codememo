import React from 'react';
import { useCallback } from 'react';
import { useActions } from '../../hooks';

import IconButton from '../IconButton';

import styles from './ActionBar.module.scss';

interface ActionBarProps {
  id: string;
}
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  const handleUpClick = useCallback(() => {
    moveCell(id, 'up');
  }, [id, moveCell]);

  const handleDownClick = useCallback(() => {
    moveCell(id, 'down');
  }, [id, moveCell]);

  const handleDeleteClick = useCallback(() => {
    deleteCell(id);
  }, [id, deleteCell]);

  return (
    <div className={styles['action-bar']}>
      <IconButton iconClassName="fas fa-arrow-up" onClick={handleUpClick} />
      <IconButton iconClassName="fas fa-arrow-down" onClick={handleDownClick} />
      <IconButton iconClassName="fas fa-times" onClick={handleDeleteClick} />
    </div>
  );
};

export default ActionBar;

import { useCallback } from 'react';
import { useActions } from '../../hooks';
import IconButton from '../IconButton';
import styles from './AddCell.module.scss';

type AddCellProps = {
  previousCellId: string | null;
  visible?: boolean;
};

const AddCell: React.FC<AddCellProps> = ({ previousCellId, visible }) => {
  const { insertCellAfter } = useActions();

  const handleAddCodeCell = useCallback(() => {
    insertCellAfter(previousCellId, 'code');
  }, [insertCellAfter, previousCellId]);

  const handleAddTextCell = useCallback(() => {
    insertCellAfter(previousCellId, 'text');
  }, [insertCellAfter, previousCellId]);

  return (
    <div
      className={`${styles['add-cell']} ${
        visible ? styles['add-cell--force-visible'] : ''
      } `}
    >
      <div className={styles['add-cell__buttons-wrapper']}>
        <IconButton
          onClick={handleAddCodeCell}
          buttonClassName={`button is-rounded is-primary is-small ${styles['add-cell__button']}`}
          iconClassName="fas fa-plus is-small"
        >
          Code
        </IconButton>
        <IconButton
          onClick={handleAddTextCell}
          buttonClassName={`button is-rounded is-primary is-small ${styles['add-cell__button']}`}
          iconClassName="fas fa-plus is-small"
        >
          Text
        </IconButton>
        <div className={styles['add-cell__divider']}></div>
      </div>
    </div>
  );
};

export default AddCell;

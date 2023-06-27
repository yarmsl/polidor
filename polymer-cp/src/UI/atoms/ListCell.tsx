import { FC, memo, useCallback, useMemo } from 'react';

import Link from '@mui/material/Link';

import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import ListModal from '~/UI/atoms/ListModal';

const ListCell: FC<IListCellProps> = ({ title, listData }) => {
  const dispatch = useAppDispatch();

  const text = useMemo(() => listData?.map((ld) => ld.title)?.join(', ') || '', [listData]);

  const openListModal = useCallback(
    () => dispatch(openModal(<ListModal listData={listData} title={title} />)),
    [dispatch, listData, title],
  );
  return (
    <>
      <Link
        sx={{
          display: 'block',
          cursor: 'pointer',
          maxWidth: '200px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        onClick={openListModal}
      >
        {text}
      </Link>
    </>
  );
};

export default memo(ListCell);

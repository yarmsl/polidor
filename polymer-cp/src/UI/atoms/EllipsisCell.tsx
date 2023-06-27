import { FC, memo, useCallback } from 'react';

import Link from '@mui/material/Link';

import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import SimpleModal from '~/UI/atoms/SimpleModal';

const EllipsisCell: FC<IEllipsisCellProps> = ({ title, value, length = 16 }) => {
  const dispatch = useAppDispatch();
  const openFullValueModal = useCallback(
    () => dispatch(openModal(<SimpleModal text={value} title={title} />)),
    [dispatch, title, value],
  );
  if (value.length < length) return <>{value}</>;
  return (
    <>
      <Link sx={{ cursor: 'pointer' }} onClick={openFullValueModal}>{`${value.substring(
        0,
        16,
      )}...`}</Link>
    </>
  );
};

export default memo(EllipsisCell);

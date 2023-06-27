import { memo } from 'react';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Icon from '@mui/material/Icon';
import TableCell from '@mui/material/TableCell';

import { str2rusDate } from '~/lib/Dates';
import EllipsisCell from '~/UI/atoms/EllipsisCell';

const SuperCell = <T extends IBase>({
  config: { render, title, id, ellipsis, type },
  rowData,
}: ISuperCellProps<T>) => {
  if (rowData[id] == null)
    return (
      <TableCell>
        <Icon color='error'>
          <ClearRoundedIcon />
        </Icon>
      </TableCell>
    );

  if (render) return <TableCell>{render(rowData)}</TableCell>;

  if (type === 'date') return <TableCell>{str2rusDate(`${rowData[id]}`)}</TableCell>;

  if (type === 'boolean') {
    if (rowData[id])
      return (
        <TableCell>
          <Icon color='success'>
            <CheckRoundedIcon />
          </Icon>
        </TableCell>
      );
    return (
      <TableCell>
        <Icon color='warning'>
          <ClearRoundedIcon />
        </Icon>
      </TableCell>
    );
  }

  if (ellipsis)
    return (
      <TableCell>
        <EllipsisCell title={title} value={`${rowData[id]}`} />
      </TableCell>
    );

  return <TableCell>{`${rowData[id]}`}</TableCell>;
};

export default memo(SuperCell) as typeof SuperCell;

import { memo } from 'react';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import SuperCell from '~/UI/atoms/SuperCell';

const SuperTable = <T extends IBase>({
  isLoading,
  data,
  config,
  onEdit,
  onDelete,
  onOpen,
  ...rest
}: ISuperTableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Box sx={styles.loader}>{isLoading && <LinearProgress color='info' />}</Box>
      <Table {...rest}>
        <TableHead>
          <TableRow>
            {config.map(({ title, id }) => (
              <TableCell key={`head-${String(id)}`}>{title}</TableCell>
            ))}
            {onEdit ? <TableCell>Изменить</TableCell> : null}
            {onDelete ? <TableCell>Удалить</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((rowData) => (
            <TableRow key={`body-${rowData._id}`}>
              {config.map((conf) => (
                <SuperCell
                  key={`cell-${rowData._id}-${String(conf.id)}`}
                  config={conf}
                  rowData={rowData}
                />
              ))}
              {onEdit ? (
                <TableCell>
                  <IconButton color='warning' disabled={isLoading} onClick={() => onEdit(rowData)}>
                    <EditRoundedIcon />
                  </IconButton>
                </TableCell>
              ) : null}
              {onDelete ? (
                <TableCell>
                  <IconButton color='error' disabled={isLoading} onClick={() => onDelete(rowData)}>
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </TableCell>
              ) : null}
              {onOpen ? (
                <TableCell>
                  <IconButton color='success' disabled={isLoading} onClick={() => onOpen(rowData)}>
                    <FileOpenRoundedIcon />
                  </IconButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const styles: TStyles = {
  loader: {
    height: '2px',
  },
};

export default memo(SuperTable) as typeof SuperTable;

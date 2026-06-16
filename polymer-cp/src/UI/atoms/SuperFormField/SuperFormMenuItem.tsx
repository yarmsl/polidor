import { FC, memo } from 'react';

import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';

import { styles } from './styles';

interface SuperFormMenuItemProps {
  src?: string;
  label: string;
  value: string;
}

export const SuperFormMenuItem: FC<SuperFormMenuItemProps> = memo(({ label, src }) => {
  return (
    <MenuItem disableRipple>
      <Box sx={styles.listItem}>
        {src ? (
          <ListItemIcon sx={styles.listItemIcon}>
            <img alt={label} src={`${SERVER_URL}/${src}`} />
          </ListItemIcon>
        ) : null}
        <ListItemText sx={styles.listItemText}>{label}</ListItemText>
      </Box>
    </MenuItem>
  );
});

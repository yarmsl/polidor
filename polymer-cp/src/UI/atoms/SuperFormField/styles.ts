export const styles: TStyles = {
  listItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minWidth: 0,
  },
  listItemText: {
    whiteSpace: 'wrap',
  },
  listItemIcon: {
    width: '36px',
    height: '36px',
    borderRadius: 10,
    overflow: 'hidden',
    mr: 2,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
};

export const styles: TStyles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&>*:not(:last-child)': {
      mb: 2,
    },
  },
  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 2,
    '&>*:not(:last-of-type)': {
      mr: 2,
    },
  },
};

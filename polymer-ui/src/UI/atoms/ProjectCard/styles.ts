export const styles: TStyles = {
  root: {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textDecoration: 'none',
    color: '#000',
    gap: '5px',
  },
  imgWrapper: {
    width: '100%',
    aspectRatio: '4/3',
    borderRadius: '5px',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  title: {
    lineHeight: 1.2,
    overflow: 'hidden',
  },
  link: {
    color: 'primary.main',
    fontSize: '18px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

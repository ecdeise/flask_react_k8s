import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },

  // form: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   gap: theme.spacing(1),
  // },

  boldCell: {
    fontWeight: 'bold',
    fontSize: '18px',
  },

  table: {
    borderCollapse: 'collapse',
    width: '120%', // increase table width to 120%
    marginTop: theme.spacing(2),
  },
  // boldCell: {
  //   fontWeight: 'bold',
  // },
  th: {
    textAlign: 'left',
    padding: theme.spacing(1),
    backgroundColor: '#90b2f5',
    color: '#333',
    fontWeight: 'bold',
  },
  td: {
    textAlign: 'left',
    padding: theme.spacing(1),
  },
  evenRow: {
    backgroundColor: '#f2f2f2',
  },
  oddRow: {
    backgroundColor: '#d8dfed',
  },
  hoverRow: {
    backgroundColor: '#ddd',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    gap: theme.spacing(1),
    margin: '0 auto',
    marginBottom: theme.spacing(3),
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  // button: {
  //   border: 'none',
  //   color: 'white',
  //   padding: theme.spacing(1, 2),
  //   textAlign: 'center',
  //   textDecoration: 'none',
  //   display: 'inline-block',
  //   fontSize: 16,
  //   margin: theme.spacing(1, 1, 1, 0),
  //   cursor: 'pointer',
  //   borderRadius: 4,
  // },
  // primaryButton: {
  //   backgroundColor: '#4CAF50',
  // },
  // secondaryButton: {
  //   backgroundColor: '#f44336',
  // },
  // hoverButton: {
  //   backgroundColor: '#0069d9',
  // },
}));

export default useStyles;

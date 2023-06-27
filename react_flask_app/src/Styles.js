import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  //   boldCell: {
  //     fontWeight: 'bold',
  //     fontSize: '18px',
  //   },
  // table: {
  //   borderCollapse: 'collapse',
  //   width: '120%',
  // },
  //   th: {
  //     textAlign: 'left',
  //     backgroundColor: '#90b2f5',
  //     color: '#333',
  //     fontWeight: 'bold',
  //   },
  //   td: {
  //     textAlign: 'left',
  //   },
  //   evenRow: {
  //     backgroundColor: '#f2f2f2',
  //   },
  //   oddRow: {
  //     backgroundColor: '#d8dfed',
  //   },
  //   hoverRow: {
  //     backgroundColor: '#ddd',
  //   },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    margin: '0 auto',
    gap: '16px', // Add spacing between fields
  },

  label: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
  },
});

export default useStyles;

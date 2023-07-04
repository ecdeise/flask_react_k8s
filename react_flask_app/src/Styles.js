// import {makeStyles} from '@mui/styles';

// const useStyles = makeStyles({
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     maxWidth: 400,
//     margin: '0 auto',
//     gap: '16px', // Add spacing between fields
//   },
//   label: {
//     display: 'flex',
//     flexDirection: 'column',
//     fontWeight: 'bold',
//   },
//   evenRow: {
//     backgroundColor: '#f2f2f2',
//   },
//   oddRow: {
//     backgroundColor: '#d8dfed',
//   },
// });

// export default useStyles;

import {makeStyles, useTheme} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
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
  evenRow: {
    backgroundColor: '#EBF5FB',
  },
  oddRow: {
    backgroundColor: '#D6EAF8',
  },
}));

export default useStyles;

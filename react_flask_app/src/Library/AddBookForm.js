import React, {useState} from 'react';
import axios from 'axios';
import {Container, TextField, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CameraIcon from '@mui/icons-material/Camera';
import useStyles from '../Styles';
import BookInfo from './BookInfo';
import BarCodeScanner from './BarcodeScanner';

const baseUrl = process.env.REACT_APP_BASE_URL;
const endpointUrl = '/api/library';
const library_url = `${baseUrl}${endpointUrl}`;

const accessToken = sessionStorage.getItem('access_token');

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

// function AddBookForm(props) {
//   const [book, setBook] = useState({});
//   const [isbn, setIsbn] = useState('');
//   const [showBookInfo, setShowBookInfo] = useState(true);
//   const [showScanner, setShowScanner] = useState(false);
//   const {books} = props;
//   const {setBooks} = props;
//   const classes = useStyles();

//   const handleInfo = (event) => {
//     event.preventDefault();
//     setShowBookInfo(true);
//     console.log(isbn);
//     axios
//       .get(`${library_url}/info/${isbn}`, {headers})
//       .then((response) => {
//         console.log(response.data);
//         setBook(response.data);
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleSave = () => {
//     setBook({});
//     setShowBookInfo(false);
//     setIsbn('');
//   };

//   const handleReset = () => {
//     setIsbn('');
//     setShowBookInfo(false);
//   };

//   const handleToggleScanner = () => {
//     setShowScanner(!showScanner);
//   };

//   return (
//     <Container maxWidth="sm">
//       <div>
//         <div
//           style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}
//         >
//           <Button
//             className={classes.Button}
//             variant="contained"
//             color="primary"
//             startIcon={<CameraIcon />}
//             onClick={handleToggleScanner}
//           >
//             {showScanner ? 'Hide Scanner' : 'Show Scanner'}
//           </Button>
//         </div>
//         {showScanner && (
//           <div style={{display: 'flex', justifyContent: 'center'}}>
//             <BarCodeScanner
//               visible={showScanner}
//               onScan={(data) => console.log(`Scanned data: ${data}`)}
//               onError={(err) => console.error(`Error: ${err}`)}
//             />
//           </div>
//         )}
//       </div>

//       {Object.keys(book).length === 0 ? (
//         <form className={classes.form} onSubmit={handleInfo}>
//           <TextField
//             label="ISBN"
//             variant="outlined"
//             value={isbn}
//             onChange={(event) => setIsbn(event.target.value)}
//           />

//           <Button
//             className={classes.Button}
//             variant="contained"
//             color="primary"
//             startIcon={<SaveIcon />}
//             type="submit"
//           >
//             Get Book Info
//           </Button>
//         </form>
//       ) : (
//         <div>
//           {showBookInfo && <Button onClick={handleReset}>Reset</Button>}

//           {showBookInfo && (
//             <BookInfo
//               book={book}
//               onSave={handleSave}
//               books={books}
//               setBooks={setBooks}
//             />
//           )}
//           {!showBookInfo && (
//             <form className={classes.form} onSubmit={handleInfo}>
//               <TextField
//                 label="ISBN"
//                 variant="outlined"
//                 value={isbn}
//                 onChange={(event) => setIsbn(event.target.value)}
//               />

//               <Button
//                 className={classes.Button}
//                 variant="contained"
//                 color="primary"
//                 startIcon={<SaveIcon />}
//                 type="submit"
//               >
//                 Get Book Info
//               </Button>
//             </form>
//           )}
//         </div>
//       )}
//     </Container>
//   );
function AddBookForm(props) {
  const [book, setBook] = useState({});
  const [isbn, setIsbn] = useState('');
  const [showBookInfo, setShowBookInfo] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const {books} = props;
  const {setBooks} = props;
  const classes = useStyles();

  const handleInfo = (event) => {
    event.preventDefault();
    setShowBookInfo(true);
    console.log(isbn);
    axios
      .get(`${library_url}/info/${isbn}`, {headers})
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleSave = () => {
    setBook({});
    setShowBookInfo(false);
    setIsbn('');
  };

  const handleReset = () => {
    setIsbn('');
    setShowBookInfo(false);
  };

  const handleToggleScanner = () => {
    setShowScanner(!showScanner);
  };

  const handleScan = (data) => {
    setIsbn(data);
    setShowScanner(false);
  };

  return (
    <Container maxWidth="sm">
      <div>
        <div
          style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}
        >
          <Button
            className={classes.Button}
            variant="contained"
            color="primary"
            startIcon={<CameraIcon />}
            onClick={handleToggleScanner}
          >
            {showScanner ? 'Hide Scanner' : 'Show Scanner'}
          </Button>
        </div>
        {showScanner && (
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <BarCodeScanner
              visible={showScanner}
              onScan={handleScan}
              onError={(err) => console.error(`Error: ${err}`)}
            />
          </div>
        )}
      </div>

      {Object.keys(book).length === 0 ? (
        <form className={classes.form} onSubmit={handleInfo}>
          <TextField
            label="Scanned ISBN"
            variant="outlined"
            value={isbn}
            onChange={(event) => setIsbn(event.target.value)}
          />

          <Button
            className={classes.Button}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            type="submit"
          >
            Get Book Info
          </Button>
        </form>
      ) : (
        <div>
          {showBookInfo && <Button onClick={handleReset}>Reset</Button>}

          {showBookInfo && (
            <BookInfo
              book={book}
              onSave={handleSave}
              books={books}
              setBooks={setBooks}
            />
          )}
          {!showBookInfo && (
            <form className={classes.form} onSubmit={handleInfo}>
              <TextField
                label="Scanned or Entered ISBN"
                variant="outlined"
                value={isbn}
                onChange={(event) => setIsbn(event.target.value)}
              />

              <Button
                className={classes.Button}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                type="submit"
              >
                Get Book Info
              </Button>
            </form>
          )}
        </div>
      )}
    </Container>
  );
}

export default AddBookForm;

import React, {useState} from 'react';
import {Container, TextField, Button, makeStyles} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import useStyles from '../Styles';

function AddBookForm({onSubmit}) {
  const [book, setBook] = useState([]);
  const [isbn, setIsbn] = useState(''); // add the isbn state variable
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newIsbn = {isbn};
    setIsbn(newIsbn);
    onSubmit(newIsbn);
    setIsbn(''); // reset the isbn state variable
  };

  return (
    <Container maxWidth="sm">
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="ISBN"
          variant="outlined"
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)} // update the isbn state variable
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
    </Container>
  );
}

export default AddBookForm;

import React, {useState} from 'react';
import {Container, TextField, Button, makeStyles} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import useStyles from './Styles';

// const useStyles = makeStyles((theme) => ({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: theme.spacing(1),
//   },
// }));

function AddContactForm({onSubmit}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({name, email, phone, address});
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  return (
    <Container maxWidth="sm">
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <Button
          className={classes.Button}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          type="submit"
        >
          Add New Contact
        </Button>
      </form>
    </Container>
  );
}

export default AddContactForm;

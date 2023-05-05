import React, {useState, useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import useStyles from '../Styles';
import {Container, TextField, Button} from '@material-ui/core';
import {Delete, Save} from '@material-ui/icons';
import axios from 'axios';

function ContactDataGrid() {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactAddress, setNewContactAddress] = useState('');
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const endpointUrl = '/api/contacts';
  const url = `${baseUrl}${endpointUrl}`;

  const accessToken = sessionStorage.getItem('access_token');

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const columns = [
    {field: 'id', headerName: 'ID'}, //, hide: true},
    {field: 'name', headerName: 'Name', flex: 1, editable: true},
    {field: 'email', headerName: 'Email', flex: 1, editable: true},
    {field: 'phone', headerName: 'Phone', flex: 1, editable: true},
    {field: 'address', headerName: 'Address', flex: 2, editable: true},
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          color="secondary"
          startIcon={<Delete />}
          onClick={() => handleRowDelete(params.id)}
          size="small"
          style={{fontSize: '0.8rem'}}
        ></Button>
      ),
    },
  ];

  useEffect(() => {
    console.log(`GET ${baseUrl}/api/contacts`);
    axios
      .get(`${baseUrl}/api/contacts`, {headers})
      .then((response) => {
        console.log(`GET /api/contacts HTTP/1.1 ${response.status}`);
        console.log(response.data);
        return response;
      })
      .then((response) => setContacts(response.data.contacts))
      .catch((error) => console.error(error));
  }, []);

  const handleCellEditCommit = (params) => {
    const updatedContacts = [...contacts];
    const index = updatedContacts.findIndex(
      (contact) => contact.id === params.id
    );
    updatedContacts[index][params.field] = params.value;
    axios
      .put(`${baseUrl}/api/contacts/${params.id}`, updatedContacts[index], {
        headers,
      })
      .then((response) => {
        console.log(
          `PUT /api/contacts/${params.id} HTTP/1.1 ${response.status}`
        );
        setContacts(updatedContacts);
      })
      .catch((error) => console.error(error));
  };

  const handleRowDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/contacts/${id}`, {headers})
      .then((response) => {
        console.log(`DELETE /api/contacts/${id} HTTP/1.1 ${response.status}`);
        setContacts((contacts) => {
          // Filter out the deleted contact by ID
          return contacts.filter((contact) => contact.id !== id);
        });
      })
      .catch((error) => console.error(error));
  };

  const handleAddContact = () => {
    event.preventDefault(); // prevent default form submission behavior
    const newContact = {
      name: newContactName,
      email: newContactEmail,
      phone: newContactPhone,
      address: newContactAddress,
    };

    axios
      .post(`${baseUrl}/api/contacts`, newContact, {headers})
      .then((response) => {
        console.log(`POST /api/contacts HTTP/1.1 ${response.status}`);
        setContacts((contacts) => [...contacts, ...response.data.contacts]);
        // reset the form fields
        setNewContactName('');
        setNewContactEmail('');
        setNewContactPhone('');
        setNewContactAddress('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={{height: 400, width: '100%'}}>
      <Container maxWidth="sm">
        <form className={classes.form} onSubmit={handleAddContact}>
          <TextField
            label="Name"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
          />
          <TextField
            label="Email"
            value={newContactEmail}
            onChange={(e) => setNewContactEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            value={newContactPhone}
            onChange={(e) => setNewContactPhone(e.target.value)}
          />
          <TextField
            label="Address"
            value={newContactAddress}
            onChange={(e) => setNewContactAddress(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Add Contact
          </Button>
        </form>
      </Container>
      <DataGrid
        rows={contacts}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
        onCellEditCommit={handleCellEditCommit}
      />
    </div>
  );
}

export default ContactDataGrid;

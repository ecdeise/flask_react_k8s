import React, {useState, useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import useStyles from '../Styles';
import {Container, TextField, Button} from '@material-ui/core';
import {Delete, Save} from '@material-ui/icons';
import axios from 'axios';
import config from '../config';

function ContactDataGrid() {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactFirstName, setNewContactFirstName] = useState('');
  const [newContactLastName, setNewContactLastName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactAddress, setNewContactAddress] = useState('');
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);

  const baseUrl = config.baseUrl;
  const endpointUrl = '/api/contacts';
  const url = `${baseUrl}${endpointUrl}`;

  const accessToken = sessionStorage.getItem('access_token');

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const columns = [
    {field: 'id', headerName: 'ID', hide: true},
    {field: 'lastname', headerName: 'Last Name', flex: 2, editable: true},
    {field: 'firstname', headerName: 'First Name', flex: 2, editable: true},
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
      editable: true,
      renderCell: (params) => (
        <a href={`mailto:${params.value}`}>{params.value}</a>
      ),
    },
    {field: 'phone', headerName: 'Phone', flex: 2, editable: true},
    {field: 'address', headerName: 'Address', flex: 3, editable: true},
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
      firstname: newContactFirstName,
      lastname: newContactLastName,
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
        setNewContactFirstName('');
        setNewContactLastName('');
        setNewContactEmail('');
        setNewContactPhone('');
        setNewContactAddress('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={{height: 400, width: '100%'}}>
      <Button
        color="primary"
        startIcon={<Save />}
        onClick={() => setShowForm(!showForm)}
        size="small"
        style={{fontSize: '0.8rem', marginBottom: 14}}
      >
        {showForm ? 'Minimize' : 'New Contact'}
      </Button>
      {showForm && (
        <div>
          <Container maxWidth="sm">
            <form className={classes.form} onSubmit={handleAddContact}>
              <TextField
                label="First Name"
                value={newContactFirstName}
                onChange={(e) => setNewContactFirstName(e.target.value)}
              />
              <TextField
                label="Last Name"
                value={newContactLastName}
                onChange={(e) => setNewContactLastName(e.target.value)}
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
              <Button color="primary" type="submit" startIcon={<Save />}>
                Add Contact
              </Button>
            </form>
          </Container>
        </div>
      )}

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

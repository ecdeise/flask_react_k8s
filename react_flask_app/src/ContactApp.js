// ContactApp.js

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from './config.json';
import AddContactForm from './AddContactForm';
import ContactTable from './ContactTable';
import {Container, Button} from '@material-ui/core';
import useStyles from './Styles';

function ContactApp() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const classes = useStyles();

  // config for dev and prod - based on
  // export NODE_ENV=development
  // To Confirm: echo $NODE_ENV

  //const baseUrl = config[process.env.NODE_ENV].baseUrl;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  // const baseUrl =
  //   process.env.NODE_ENV === 'production'
  //     ? config.production.baseUrl
  //     : config.development.baseUrl;
  const endpointUrl = '/api/contacts';
  const url = `${baseUrl}${endpointUrl}`;
  console.log(`baseUrl: ${baseUrl}`);
  console.log(process.env.NODE_ENV);

  useEffect(() => {
    console.log(`GET ${baseUrl}/api/contacts`);
    axios
      .get(`${baseUrl}/api/contacts`)
      .then((response) => {
        console.log(`GET /api/contacts HTTP/1.1 ${response.status}`);
        console.log(response.data);
        return response;
      })
      .then((response) => setContacts(response.data.contacts))
      .catch((error) => console.error(error));
  }, []);

  const handleCreate = (contact) => {
    axios
      .post(`${baseUrl}/api/contacts`, contact)
      .then((response) => {
        console.log(`POST /api/contacts HTTP/1.1 ${response.status}`);
        console.log(response.data);
        setContacts((contacts) => [...contacts, response.data]);
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (contact) => {
    axios
      .put(`${baseUrl}/api/contacts/${contact.id}`, contact)
      .then((response) => {
        console.log(
          `PUT /api/contacts/${contact.id} HTTP/1.1 ${response.status}`
        );
        console.log(response.data);
        const updatedContact = response.data;
        setContacts((contacts) =>
          contacts.map((c) =>
            c.id === updatedContact.id ? {...c, ...updatedContact} : c
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (contact) => {
    axios
      .delete(`${baseUrl}/api/contacts/${contact.id}`)
      .then((response) => {
        console.log(
          `DELETE /api/contacts/${contact.id} HTTP/1.1 ${response.status}`
        );
        setContacts((contacts) => contacts.filter((c) => c.id !== contact.id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {
        <Container className={classes.container}>
          <div>
            <h1>Contact App</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm(!showForm)}
              style={{marginBottom: '10px'}}
            >
              {showForm ? 'Hide Form' : 'Add Contact'}
            </Button>
            {showForm && <AddContactForm onSubmit={handleCreate} />}
            {contacts ? (
              <ContactTable
                contacts={contacts}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ) : null}
          </div>
        </Container>
      }
    </>
  );
}

export default ContactApp;

// LibraryApp.js

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config.json';
import {Container, Button} from '@material-ui/core';
//import useStyles from './Styles';
import AddBookForm from './AddBookForm';
import BookInfoCard from './BookInfoCard';
import BookCardCollection from './BookCardCollection';
import LibraryDataGrid from './LibraryDataGrid';

function LibraryApp() {
  const [isbn, setIsbn] = useState([]);
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  //const classes = useStyles();

  // config for dev and prod - based on
  // export NODE_ENV=development
  // To Confirm: echo $NODE_ENV

  //const baseUrl = config[process.env.NODE_ENV].baseUrl;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  // const baseUrl =
  //   process.env.NODE_ENV === 'production'
  //     ? config.production.baseUrl
  //     : config.development.baseUrl;
  const endpointUrl = '/api/library';
  const library_url = `${baseUrl}${endpointUrl}`;
  console.log(`baseUrl: ${baseUrl}`);
  console.log(process.env.NODE_ENV);

  const accessToken = sessionStorage.getItem('access_token');

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    console.log(`GET ${baseUrl}/api/library/all`);
    axios
      .get(`${baseUrl}/api/library/all`, {headers})
      .then((response) => {
        console.log(`GET /api/library HTTP/1.1 ${response.status}`);
        console.log(response.data);
        return response;
      })
      .then((response) => setBooks(response.data.books))
      .catch((error) => console.error(error));
  }, []);

  const handleInfo = (isbn) => {
    console.log(isbn.isbn);
    axios
      .get(`${library_url}/info/${isbn.isbn}`, {headers})
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
        return response;
      })
      .catch((error) => console.error(error));
  };

  // const handleCreate = (contact) => {
  //   axios
  //     .post(`${baseUrl}/api/contacts`, contact, {headers})
  //     .then((response) => {
  //       console.log(`POST /api/contacts HTTP/1.1 ${response.status}`);
  //       console.log(response.data);
  //       setContacts((contacts) => [...contacts, contact]);
  //     })
  //     .catch((error) => console.error(error));
  // };

  // const handleUpdate = (contact) => {
  //   axios
  //     .put(`${baseUrl}/api/contacts/${contact.id}`, contact, {headers})
  //     .then((response) => {
  //       console.log(
  //         `PUT /api/contacts/${contact.id} HTTP/1.1 ${response.status}`
  //       );
  //       console.log(response.data);
  //       const updatedContact = response.data;
  //       setContacts((contacts) =>
  //         contacts.map((c) =>
  //           c.id === updatedContact.id ? {...c, ...updatedContact} : c
  //         )
  //       );
  //     })
  //     .catch((error) => console.error(error));
  // };

  // const handleDelete = (contact) => {
  //   axios
  //     .delete(`${baseUrl}/api/contacts/${contact.id}`, {headers})
  //     .then((response) => {
  //       console.log(
  //         `DELETE /api/contacts/${contact.id} HTTP/1.1 ${response.status}`
  //       );
  //       setContacts((contacts) => contacts.filter((c) => c.id !== contact.id));
  //     })
  //     .catch((error) => console.error(error));
  // };

  return (
    <>
      {
        <Container>
          <div>
            <div>
              <h1>The Library</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(!showForm)}
                style={{marginBottom: '10px'}}
              >
                {showForm ? 'Hide Form' : 'Add Book'}
              </Button>
              {showForm && (
                <AddBookForm onSubmit={handleInfo} setBook={setBook} />
              )}

              {book ? (
                <BookInfoCard
                  key={JSON.stringify(book)}
                  book={book}
                  setBook={setBook}
                  setBooks={setBooks}
                />
              ) : null}
            </div>
            {books ? (
              <>
                <LibraryDataGrid key={JSON.stringify(books)} books={books} />
                {/* <BookCardCollection
                  key={JSON.stringify(books)}
                  books={books}
                  // onDelete={handleDelete}
                  // onUpdate={handleUpdate}
                /> */}
              </>
            ) : null}
          </div>
        </Container>
      }
    </>
  );
}

export default LibraryApp;

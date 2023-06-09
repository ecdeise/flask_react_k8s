// LibraryApp.js

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config.json';
import {Container, Button} from '@material-ui/core';
//import useStyles from './Styles';
//import AddBookForm from './AddBookForm';
//import BookInfoCard from './BookInfoCard';
//import BookCardCollection from './BookCardCollection';
import LibraryDataGrid from './LibraryDataGrid';

function LibraryApp() {
  const [isbn, setIsbn] = useState([]);
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // config for dev and prod - based on
  // export NODE_ENV=development
  // To Confirm: echo $NODE_ENV

  const baseUrl = config[process.env.NODE_ENV].baseUrl;
  //const baseUrl = process.env.REACT_APP_BASE_URL;
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

  const handleSave = () => {
    setBooks([...books, book]);
    setBook({});
  };

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

  return (
    <>
      {
        <Container>
          <div>
            <h1>The Library at Trowbridge</h1>
            <LibraryDataGrid />
          </div>
        </Container>
      }
    </>
  );
}

export default LibraryApp;

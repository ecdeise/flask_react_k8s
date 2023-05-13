import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import {DataGrid} from '@material-ui/data-grid';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Container, Tooltip, TextField, Button} from '@material-ui/core';
import {Delete, Save} from '@material-ui/icons';
import AddBookForm from './AddBookForm';

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

export default function LibraryDataGrid() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 340,
      editable: true,
      renderCell: (params) => (
        <Tooltip
          title={
            <div>
              <img
                src={params.row.smallthumbnail}
                alt={params.row.title}
                style={{width: 120}}
              />
              <p>{params.row.description}</p>
            </div>
          }
        >
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {field: 'authors', headerName: 'Authors', width: 200, editable: true},
    {field: 'publisher', headerName: 'Publisher', width: 200, editable: true},
    {field: 'year', headerName: 'Year', width: 120, editable: true},
    {field: 'isbn13', headerName: 'ISBN-13', width: 140, editable: true},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <div>
          <Button
            color="secondary"
            startIcon={<Delete />}
            onClick={() => handleDelete(params.id)}
            size="small"
            style={{fontSize: '0.8rem'}}
          ></Button>
        </div>
      ),
    },
  ];

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

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/library/book/${id}`, {headers})
      .then((response) => {
        console.log(
          `DELETE /api/library/book/${id} HTTP/1.1 ${response.status}`
        );
        console.log(response.data);
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleAddBookClick = () => {
    setShowAddForm(!showAddForm); // toggle the state of the form
  };

  return (
    <div style={{height: 550, width: '100%'}}>
      <Button
        color="primary"
        // startIcon={<Save />}
        onClick={handleAddBookClick}
        style={{marginBottom: '1rem'}}
      >
        {showAddForm ? 'Close Form' : 'Add New Book'}
      </Button>
      {showAddForm && (
        <AddBookForm
          books={books}
          setBooks={setBooks}
          setShowAddForm={setShowAddForm}
        />
      )}
      <DataGrid
        rows={books}
        columns={columns}
        page={page}
        pageSize={pageSize}
        rowCount={books.length}
        //onPageChange={handlePageChange}
        //onPageSizeChange={handlePageSizeChange}
        checkboxSelection
        //rowsPerPageOptions={[5, 10, 25, 50]}
        slots={{toolbar: GridToolbar}}
      />
    </div>
  );
}

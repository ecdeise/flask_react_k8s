import React, {useState, useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {Tooltip} from '@material-ui/core';

const columns = [
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    renderCell: (params) => (
      <Tooltip
        title={
          <div>
            <img
              src={params.row.image}
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
  {field: 'authors', headerName: 'Authors', width: 200},
  // {field: 'genre', headerName: 'Genre', width: 140},
  // {field: 'classification', headerName: 'Classification', width: 140},
  {field: 'publisher', headerName: 'Publisher', width: 200},
  {field: 'year', headerName: 'Year', width: 120},
  {field: 'isbn13', headerName: 'ISBN-13', width: 140},
];

export default function LibraryDataGrid({books}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const newRows = books.map((book) => ({
      id: book.id,
      image: book.smallthumbnail,
      title: book.title,
      authors: book.authors,
      genre: book.genre,
      classification: book.classification,
      publisher: book.publisher,
      isbn13: book.isbn13,
      year: book.year,
      description: book.description,
    }));
    setRows(newRows);
  }, [books]);

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <div style={{height: 650, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        page={page}
        pageSize={pageSize}
        rowCount={rows.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        checkboxSelection
        rowsPerPageOptions={[10, 20, 30]}
      />
    </div>
  );
}

import React, {useState, useEffect} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import useStyles from '../Styles';
import {Container, TextField, Button} from '@material-ui/core';
import {Delete, Save} from '@material-ui/icons';
import axios from 'axios';

function RecipeDataGrid({recipes, setRecipes}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const endpointUrl = '/api/recipe';
  const url = `${baseUrl}${endpointUrl}`;

  const accessToken = sessionStorage.getItem('access_token');

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const columns = [
    {field: 'id', headerName: 'ID', hide: true},
    {field: 'recipename', headerName: 'Name', flex: 1},
    {field: 'imageurl', headerName: 'Image', flex: 1},
    {field: 'recipesource', headerName: 'Source', flex: 1},
    {field: 'author', headerName: 'Author', flex: 1},
    {field: 'keywords', headerName: 'Keywords', flex: 1},
    {field: 'rating', headerName: 'Rating', flex: 1},
    {field: 'cooktime', headerName: 'Cook Time', flex: 1},
    {field: 'allergens', headerName: 'Allergens', flex: 1},
    {field: 'summary', headerName: 'Summary', flex: 1},
    {field: 'recipe', headerName: 'Recipe', flex: 1},

    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   sortable: false,
    //   width: 100,
    //   renderCell: (params) => (
    //     <Button
    //       color="secondary"
    //       startIcon={<Delete />}
    //       onClick={() => handleRowDelete(params.id)}
    //       size="small"
    //       style={{fontSize: '0.8rem'}}
    //     ></Button>
    //   ),
    // },
  ];

  useEffect(() => {
    console.log(`GET ${baseUrl}/api/recipe/all`);
    axios
      .get(`${baseUrl}/api/recipe/all`, {headers})
      .then((response) => {
        console.log(`GET /api/recipe/all HTTP/1.1 ${response.status}`);
        console.log(response.data);
        return response;
      })
      .then((response) => setRecipes(response.data.recipes))
      .catch((error) => console.error(error));
  }, []);

  // const handleCellEditCommit = (params) => {
  //   const updatedContacts = [...contacts];
  //   const index = updatedContacts.findIndex(
  //     (contact) => contact.id === params.id
  //   );
  //   updatedContacts[index][params.field] = params.value;
  //   axios
  //     .put(`${baseUrl}/api/contacts/${params.id}`, updatedContacts[index], {
  //       headers,
  //     })
  //     .then((response) => {
  //       console.log(
  //         `PUT /api/contacts/${params.id} HTTP/1.1 ${response.status}`
  //       );
  //       setContacts(updatedContacts);
  //     })
  //     .catch((error) => console.error(error));
  // };

  const handleRowDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/recipes/${id}`, {headers})
      .then((response) => {
        console.log(`DELETE /api/recipes/${id} HTTP/1.1 ${response.status}`);
        setContacts((contacts) => {
          // Filter out the deleted contact by ID
          return recipes.filter((recipe) => recipe.id !== id);
        });
      })
      .catch((error) => console.error(error));
  };

  // const handleAddContact = () => {
  //   event.preventDefault(); // prevent default form submission behavior
  //   const newContact = {
  //     name: newContactName,
  //     firstname: newContactFirstName,
  //     lastname: newContactLastName,
  //     email: newContactEmail,
  //     phone: newContactPhone,
  //     address: newContactAddress,
  //   };

  //   axios
  //     .post(`${baseUrl}/api/contacts`, newContact, {headers})
  //     .then((response) => {
  //       console.log(`POST /api/contacts HTTP/1.1 ${response.status}`);
  //       setContacts((contacts) => [...contacts, ...response.data.contacts]);
  //       // reset the form fields
  //       setNewContactName('');
  //       setNewContactFirstName('');
  //       setNewContactLastName('');
  //       setNewContactEmail('');
  //       setNewContactPhone('');
  //       setNewContactAddress('');
  //     })
  //     .catch((error) => console.error(error));
  // };

  return (
    <div style={{height: 400, width: '100%'}}>
      {/* <Button
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
      )} */}

      <DataGrid
        rows={recipes}
        columns={columns}
        page={page}
        rowCount={recipes.length}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 25]}
        //onCellEditCommit={handleCellEditCommit}
        slots={{toolbar: GridToolbar}}
      />
    </div>
  );
}

export default RecipeDataGrid;

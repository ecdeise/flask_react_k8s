import React, {useState, useEffect} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import useStyles from '../Styles';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {Delete, Save} from '@material-ui/icons';
import axios from 'axios';
import RecipeForm from './RecipeForm';

function RecipeDataGrid({recipes, setRecipes}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleRowDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/recipe/${id}`, {headers})
      .then((response) => {
        console.log(`DELETE /api/recipes/${id} HTTP/1.1 ${response.status}`);
        setRecipes((recipes) => {
          // Filter out the deleted contact by ID
          return recipes.filter((recipe) => recipe.id !== id);
        });
      })
      .catch((error) => console.error(error));
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <div style={{height: 700, width: '100%'}}>
        <DataGrid
          rows={recipes}
          columns={columns}
          page={page}
          rowCount={recipes.length}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 25]}
          slots={{toolbar: GridToolbar}}
          onRowClick={(params) => {
            setSelectedRow(params.row);
            handleDialogOpen();
          }}
        />
      </div>
      {selectedRow && (
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="lg"
          fullWidth
        >
          {/* <DialogTitle>Recipe ID: {selectedRow.id}</DialogTitle> */}
          <DialogContent>
            <Card>
              <CardContent>
                <RecipeForm
                  selectedRow={selectedRow}
                  recipes={recipes}
                  setRecipes={setRecipes}
                />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default RecipeDataGrid;

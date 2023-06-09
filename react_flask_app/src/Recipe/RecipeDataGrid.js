import React, {useState, useEffect} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import useStyles from '../Styles';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {Delete, Save} from '@material-ui/icons';
import axios from 'axios';
import RecipeForm from './RecipeForm';
import RecipeDialog from './RecipeDialog';
import config from '../config.json';

function RecipeDataGrid({
  recipes,
  setRecipes,
  id,
  setRecipeId,
  recipeName,
  setRecipeName,
  recipeSource,
  setRecipeSource,
  recipeAuthor,
  setRecipeAuthor,
  recipeKeyword,
  setRecipeKeyword,
  recipeRating,
  setRecipeRating,
  recipeImage,
  setRecipeImage,
  recipeTime,
  setRecipeTime,
  recipeAllergens,
  setRecipeAllergens,
  recipeSummary,
  setRecipeSummary,
  recipeContent,
  setRecipeContent,
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const baseUrl = config[process.env.NODE_ENV].baseUrl;
  //const baseUrl = process.env.REACT_APP_BASE_URL;
  const endpointUrl = '/api/recipe';
  const url = `${baseUrl}${endpointUrl}`;

  const accessToken = sessionStorage.getItem('access_token');
  //get user_id from session
  const user_id = sessionStorage.getItem('user_id');

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'X-User-ID': user_id,
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
    {field: 'user_id', headerName: 'User', flex: 1},
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          color="secondary"
          startIcon={<Delete />}
          size="small"
          style={{fontSize: '0.8rem'}}
        ></Button>
      ),
    },
  ];

  useEffect(() => {
    console.log(`GET ${baseUrl}/api/recipe/byauthuser`);
    axios
      .get(`${baseUrl}/api/recipe/byauthuser`, {headers})
      .then((response) => {
        console.log(`GET /api/recipe/byauthuser HTTP/1.1 ${response.status}`);
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

  const handleCellClick = (params) => {
    const isActionCell = params.field === 'action';
    if (isActionCell) {
      handleRowDelete(params.id);
    } else {
      setSelectedRow(params.row);
      handleDialogOpen();
    }
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
        <Paper elevation={4} style={{padding: '0.5rem'}}>
          <DataGrid
            rows={recipes}
            columns={columns}
            page={page}
            rowCount={recipes.length}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25]}
            slots={{toolbar: GridToolbar}}
            onCellClick={handleCellClick}
          />
        </Paper>
      </div>
      {selectedRow && (
        <RecipeDialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="lg"
          fullWidth
        >
          <RecipeForm
            selectedRow={selectedRow}
            id={id}
            recipeName={recipeName}
            recipeSource={recipeSource}
            recipeAuthor={recipeAuthor}
            recipeKeyword={recipeKeyword}
            recipeRating={recipeRating}
            recipeImage={recipeImage}
            recipeTime={recipeTime}
            recipeAllergens={recipeAllergens}
            recipeSummary={recipeSummary}
            recipeContent={recipeContent}
            setRecipeId={setRecipeId}
            setRecipeName={setRecipeName}
            setRecipeSource={setRecipeSource}
            setRecipeAuthor={setRecipeAuthor}
            setRecipeKeyword={setRecipeKeyword}
            setRecipeRating={setRecipeRating}
            setRecipeImage={setRecipeImage}
            setRecipeTime={setRecipeTime}
            setRecipeAllergens={setRecipeAllergens}
            setRecipeSummary={setRecipeSummary}
            setRecipeContent={setRecipeContent}
            recipes={recipes}
            setRecipes={setRecipes}
          />
        </RecipeDialog>
      )}
    </div>
  );
}

export default RecipeDataGrid;

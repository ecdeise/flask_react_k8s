import React, {useState} from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  SnackbarContent,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import RecipeForm from './RecipeForm';
import RecipeDialog from './RecipeDialog';
import config from '../config';

const baseUrl = config.baseUrl;

const accessToken = sessionStorage.getItem('access_token');
const user_id = sessionStorage.getItem('user_id');

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

function UrlInput({
  id,
  setRecipeId,
  recipes,
  setRecipes,
  selectedRow,
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
  onUrlSubmit,
}) {
  const [url, setUrl] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const processApiResponse = (apiResponse) => {
    setRecipeContent(apiResponse.data.contents.contents);
    setRecipeSource(apiResponse.data.contents.url);
    setRecipeName(apiResponse.data.contents.recipename);
    setUrl('');
    setSnackbarMessage('Recipe Successfully Extract!');
    setSnackbarOpen(true);
  };

  const handleSubmit = () => {
    axios
      .post(`${baseUrl}/api/processurl/`, {url}, {headers})
      .then((response) => {
        if (response.data.contents.error) {
          // If the response contains an error message
          setSnackbarMessage(response.data.contents.error);
          setSnackbarOpen(true);
        } else {
          processApiResponse(response);
          handleDialogOpen();
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle the error case
      });
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{minHeight: '10vh'}}
      >
        <Grid item xs={14} sm={10} md={8} lg={6}>
          <Paper
            elevation={3}
            style={{padding: '2rem', marginBottom: '2rem', width: '100%'}}
          >
            <Typography variant="h6" gutterBottom>
              Enter a URL
            </Typography>
            <TextField
              label="URL"
              variant="outlined"
              fullWidth
              margin="normal"
              value={url}
              onChange={handleUrlChange}
              InputLabelProps={{
                style: {width: '100%'}, // Increase the width of the input label
              }}
              InputProps={{
                style: {width: '100%'}, // Increase the width of the input field
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <div>
        {recipeContent && (
          <RecipeDialog
            open={openDialog}
            onClose={handleDialogClose}
            maxWidth="lg"
            fullWidth
          >
            <RecipeForm
              id={id}
              recipes={recipes}
              setRecipes={setRecipes}
              recipeContent={recipeContent}
              recipeName={recipeName}
              recipeSource={recipeSource}
              recipeAuthor={recipeAuthor}
              recipeKeyword={recipeKeyword}
              recipeRating={recipeRating}
              recipeImage={recipeImage}
              recipeTime={recipeTime}
              recipeAllergens={recipeAllergens}
              recipeSummary={recipeSummary}
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
            />
          </RecipeDialog>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: 'green',
            color: 'white',
            fontWeight: 'bold',
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </div>
  );
}

export default UrlInput;

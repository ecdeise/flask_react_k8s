import React, {useState} from 'react';
import axios from 'axios';
import {Button, Container, Grid, Typography} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import RecipeDialog from './RecipeDialog';
import RecipeForm from './RecipeForm';
import config from '../config';

const baseUrl = config.baseUrl;

const accessToken = sessionStorage.getItem('access_token');
const user_id = sessionStorage.getItem('user_id');

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

function ImageUploader({
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
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [saveResponse, setsaveResponse] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [filename, setFileName] = useState('');
  const [filepath, setFilePath] = useState('');
  const [image_cleanup, setImageCleanup] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      axios
        .post(`${baseUrl}/api/imageupload/`, formData, {headers})
        //.post('/api/image/upload', formData)
        .then((response) => {
          // Handle the successful upload response
          console.log(response.data);
          setsaveResponse(response.data);
          setFileName(response.data.filename);
          setFilePath(response.data.filepath);
          setRecipeContent(response.data.text);
          setImageCleanup(response.data.image_cleanup);
          setOpenDialog(true);
          setSnackbarMessage(
            `Image uploaded successfully. Filepath: ${response.data.filepath}, Image Cleanup: ${response.data.image_cleanup}`
          );
        })
        .catch((error) => {
          // Handle the error case
          console.log(error);
          setsaveResponse('error');
          setSnackbarMessage('Error occurred while uploading the image.');
        });
      setSnackbarOpen(true);
    }
  };

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Image Uploader
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{display: 'none'}}
            id="file-selector"
          />
          <label htmlFor="file-selector">
            <Button variant="contained" color="primary" component="span">
              Select Image
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedFile}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {saveResponse && (
          <RecipeDialog
            open={openDialog}
            onClose={handleDialogClose}
            maxWidth="lg"
            fullWidth
          >
            <RecipeForm
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
            {/* <div>{filename}</div>
            <div>{filepath}</div> */}
          </RecipeDialog>
          // <Typography variant="body1" gutterBottom>
          //   Filename: {saveResponse.filename}
          //   Filepath: {saveResponse.filepath}
          //   Text: {saveResponse.text}
          // </Typography>
        )}
        {saveResponse === 'error' && (
          <Typography variant="body1" gutterBottom color="error">
            Error occurred while uploading the image.
          </Typography>
        )}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default ImageUploader;

import React, {useState} from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {TextField, Button, Paper, Container, Snackbar} from '@material-ui/core';
import {Rating} from '@mui/material';

const baseUrl = process.env.REACT_APP_BASE_URL;
const endpointUrl = '/api/recipe';
const recipe_url = `${baseUrl}${endpointUrl}`;

const accessToken = sessionStorage.getItem('access_token');

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

const RecipeForm = ({apiResponse, setApiResponse, recipes, setRecipes}) => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeSource, setRecipeSource] = useState('');
  const [recipeAuthor, setRecipeAuthor] = useState('');
  const [recipeKeyword, setRecipeKeyword] = useState('');
  const [recipeRating, setRecipeRating] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [recipeAllergens, setRecipeAllergens] = useState('');
  const [recipeSummary, setRecipeSummary] = useState('');
  const [recipeContent, setRecipeContent] = useState(apiResponse);
  //const [recipes, setRecipes] = useState([]);
  const [saveStatus, setSaveStatus] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onSave = () => {
    setRecipeName('');
    setRecipeSource('');
    setRecipeAuthor('');
    setRecipeKeyword('');
    setRecipeRating('');
    setRecipeImage('');
    setRecipeTime('');
    setRecipeAllergens('');
    setRecipeSummary('');
    setRecipeContent('');
    if (apiResponse) {
      setApiResponse('');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const saveRecipe = () => {
    // Create an object with the recipe data
    const recipe = {
      recipeName,
      recipeSource,
      recipeAuthor,
      recipeKeyword,
      recipeRating,
      recipeImage,
      recipeTime,
      recipeAllergens,
      recipeSummary,
      recipeContent,
    };

    axios
      .post(`${recipe_url}/addrecipe`, recipe, {headers})
      .then((response) => {
        console.log(`${recipe_url}/addrecipe ${response.status}`);
        console.log(response.data.recipe);
        setSaveStatus('success');
        setSnackbarOpen(true);
        setRecipes([...recipes, ...response.data.recipe]); // Add new book to books array
        onSave();
      })
      .catch((error) => {
        console.error(error);
        setSaveStatus('error');
        setSnackbarOpen(true);
      });
  };

  return (
    <Container maxWidth="md">
      <h2 style={{textAlign: 'center'}}>Recipe</h2>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1, paddingRight: '8px'}}>
          <Paper elevation={3}>
            <div style={{padding: '16px'}}>
              <TextField
                label="Name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{padding: '16px'}}>
              <TextField
                label="Image URL"
                value={recipeImage}
                onChange={(e) => setRecipeImage(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{padding: '16px'}}>
              <TextField
                label="Source"
                value={recipeSource}
                onChange={(e) => setRecipeSource(e.target.value)}
                fullWidth
              />
            </div>
          </Paper>
        </div>
        <div style={{flex: 1, paddingLeft: '8px'}}>
          <Paper elevation={3}>
            <div style={{padding: '16px'}}>
              <TextField
                label="Author"
                value={recipeAuthor}
                onChange={(e) => setRecipeAuthor(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{padding: '16px'}}>
              <TextField
                label="Keywords"
                value={recipeKeyword}
                onChange={(e) => setRecipeKeyword(e.target.value)}
                fullWidth
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '28px',
              }}
            >
              <Rating
                name="Rating"
                defaultValue={2.5}
                precision={0.5}
                value={recipeRating}
                onChange={(e) => setRecipeRating(e.target.value)}
                fullWidth
              />
            </div>
          </Paper>
        </div>
        <div style={{flex: 1, paddingLeft: '8px'}}>
          <Paper elevation={3}>
            <div style={{padding: '16px'}}>
              <TextField
                label="Cook Time"
                value={recipeTime}
                onChange={(e) => setRecipeTime(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{padding: '16px'}}>
              <TextField
                label="Allergens"
                value={recipeAllergens}
                onChange={(e) => setRecipeAllergens(e.target.value)}
                fullWidth
              />
            </div>
            <div style={{padding: '16px'}}>
              <TextField
                label="Summary"
                value={recipeSummary}
                onChange={(e) => setRecipeSummary(e.target.value)}
                fullWidth
              />
            </div>
          </Paper>
        </div>
      </div>
      <Paper elevation={5} style={{marginTop: '16px'}}>
        <div style={{padding: '16px', maxHeight: '800px', overflow: 'auto'}}>
          <ReactQuill
            value={recipeContent}
            onChange={setRecipeContent}
            style={{height: '300px', width: '100%'}}
          />
        </div>
      </Paper>
      <div style={{marginTop: '32px', textAlign: 'center'}}>
        <Button variant="contained" color="primary" onClick={saveRecipe}>
          Save Recipe
        </Button>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={
          saveStatus === 'success'
            ? 'Recipe saved successfully!'
            : 'Error saving recipe. Please try again.'
        }
      />
    </Container>
  );
};

export default RecipeForm;

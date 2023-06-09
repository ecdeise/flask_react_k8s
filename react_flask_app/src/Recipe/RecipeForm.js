import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  TextField,
  Button,
  Paper,
  Container,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Rating} from '@mui/material';
import config from '../config.json';

const baseUrl = config[process.env.NODE_ENV].baseUrl;
//const baseUrl = process.env.REACT_APP_BASE_URL;
const endpointUrl = '/api/recipe';
const recipe_url = `${baseUrl}${endpointUrl}`;

const accessToken = sessionStorage.getItem('access_token');
//get user_id from session
const user_id = sessionStorage.getItem('user_id');

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

const RecipeForm = ({
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
  setRecipeId,
}) => {
  const [saveStatus, setSaveStatus] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showTextFields, setShowTextFields] = useState(true);

  useEffect(() => {
    if (selectedRow) {
      setRecipeId(selectedRow.id);
      setRecipeName(selectedRow.recipename);
      setRecipeSource(selectedRow.recipesource);
      setRecipeAuthor(selectedRow.author);
      setRecipeKeyword(selectedRow.keywords);
      setRecipeRating(selectedRow.rating);
      setRecipeImage(selectedRow.imageurl);
      setRecipeTime(selectedRow.cooktime);
      setRecipeAllergens(selectedRow.allergens);
      setRecipeSummary(selectedRow.summary);
      setRecipeContent(selectedRow.recipe);
    }
  }, [selectedRow]);

  useEffect(() => {
    if (selectedRow) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [selectedRow]);

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
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const saveRecipe = () => {
    if (!recipeName || !recipeContent) {
      setSaveStatus('Error: Name and Content are required');
      setSnackbarOpen(true);
      return;
    }
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
      user_id,
    };

    axios
      .post(`${recipe_url}/addrecipe`, recipe, {headers})
      .then((response) => {
        console.log(`${recipe_url}/addrecipe ${response.status}`);
        console.log(response.data.recipe);
        setSaveStatus('success');
        setSnackbarOpen(true);
        setRecipes([...recipes, ...response.data.recipe]);
        onSave();
      })
      .catch((error) => {
        console.error(error);
        setSaveStatus('error');
        setSnackbarOpen(true);
      });
  };

  const updateRecipe = () => {
    if (selectedRow) {
      const recipeId = selectedRow.id;

      // Create an object with the updated recipe data
      const updatedRecipe = {
        recipeName: recipeName,
        recipeSource: recipeSource,
        recipeAuthor: recipeAuthor,
        recipeKeyword: recipeKeyword,
        recipeRating: recipeRating,
        recipeImage: recipeImage,
        recipeTime: recipeTime,
        recipeAllergens: recipeAllergens,
        recipeSummary: recipeSummary,
        recipeContent: recipeContent,
        user_id: user_id,
      };
      if (
        !updatedRecipe.recipeName ||
        !updatedRecipe.recipeContent ||
        updatedRecipe.recipeContent === '<p><br></p>'
      ) {
        setSaveStatus('Error: Name and Content are required');
        setSnackbarOpen(true);
        return;
      }
      console.log(recipeId);
      console.log(updatedRecipe);
      axios
        .put(`${baseUrl}/api/recipe/${recipeId}`, updatedRecipe, {
          headers,
        })

        .then((response) => {
          console.log(`${recipe_url}/${recipeId} ${response.status}`);
          console.log(response.data.recipe);
          setSaveStatus('success');
          setSnackbarOpen(true);
          // Update the corresponding recipe in the recipes array
          const updatedRecipes = recipes.map((recipe) =>
            recipe.id === recipeId ? response.data.recipe[0] : recipe
          );
          setRecipes(updatedRecipes);
        })
        .catch((error) => {
          console.error(error);
          setSaveStatus('error');
          setSnackbarOpen(true);
        });
    }
  };

  return (
    <Container maxWidth="md">
      AuthUser ID: {user_id}
      {!recipeName && showTextFields ? (
        <h2 style={{textAlign: 'center'}}>Recipe</h2>
      ) : (
        <h2 style={{textAlign: 'center'}}>{recipeName}</h2>
      )}
      <Accordion
        expanded={showTextFields}
        onChange={() => setShowTextFields(!showTextFields)}
      >
        <AccordionSummary
          style={{
            height: '30px',
            minHeight: 'unset',
            backgroundColor: '#607D8B',
            color: 'white',
            boxShadow:
              '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          }}
          expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}
        >
          {showTextFields ? <h4>Collapse Details</h4> : <h4>Expand Details</h4>}
        </AccordionSummary>

        <AccordionDetails>
          <div style={{display: 'flex', width: '100%'}}>
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
        </AccordionDetails>
      </Accordion>
      <Paper elevation={5} style={{marginTop: '16px'}}>
        <div style={{padding: '16px', maxHeight: '800px', overflow: 'auto'}}>
          <ReactQuill
            value={recipeContent}
            onChange={setRecipeContent}
            style={{height: showTextFields ? '300px' : '600px', width: '100%'}}
          />
        </div>
      </Paper>
      <div style={{marginTop: '32px', textAlign: 'center'}}>
        <Button
          variant="contained"
          color="primary"
          onClick={editMode ? updateRecipe : saveRecipe}
        >
          {editMode ? 'Update Recipe' : 'Save Recipe'}
        </Button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={
          saveStatus === 'success'
            ? 'Recipe saved successfully!'
            : 'Error saving recipe.' + saveStatus
        }
      />
    </Container>
  );
};

export default RecipeForm;

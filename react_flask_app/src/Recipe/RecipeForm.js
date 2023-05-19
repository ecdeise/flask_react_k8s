import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Container,
  InputLabel,
  Typography,
} from '@material-ui/core';
//import Rating from '@mui/lab/Rating';
import {Rating} from '@mui/material';

const RecipeForm = ({apiResponse}) => {
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

  const saveRecipe = () => {
    // Implement the logic to save the recipe to the database
    // You can access all the form values and the recipeContent state here
    // Use the data to make the API request or perform any necessary actions
    console.log('Saving recipe:', {
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
    </Container>
  );

  // return (
  //   <Container maxWidth="md">
  //     <h2 style={{textAlign: 'center'}}>Recipe</h2>
  //     <Paper elevation={18}>
  //       <div style={{padding: '16px'}}>
  //         <TextField
  //           label="Name"
  //           value={recipeName}
  //           onChange={(e) => setRecipeName(e.target.value)}
  //           fullWidth
  //         />
  //       </div>
  //       <div style={{padding: '16px'}}>
  //         <TextField
  //           label="Image URL"
  //           value={recipeImage}
  //           onChange={(e) => setRecipeImage(e.target.value)}
  //           fullWidth
  //         />
  //       </div>
  //       <div style={{padding: '16px'}}>
  //         <TextField
  //           label="Source"
  //           value={recipeSource}
  //           onChange={(e) => setRecipeSource(e.target.value)}
  //           fullWidth
  //         />
  //       </div>
  //       <div style={{padding: '16px'}}>
  //         <TextField
  //           label="Author"
  //           value={recipeAuthor}
  //           onChange={(e) => setRecipeAuthor(e.target.value)}
  //           fullWidth
  //         />
  //       </div>
  //       <div style={{padding: '16px'}}>
  //         <TextField
  //           label="Keywords"
  //           value={recipeKeyword}
  //           onChange={(e) => setRecipeKeyword(e.target.value)}
  //           fullWidth
  //         />
  //       </div>
  //       <div style={{padding: '16px'}}>
  //         <TextField
  //           type="date"
  //           value={recipeDate}
  //           onChange={(e) => setRecipeDate(e.target.value)}
  //           fullWidth
  //         />
  //       </div>
  //     </Paper>
  //     <Paper elevation={3}>
  //       <div style={{padding: '16px', maxHeight: '800px', overflow: 'auto'}}>
  //         <ReactQuill
  //           value={recipeContent}
  //           onChange={setRecipeContent}
  //           style={{height: '300px', width: '100%'}}
  //         />
  //       </div>
  //     </Paper>
  //     <div style={{marginTop: '32px', textAlign: 'center'}}>
  //       <Button variant="contained" color="primary" onClick={saveRecipe}>
  //         Save Recipe
  //       </Button>
  //     </div>
  //   </Container>
  // );
};

export default RecipeForm;

import React, {useState} from 'react';
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Add,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import AddRecipe from './AddRecipe';
import RecipeDataGrid from './RecipeDataGrid';

function RecipeMain({username}) {
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [id, setRecipeId] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [recipeSource, setRecipeSource] = useState('');
  const [recipeAuthor, setRecipeAuthor] = useState('');
  const [recipeKeyword, setRecipeKeyword] = useState('');
  const [recipeRating, setRecipeRating] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [recipeAllergens, setRecipeAllergens] = useState('');
  const [recipeSummary, setRecipeSummary] = useState('');
  const [recipeContent, setRecipeContent] = useState('');

  const toggleAddRecipe = () => {
    setShowAddRecipe(!showAddRecipe);
  };

  return (
    <Container>
      <div>
        <h1>Recipe Library - {username.toUpperCase()}</h1>
        <Accordion
          expanded={showAddRecipe}
          style={{
            marginBottom: '10px',
          }}
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
            disabled={cameraOn}
            expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}
            onClick={toggleAddRecipe}
            aria-controls="add-recipe-content"
            id="add-recipe-header"
          >
            {showAddRecipe ? <h4>Collapse</h4> : <h4>Add Recipe</h4>}
          </AccordionSummary>
          <AccordionDetails>
            <AddRecipe
              cameraOn={cameraOn}
              setCameraOn={setCameraOn}
              recipes={recipes}
              setRecipes={setRecipes}
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
            />
          </AccordionDetails>
        </Accordion>
        <RecipeDataGrid
          recipes={recipes}
          setRecipes={setRecipes}
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
        />
      </div>
    </Container>
  );
}

export default RecipeMain;

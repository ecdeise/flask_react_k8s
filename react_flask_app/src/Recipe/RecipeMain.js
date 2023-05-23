import React, {useState} from 'react';
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
} from '@material-ui/core';
import AddRecipe from './AddRecipe';

function RecipeMain() {
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const toggleAddRecipe = () => {
    setShowAddRecipe(!showAddRecipe);
  };

  return (
    <Container>
      <div>
        <h1>Recipe Database Home</h1>
        <Button
          color="primary"
          onClick={toggleAddRecipe}
          style={{marginBottom: '10px'}}
          disabled={cameraOn} // Disable the button when cameraOn is true
        >
          {showAddRecipe ? 'Cancel' : 'Add New Recipe'}
        </Button>
        {showAddRecipe && (
          <AddRecipe cameraOn={cameraOn} setCameraOn={setCameraOn} />
        )}
      </div>
    </Container>
  );
}

export default RecipeMain;

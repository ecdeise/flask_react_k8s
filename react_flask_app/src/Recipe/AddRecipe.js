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
import ImageCapture from './ImageCapture';
import RecipeForm from './RecipeForm';

function AddRecipe({cameraOn, setCameraOn, recipes, setRecipes}) {
  const [selectedOption, setSelectedOption] = useState('manual');
  const [showImageCapture, setShowImageCapture] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  //const [cameraOn, setCameraOn] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddNewRecipe = () => {
    if (selectedOption === 'webcam') {
      setShowImageCapture(true);
      setShowManualInput(false);
    }
    if (selectedOption === 'manual') {
      setShowImageCapture(false);
      setShowManualInput(true);
    } else {
    }
  };

  const handleReturnToOptions = () => {
    setShowImageCapture(false);
    setCameraOn(false);
    setShowManualInput(false);
  };

  return (
    <Container>
      <div>
        {!showImageCapture && !showManualInput && (
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Source</FormLabel>
            <RadioGroup
              name="recipeOptions"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <FormControlLabel
                value="manual"
                control={<Radio />}
                label="Manual Input"
              />
              <FormControlLabel
                value="link"
                control={<Radio />}
                label="Link to a URL"
              />
              <FormControlLabel
                value="image"
                control={<Radio />}
                label="Import an Image"
              />
              <FormControlLabel
                value="webcam"
                control={<Radio />}
                label="Screenshot from Webcam"
              />
            </RadioGroup>
          </FormControl>
        )}
        {showImageCapture ? (
          <div>
            <h2>Capture Image From WebCam</h2>
            <ImageCapture cameraOn={cameraOn} setCameraOn={setCameraOn} />
            {!cameraOn && (
              <Button
                // variant="contained"
                color="primary"
                onClick={handleReturnToOptions}
              >
                Back to Options
              </Button>
            )}
          </div>
        ) : showManualInput ? (
          <div>
            <Button
              // variant="contained"
              color="primary"
              onClick={handleReturnToOptions}
            >
              Back to Options
            </Button>
            <RecipeForm recipes={recipes} setRecipes={setRecipes} />
          </div>
        ) : (
          <Button
            // variant="contained"
            color="primary"
            onClick={handleAddNewRecipe}
          >
            Add New Recipe
          </Button>
        )}
      </div>
    </Container>
  );
}

export default AddRecipe;

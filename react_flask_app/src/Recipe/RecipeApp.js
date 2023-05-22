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

function RecipeApp() {
  const [selectedOption, setSelectedOption] = useState('manual'); // Set "Add Recipe Manually" as default
  const [showImageCapture, setShowImageCapture] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

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
        <h1>Recipe Database</h1>
        {!showImageCapture && !showManualInput && (
          <FormControl component="fieldset">
            <FormLabel component="legend">Add Recipe</FormLabel>
            <RadioGroup
              name="recipeOptions"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <FormControlLabel
                value="manual"
                control={<Radio />}
                label="Manually"
              />
              <FormControlLabel
                value="link"
                control={<Radio />}
                label="From Link"
              />
              <FormControlLabel
                value="image"
                control={<Radio />}
                label="From Image"
              />
              <FormControlLabel
                value="webcam"
                control={<Radio />}
                label="From Webcam"
              />
            </RadioGroup>
          </FormControl>
        )}
        {showImageCapture ? (
          <div>
            <h2>Capture Image</h2>
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
            <h2>Manual Input</h2>
            <RecipeForm />
            <Button
              // variant="contained"
              color="primary"
              onClick={handleReturnToOptions}
            >
              Back to Options
            </Button>
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

export default RecipeApp;

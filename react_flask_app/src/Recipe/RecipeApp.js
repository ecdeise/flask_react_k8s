import React from 'react';
import {Container, Button} from '@material-ui/core';
import ImageCapture from './ImageCapture';

function RecipeApp() {
  return (
    <>
      {
        <Container>
          <div>
            <h1>Capture Image</h1>
            <ImageCapture />
          </div>
        </Container>
      }
    </>
  );
}

export default RecipeApp;

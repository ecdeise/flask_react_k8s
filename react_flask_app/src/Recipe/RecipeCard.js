import React from 'react';
import {DialogContent, DialogTitle, Typography} from '@mui/material';

const RecipeCard = ({recipe}) => {
  return (
    <>
      <DialogTitle>Recipe</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{recipe}</Typography>
      </DialogContent>
    </>
  );
};

export default RecipeCard;

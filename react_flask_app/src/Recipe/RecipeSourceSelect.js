import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '200px',
    margin: `${theme.spacing(2)}px 0`, // Add margin around the form control
  },
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`, // Add padding inside the select
  },
}));

function RecipeSourceSelect({selectedOption, handleOptionChange}) {
  const classes = useStyles();

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Select Source</FormLabel>
      <Select
        name="recipeOptions"
        value={selectedOption}
        onChange={handleOptionChange}
        className={classes.select}
      >
        <MenuItem value="manual">Manual Input</MenuItem>
        <MenuItem value="link">Link to a URL</MenuItem>
        <MenuItem value="image">Import an Image</MenuItem>
        <MenuItem value="webcam">Screenshot from Webcam</MenuItem>
      </Select>
    </FormControl>
  );
}

export default RecipeSourceSelect;

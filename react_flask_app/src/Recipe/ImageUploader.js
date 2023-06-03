import React, {useState} from 'react';
import axios from 'axios';
import {Button, Container, Grid, Typography} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

const baseUrl = process.env.REACT_APP_BASE_URL;

const accessToken = sessionStorage.getItem('access_token');
const user_id = sessionStorage.getItem('user_id');

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [saveResponse, setsaveResponse] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      axios
        .post(`${baseUrl}/api/imageupload/`, formData, {headers})
        //.post('/api/image/upload', formData)
        .then((response) => {
          // Handle the successful upload response
          console.log(response.data);
          setsaveResponse(response.data);
          setSnackbarMessage(
            `Image uploaded successfully. Filepath: ${response.data.filepath}`
          );
        })
        .catch((error) => {
          // Handle the error case
          console.log(error);
          setsaveResponse('error');
          setSnackbarMessage('Error occurred while uploading the image.');
        });
      setSnackbarOpen(true);
    }
  };

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Image Uploader
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{display: 'none'}}
            id="file-selector"
          />
          <label htmlFor="file-selector">
            <Button variant="contained" color="primary" component="span">
              Select Image
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedFile}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {saveResponse && (
          <Typography variant="body1" gutterBottom>
            Filename: {saveResponse.filename}
            Filepath: {saveResponse.filepath}
            Text: {saveResponse.text}
          </Typography>
        )}
        {saveResponse === 'error' && (
          <Typography variant="body1" gutterBottom color="error">
            Error occurred while uploading the image.
          </Typography>
        )}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default ImageUploader;

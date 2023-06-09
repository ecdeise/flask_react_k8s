import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {Container, TextField, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CameraIcon from '@mui/icons-material/Camera';
import useStyles from '../Styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RecipeForm from './RecipeForm';
import RecipeDialog from './RecipeDialog';
import config from '../config.json';

const baseUrl = config[process.env.NODE_ENV].baseUrl;
//const baseUrl = process.env.REACT_APP_BASE_URL;
const endpointUrl = '/api/processimage';
const library_url = `${baseUrl}${endpointUrl}`;

const accessToken = sessionStorage.getItem('access_token');

const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Bearer ${accessToken}`,
};

const ImageCapture = ({
  cameraOn,
  setCameraOn,
  id,
  setRecipeId,
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
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const classes = useStyles();
  const [timeRemaining, setTimeRemaining] = useState(10); // camera turns off after 10 seconds
  const [imageCaptureApiResponse, setImageCaptureApiResponse] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    let cameraTimeout;

    const enableCamera = async () => {
      try {
        const constraints = {audio: false, video: true};
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraOn(true);
        // Set timeout to deactivate the camera after 20 seconds
        cameraTimeout = setTimeout(() => {
          setCameraOn(false);
        }, timeRemaining * 1000);
      } catch (error) {
        console.log('Error accessing media devices:', error);
      }
    };

    const disableCamera = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        setCameraOn(false);
        clearTimeout(cameraTimeout);
      }
    };

    if (cameraOn) {
      enableCamera();
    } else {
      disableCamera();
    }

    return () => {
      disableCamera();
      clearTimeout(cameraTimeout);
    };
  }, [cameraOn]);

  const takePicture = () => {
    if (!cameraOn) {
      console.log('Camera is not turned on');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBlob = canvas.toDataURL('image/jpeg');
    setImage(imageBlob);
  };

  const sendImageToAPI = () => {
    if (!image) {
      console.log('No image captured');
      return;
    }

    // process response and build input for recipeform
    const processApiResponse = (apiResponseContent) => {
      setImageCaptureApiResponse(true);
      setRecipeContent(apiResponseContent);
      setRecipeSource('WebCam Screenshot');
      setRecipeName('To Be Updated');
      // console.log(recipeContent);
      // console.log(recipeSource);
    };

    // Create a FormData object
    const formData = new FormData();
    formData.append('image', image);

    // Make the API request using Axios
    axios
      .post(`${baseUrl}/api/processimage/imagetotext`, formData, {headers})
      .then((response) => {
        processApiResponse(response.data);
        setOpenDialog(true);
      })
      .catch((error) => {
        console.log('Error sending image:', error);
        setImageCaptureApiResponse(false);
      });

    // Deactivate webcam and clear the image
    setCameraOn(false);
    setImage(null);
    setImageCaptureApiResponse(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
          width: '100%',
        }}
      >
        <Button
          className={classes.Button}
          variant="contained"
          color={cameraOn ? 'secondary' : 'primary'}
          startIcon={<CameraIcon />}
          onClick={() => setCameraOn(!cameraOn)}
          style={{marginRight: '10px'}}
        >
          {cameraOn ? 'Deactivate Webcam' : 'Activate Webcam'}
        </Button>
        {cameraOn && (
          <div>
            <Button
              className={classes.Button}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={takePicture}
              style={{marginRight: '10px'}}
            >
              Capture Image
            </Button>

            <Button
              className={classes.Button}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={sendImageToAPI}
            >
              Extract Text From Image
            </Button>
          </div>
        )}
      </div>
      {cameraOn && (
        <>
          <div style={{display: 'flex'}}>
            <video ref={videoRef} autoPlay style={{marginRight: '10px'}} />
            <canvas ref={canvasRef} style={{display: 'none'}} />
            {image && (
              <img
                src={image}
                alt="Captured"
                style={{width: '100%', height: 'auto'}}
              />
            )}
          </div>
        </>
      )}
      {imageCaptureApiResponse && (
        <div style={{marginTop: '10px'}}>
          <RecipeDialog
            open={openDialog}
            onClose={handleDialogClose}
            maxWidth="lg"
            fullWidth
          >
            <RecipeForm
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
              recipes={recipes}
              setRecipes={setRecipes}
            />
          </RecipeDialog>
        </div>
      )}
    </div>
  );
};

export default ImageCapture;

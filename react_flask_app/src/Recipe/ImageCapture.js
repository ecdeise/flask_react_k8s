import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {Container, TextField, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CameraIcon from '@mui/icons-material/Camera';
import useStyles from '../Styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RecipeForm from './RecipeForm';

const baseUrl = process.env.REACT_APP_BASE_URL;
const endpointUrl = '/api/processimage';
const library_url = `${baseUrl}${endpointUrl}`;

const accessToken = sessionStorage.getItem('access_token');

const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Bearer ${accessToken}`,
};

const ImageCapture = ({cameraOn, setCameraOn}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  // const [cameraOn, setCameraOn] = useState(false);
  const classes = useStyles();
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const constraints = {audio: false, video: true};
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraOn(true);
      } catch (error) {
        console.log('Error accessing media devices:', error);
      }
    };

    const disableCamera = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        setCameraOn(false);
      }
    };

    if (cameraOn) {
      enableCamera();
    } else {
      disableCamera();
    }

    return () => {
      disableCamera();
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

    // Create a FormData object
    const formData = new FormData();
    formData.append('image', image);

    // Make the API request using Axios or fetch
    // Example with Axios:
    axios
      .post(`${baseUrl}/api/processimage/imagetotext`, formData, {headers})
      .then((response) => {
        setApiResponse(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Error sending image:', error);
      });

    // Deactivate webcam and clear the image
    setCameraOn(false);
    setImage(null);
    setApiResponse(null);
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
              Process Image
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
      {apiResponse && (
        <div style={{marginTop: '10px'}}>
          <RecipeForm
            apiResponse={apiResponse}
            setApiResponse={setApiResponse}
            onSave={() => {
              // Save recipe logic here
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCapture;

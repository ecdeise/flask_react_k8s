import React, {useState} from 'react';
import {
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogContent,
} from '@material-ui/core';
import ImageCapture from './ImageCapture';
import RecipeForm from './RecipeForm';
import UrlInput from './UrlInput';
import ImageUploader from './ImageUploader';
import RecipeDialog from './RecipeDialog';

function AddRecipe({
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
}) {
  const [selectedOption, setSelectedOption] = useState('manual');
  const [showImageCapture, setShowImageCapture] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [urlApiResponse, setUrlApiResponse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const clearContents = () => {
    setRecipeId(null);
    setRecipeName('');
    setRecipeSource('');
    setRecipeAuthor('');
    setRecipeKeyword('');
    setRecipeRating('');
    setRecipeImage('');
    setRecipeTime('');
    setRecipeAllergens('');
    setRecipeSummary('');
    setRecipeContent('');
  };

  const handleAddNewRecipe = () => {
    if (selectedOption === 'webcam') {
      setShowImageCapture(true);
      setShowManualInput(false);
      setShowLinkInput(false);
      setShowImageUpload(false);
      handleDialogOpen();
    }
    if (selectedOption === 'manual') {
      clearContents();
      setShowImageCapture(false);
      setShowManualInput(true);
      setShowLinkInput(false);
      setShowImageUpload(false);
      handleDialogOpen();
    }
    if (selectedOption === 'link') {
      setShowImageCapture(false);
      setShowManualInput(false);
      setShowLinkInput(true);
      setShowImageUpload(false);
      handleDialogOpen();
    }
    if (selectedOption === 'image') {
      setShowImageCapture(false);
      setShowManualInput(false);
      setShowLinkInput(false);
      setShowImageUpload(true);
      handleDialogOpen();
    } else {
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    handleReturnToOptions();
  };

  const handleReturnToOptions = () => {
    setShowImageCapture(false);
    setCameraOn(false);
    setShowManualInput(false);
    setShowLinkInput(false);
    setShowImageUpload(false);
  };

  return (
    <Container style={{marginBottom: '20px'}}>
      <div>
        {!showImageCapture && !showManualInput && !showLinkInput && (
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
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
                    label="Upload an Image"
                  />
                  <FormControlLabel
                    value="webcam"
                    control={<Radio />}
                    label="Screenshot from Webcam"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button color="primary" onClick={handleAddNewRecipe} fullWidth>
                Add A New Recipe
              </Button>
            </Grid>
          </Grid>
        )}
        {showImageCapture ? (
          <div>
            <h2>Capture Image From WebCam</h2>
            {!cameraOn && (
              <Button color="primary" onClick={handleReturnToOptions}>
                Back to Options
              </Button>
            )}
            <RecipeDialog
              open={openDialog}
              onClose={handleDialogClose}
              maxWidth="lg"
              fullWidth
            >
              <ImageCapture
                cameraOn={cameraOn}
                setCameraOn={setCameraOn}
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
        ) : showManualInput ? (
          <div>
            <Button color="primary" onClick={handleReturnToOptions}>
              Back to Options
            </Button>
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
        ) : showLinkInput ? (
          <div>
            <Button color="primary" onClick={handleReturnToOptions}>
              Back to Options
            </Button>
            <RecipeDialog
              open={openDialog}
              onClose={handleDialogClose}
              maxWidth="lg"
              fullWidth
            >
              <UrlInput
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
                urlApiResponse={urlApiResponse}
                setUrlApiResponse={setUrlApiResponse}
              />
            </RecipeDialog>
          </div>
        ) : showImageUpload ? (
          <div>
            <Button color="primary" onClick={handleReturnToOptions}>
              Back to Options
            </Button>
            <RecipeDialog
              open={openDialog}
              onClose={handleDialogClose}
              maxWidth="lg"
              fullWidth
            >
              <ImageUploader
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
        ) : null}
      </div>
    </Container>
  );
}

export default AddRecipe;

// import React, {useState} from 'react';
// import {
//   Container,
//   FormControl,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   Dialog,
//   DialogContent,
// } from '@material-ui/core';
// import ImageCapture from './ImageCapture';
// import RecipeForm from './RecipeForm';
// import UrlInput from './UrlInput';
// import ImageUploader from './ImageUploader';
// import RecipeDialog from './RecipeDialog';

// function AddRecipe({
//   cameraOn,
//   setCameraOn,
//   id,
//   setRecipeId,
//   recipes,
//   setRecipes,
//   selectedRow,
//   recipeName,
//   setRecipeName,
//   recipeSource,
//   setRecipeSource,
//   recipeAuthor,
//   setRecipeAuthor,
//   recipeKeyword,
//   setRecipeKeyword,
//   recipeRating,
//   setRecipeRating,
//   recipeImage,
//   setRecipeImage,
//   recipeTime,
//   setRecipeTime,
//   recipeAllergens,
//   setRecipeAllergens,
//   recipeSummary,
//   setRecipeSummary,
//   recipeContent,
//   setRecipeContent,
// }) {
//   const [selectedOption, setSelectedOption] = useState('manual');
//   const [showImageCapture, setShowImageCapture] = useState(false);
//   const [showManualInput, setShowManualInput] = useState(false);
//   const [showLinkInput, setShowLinkInput] = useState(false);
//   const [showImageUpload, setShowImageUpload] = useState(false);
//   const [urlApiResponse, setUrlApiResponse] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const clearContents = () => {
//     setRecipeId(null);
//     setRecipeName('');
//     setRecipeSource('');
//     setRecipeAuthor('');
//     setRecipeKeyword('');
//     setRecipeRating('');
//     setRecipeImage('');
//     setRecipeTime('');
//     setRecipeAllergens('');
//     setRecipeSummary('');
//     setRecipeContent('');
//   };

//   const handleAddNewRecipe = () => {
//     if (selectedOption === 'webcam') {
//       setShowImageCapture(true);
//       setShowManualInput(false);
//       setShowLinkInput(false);
//       setShowImageUpload(false);
//     }
//     if (selectedOption === 'manual') {
//       clearContents();
//       setShowImageCapture(false);
//       setShowManualInput(true);
//       setShowLinkInput(false);
//       setShowImageUpload(false);
//       handleDialogOpen();
//     }
//     if (selectedOption === 'link') {
//       setShowImageCapture(false);
//       setShowManualInput(false);
//       setShowLinkInput(true);
//       setShowImageUpload(false);
//     }
//     if (selectedOption === 'image') {
//       setShowImageCapture(false);
//       setShowManualInput(false);
//       setShowLinkInput(false);
//       setShowImageUpload(true);
//     } else {
//     }
//   };

//   const handleDialogOpen = () => {
//     setOpenDialog(true);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     //setShowManualInput(false);
//     handleReturnToOptions();
//   };

//   const handleReturnToOptions = () => {
//     setShowImageCapture(false);
//     setCameraOn(false);
//     setShowManualInput(false);
//     setShowLinkInput(false);
//     setShowImageUpload(false);
//   };
//   return (
//     <Container style={{marginBottom: '20px'}}>
//       <div>
//         {!showImageCapture && !showManualInput && !showLinkInput && (
//           <Grid container alignItems="center" spacing={2}>
//             <Grid item xs={12} md={8}>
//               <FormControl component="fieldset">
//                 {/* <FormLabel component="legend">Select Source</FormLabel> */}
//                 <RadioGroup
//                   row
//                   name="recipeOptions"
//                   value={selectedOption}
//                   onChange={handleOptionChange}
//                 >
//                   <FormControlLabel
//                     value="manual"
//                     control={<Radio />}
//                     label="Manual Input"
//                   />
//                   <FormControlLabel
//                     value="link"
//                     control={<Radio />}
//                     label="Link to a URL"
//                   />
//                   <FormControlLabel
//                     value="image"
//                     control={<Radio />}
//                     label="Upload an Image"
//                   />
//                   <FormControlLabel
//                     value="webcam"
//                     control={<Radio />}
//                     label="Screenshot from Webcam"
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Button color="primary" onClick={handleAddNewRecipe} fullWidth>
//                 Add A New Recipe
//               </Button>
//             </Grid>
//           </Grid>
//         )}
//         {showImageCapture ? (
//           <div>
//             <h2>Capture Image From WebCam</h2>
//             {!cameraOn && (
//               <Button color="primary" onClick={handleReturnToOptions}>
//                 Back to Options
//               </Button>
//             )}
//             <ImageCapture
//               cameraOn={cameraOn}
//               setCameraOn={setCameraOn}
//               id={id}
//               recipeName={recipeName}
//               recipeSource={recipeSource}
//               recipeAuthor={recipeAuthor}
//               recipeKeyword={recipeKeyword}
//               recipeRating={recipeRating}
//               recipeImage={recipeImage}
//               recipeTime={recipeTime}
//               recipeAllergens={recipeAllergens}
//               recipeSummary={recipeSummary}
//               recipeContent={recipeContent}
//               setRecipeId={setRecipeId}
//               setRecipeName={setRecipeName}
//               setRecipeSource={setRecipeSource}
//               setRecipeAuthor={setRecipeAuthor}
//               setRecipeKeyword={setRecipeKeyword}
//               setRecipeRating={setRecipeRating}
//               setRecipeImage={setRecipeImage}
//               setRecipeTime={setRecipeTime}
//               setRecipeAllergens={setRecipeAllergens}
//               setRecipeSummary={setRecipeSummary}
//               setRecipeContent={setRecipeContent}
//               recipes={recipes}
//               setRecipes={setRecipes}
//             />
//           </div>
//         ) : showManualInput ? (
//           <div>
//             <Button color="primary" onClick={handleReturnToOptions}>
//               Back to Options
//             </Button>
//             <RecipeDialog
//               open={openDialog}
//               onClose={handleDialogClose}
//               maxWidth="lg"
//               fullWidth
//             >
//               <RecipeForm
//                 id={id}
//                 recipeName={recipeName}
//                 recipeSource={recipeSource}
//                 recipeAuthor={recipeAuthor}
//                 recipeKeyword={recipeKeyword}
//                 recipeRating={recipeRating}
//                 recipeImage={recipeImage}
//                 recipeTime={recipeTime}
//                 recipeAllergens={recipeAllergens}
//                 recipeSummary={recipeSummary}
//                 recipeContent={recipeContent}
//                 setRecipeId={setRecipeId}
//                 setRecipeName={setRecipeName}
//                 setRecipeSource={setRecipeSource}
//                 setRecipeAuthor={setRecipeAuthor}
//                 setRecipeKeyword={setRecipeKeyword}
//                 setRecipeRating={setRecipeRating}
//                 setRecipeImage={setRecipeImage}
//                 setRecipeTime={setRecipeTime}
//                 setRecipeAllergens={setRecipeAllergens}
//                 setRecipeSummary={setRecipeSummary}
//                 setRecipeContent={setRecipeContent}
//                 recipes={recipes}
//                 setRecipes={setRecipes}
//               />
//             </RecipeDialog>
//           </div>
//         ) : showLinkInput ? (
//           <div>
//             <Button color="primary" onClick={handleReturnToOptions}>
//               Back to Options
//             </Button>
//             <RecipeDialog
//               open={openDialog}
//               onClose={handleDialogClose}
//               maxWidth="lg"
//               fullWidth
//             >
//               <UrlInput
//                 id={id}
//                 recipeName={recipeName}
//                 recipeSource={recipeSource}
//                 recipeAuthor={recipeAuthor}
//                 recipeKeyword={recipeKeyword}
//                 recipeRating={recipeRating}
//                 recipeImage={recipeImage}
//                 recipeTime={recipeTime}
//                 recipeAllergens={recipeAllergens}
//                 recipeSummary={recipeSummary}
//                 recipeContent={recipeContent}
//                 setRecipeId={setRecipeId}
//                 setRecipeName={setRecipeName}
//                 setRecipeSource={setRecipeSource}
//                 setRecipeAuthor={setRecipeAuthor}
//                 setRecipeKeyword={setRecipeKeyword}
//                 setRecipeRating={setRecipeRating}
//                 setRecipeImage={setRecipeImage}
//                 setRecipeTime={setRecipeTime}
//                 setRecipeAllergens={setRecipeAllergens}
//                 setRecipeSummary={setRecipeSummary}
//                 setRecipeContent={setRecipeContent}
//                 recipes={recipes}
//                 setRecipes={setRecipes}
//                 urlApiResponse={urlApiResponse}
//                 setUrlApiResponse={setUrlApiResponse}
//               />
//             </RecipeDialog>
//           </div>
//         ) : showImageUpload ? (
//           <div>
//             <Button color="primary" onClick={handleReturnToOptions}>
//               Back to Options
//             </Button>
//             <ImageUploader
//               id={id}
//               recipeName={recipeName}
//               recipeSource={recipeSource}
//               recipeAuthor={recipeAuthor}
//               recipeKeyword={recipeKeyword}
//               recipeRating={recipeRating}
//               recipeImage={recipeImage}
//               recipeTime={recipeTime}
//               recipeAllergens={recipeAllergens}
//               recipeSummary={recipeSummary}
//               recipeContent={recipeContent}
//               setRecipeId={setRecipeId}
//               setRecipeName={setRecipeName}
//               setRecipeSource={setRecipeSource}
//               setRecipeAuthor={setRecipeAuthor}
//               setRecipeKeyword={setRecipeKeyword}
//               setRecipeRating={setRecipeRating}
//               setRecipeImage={setRecipeImage}
//               setRecipeTime={setRecipeTime}
//               setRecipeAllergens={setRecipeAllergens}
//               setRecipeSummary={setRecipeSummary}
//               setRecipeContent={setRecipeContent}
//               recipes={recipes}
//               setRecipes={setRecipes}
//             />
//           </div>
//         ) : null}
//       </div>
//     </Container>
//   );
// }

// export default AddRecipe;

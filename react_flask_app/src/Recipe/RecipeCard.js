// import React from 'react';
// import {DialogContent, DialogTitle, Typography} from '@mui/material';

// const RecipeCard = ({recipe, name}) => {
//   return (
//     <>
//       <DialogTitle>Title: {name}</DialogTitle>
//       <DialogContent>
//         {/* <Typography variant="body1">{recipe}</Typography> */}
//         <Typography
//           variant="body1"
//           dangerouslySetInnerHTML={{__html: recipe}}
//         />
//       </DialogContent>
//     </>
//   );
// };

// export default RecipeCard;

import React from 'react';
import {DialogContent, DialogTitle, Typography} from '@mui/material';
import DOMPurify from 'dompurify';

const RecipeCard = ({recipe, name}) => {
  const sanitizedRecipe = DOMPurify.sanitize(recipe);

  return (
    <>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{__html: sanitizedRecipe}}
        />
      </DialogContent>
    </>
  );
};

export default RecipeCard;

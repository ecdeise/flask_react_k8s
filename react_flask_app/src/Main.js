import React from 'react';
import Box from '@mui/material/Box';

function Main() {
  return (
    <div>
      <h1>Welcome to Deise-Labs</h1>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '600px',
          margin: 'auto',
        }}
      >
        <div style={{fontStyle: 'italic'}}>
          The totality of our so-called knowledge or beliefs, from the most
          casual matters of geography and history to the profoundest laws of
          atomic physics or even of pure mathematics and logic, is a man-made
          fabric which impinges on experience only along the edges. Or, to
          change the figure, total science is like a field of force whose
          boundary conditions are experience. -- Willard Van Orman Quine
        </div>
      </Box>
    </div>
  );
}

export default Main;

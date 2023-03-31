import React from 'react';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <footer>
        <p>&copy; 2023 Deise-Labs. All Rights Reserved.</p>
      </footer>
    </Box>
  );
}

export default Footer;

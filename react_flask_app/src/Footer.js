import React from 'react';
import Box from '@mui/material/Box';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '40px',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <footer>
        <p>&copy; {currentYear} Deise-Labs. All Rights Reserved.</p>
      </footer>
    </Box>
  );
}

export default Footer;

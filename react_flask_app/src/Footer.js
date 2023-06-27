import React from 'react';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';

function Footer({loggedIn, username}) {
  const currentYear = new Date().getFullYear();
  const environment =
    process.env.NODE_ENV === 'production' ? 'Production' : 'Development';

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '40px',
        textAlign: 'center',
        backgroundColor: '#f5f5f5', //  '#336699'
      }}
    >
      <footer>
        <div>
          <Typography variant="subtitle1">
            &copy; {currentYear} Deise-Labs. All Rights Reserved. ({environment}{' '}
            Build) {loggedIn ? `${username}` : 'Logged out'}
          </Typography>
        </div>
      </footer>
    </Box>
  );
}

export default Footer;

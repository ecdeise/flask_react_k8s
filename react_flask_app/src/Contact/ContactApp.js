import React from 'react';
import ContactDataGrid from './ContactDataGrid';
import {Container} from '@mui/material';

function ContactApp() {
  return (
    <>
      {
        <Container>
          <div>
            <h1>Contacts</h1>
            <ContactDataGrid />
          </div>
        </Container>
      }
    </>
  );
}

export default ContactApp;

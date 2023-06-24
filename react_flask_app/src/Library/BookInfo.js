import React, {useState} from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import config from '../config';

const baseUrl = config.baseUrl;
const endpointUrl = '/api/library';
const library_url = `${baseUrl}${endpointUrl}`;

const accessToken = sessionStorage.getItem('access_token');

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

function BookInfo({book, onSave, books, setBooks}) {
  const [showDescription, setShowDescription] = React.useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    console.log('Saving book...');
    setSaving(true);
    axios
      .post(`${library_url}/addbook`, book, {headers})
      .then((response) => {
        console.log(`POST /api/library/addbook HTTP/1.1 ${response.status}`);
        console.log(response.data.book);
        onSave(); // Clear book state
        setSaving(false);
        setBooks([...books, ...response.data.book]); // Add new book to books array
      })
      .catch((error) => console.error(error));
  };

  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        minWidth: 400,
        border: '1px solid #ccc',
        mt: 4,
        mb: 4,
      }}
    >
      <Box sx={{display: 'flex'}}>
        <CardMedia
          component="img"
          sx={{height: 300, flex: '0 0 auto', maxWidth: 200}}
          image={book.cover.thumbnail}
          alt={book.book_info.Title}
        />
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <CardContent>
            <Typography variant="h5" color="text.primary" gutterBottom>
              {book.book_info.Title}
            </Typography>
            <Typography variant="subtitle1" component="div">
              by {book.book_info.Authors.join(', ')}
            </Typography>
            <Typography sx={{mb: 1}} color="text.secondary">
              ISBN-13: {book.book_info['ISBN-13']}
            </Typography>
            <Typography sx={{mb: 1}} color="text.secondary">
              Published by {book.book_info.Publisher} in {book.book_info.Year}
            </Typography>
            <Typography sx={{mb: 1}} color="text.secondary">
              Language: {book.book_info.Language}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleSave}>
              Add Book to Library
            </Button>
            <Button size="small" onClick={handleShowDescription}>
              Learn More
            </Button>
          </CardActions>
        </Box>
      </Box>
      {showDescription && (
        <Box sx={{p: 2}}>
          <Typography variant="body1">{book.description}</Typography>
        </Box>
      )}
    </Card>
  );
}

export default BookInfo;

import * as React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import config from '../config';

export default function BookInfoCard({book}) {
  const [showDescription, setShowDescription] = React.useState(false);
  const [books, setBooks] = useState([]);
  const baseUrl = config.baseUrl;
  const accessToken = sessionStorage.getItem('access_token');

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  if (!book || book.length === 0) {
    return;
    // return <div>No book information available</div>;
  }

  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAddBookToLibrary = () => {
    axios
      .post(`${baseUrl}/api/library/addbook`, book, {headers})
      .then((response) => {
        console.log(`POST /api/library/addbook HTTP/1.1 ${response.status}`);
        console.log(response.data);
        const newBook = response.data.book;
        setBooks((books) => [...books, newBook]);
      })
      .catch((error) => console.error(error));
  };

  if (!book.book_info) {
    return (
      <Card
        sx={{
          maxWidth: 300,
          minWidth: 200,
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '1rem',
          backgroundColor: '#f1f9ff',
        }}
      >
        <Box sx={{display: 'flex'}}>
          <CardMedia
            component="img"
            sx={{
              width: 80,
              height: 100,
              flex: '0 0 auto',
              objectFit: 'contain',
              marginTop: 3,
            }}
            image={book.smallthumbnail}
            alt={book.title}
          />
          <Box sx={{display: 'flex', flexDirection: 'column', ml: 1}}>
            <CardContent>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="subtitle1" component="div">
                by {book.authors}
              </Typography>
              <Typography sx={{mb: 1}} color="text.secondary">
                ISBN-13: {book.isbn13}
              </Typography>
              <Typography sx={{mb: 1}} color="text.secondary">
                Published by {book.publisher} in {book.year}
              </Typography>
              <Typography sx={{mb: 0}} color="text.secondary">
                Language: {book.language}
              </Typography>
            </CardContent>
            <CardActions>
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
  } else {
    return (
      <Card sx={{maxWidth: 500, minWidth: 400}}>
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
              <Button size="small" onClick={handleAddBookToLibrary}>
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
}

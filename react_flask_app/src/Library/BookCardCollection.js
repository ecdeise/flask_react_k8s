import * as React from 'react';
import {useState} from 'react';
import BookInfoCard from './BookInfoCard';

export default function BookCardCollection({books}) {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        gridGap: '4rem', // add gap between the cards
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {books.map((book) => (
        <BookInfoCard
          book={book}
          key={book.id}
          onClick={handleBookSelect}
          style={{
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '1rem',
            backgroundColor: '#f1f9ff',
          }}
        />
      ))}
    </div>
  );
}

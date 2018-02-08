import React from 'react';
import BookItem from './BookItem';

function BookShelf (props) {
  const { title, id, onUpdateBookShelf, books } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid" key={id}>
          {books.map((book) => {
            const { id } = book;
              return (
                <BookItem
                  key={id}
                  id={id}
                  book={book}
                  onUpdateBookShelf={onUpdateBookShelf}
                  />
                )
            })}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf

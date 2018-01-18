import React from 'react';
import BookItem from './BookItem';

function BookShelf (props) {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid" key={props.id}>
          {props.books.map((book) => (
            <BookItem
              key={book.id}
              id={book.id}
              book={book}
              onUpdateBookShelf={props.onUpdateBookShelf}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf

import React from 'react';

function BookItem (props) {

  const { book, onUpdateBookShelf, id } = props;

  const updateBookShelf = (event) => {
    const shelf = event.target.value;
    onUpdateBookShelf(book, shelf);
  };

  const thumbnailImage = book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/174x128';

  return(
    <li key={props.id} className="book" >
          <div className="book-top">
           <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${thumbnailImage})`}}></div>
            <div className="book-shelf-changer">
            <select value={book.shelf} onChange={updateBookShelf} >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.publisher}</div>
    </li>
  )
}

export default BookItem

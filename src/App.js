import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import sortBy from 'sort-by';
import BookList from './BookList';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {

  state = {
    query: '',
    books:[]
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.sort(sortBy('title'));
      this.setState({books:books});
    })
  };

/**
* Moves books to bookshelf
* @param {object} book book object
*/
  moveToShelf = (book) => {
    const books = this.state.books;
    const selectedBookID = books.findIndex((product) => product.id === book.id);
    if (selectedBookID === -1) {
      //Selected book wasn't on my shelf -  so lets add to it
      books.push(book);
    }
    if (selectedBookID !== -1) {
      // Selected book was already on one of my shelves
      if (book.shelf === 'none') {
       // Removed from the shelf
        books.splice(selectedBookID, 1);
      }
      if (book.shelf !== 'none') {
        // Move betweeen shelves
        books[selectedBookID] = book;
      }
    }
    this.setState({ books });
  };

  /**
  * Updates bookshelf
  * @param {object} book book object
  * @param {string} shelf shelf choosed
  */

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
        book.shelf = shelf;
        this.moveToShelf(book);
      });
  };

 /**
 * Gets the shelf name for the books
 * @param {string} bookId id for the book
 */

  bookShelfGetter = (bookID) => {
    let ourBooks = this.state.books
      .find((book) => book.id === bookID);
    return ourBooks ? ourBooks.shelf : 'none';
};


  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <BookSearch
            books={this.state.books}
            onUpdateBooks={this.updateBookShelf}
            onUpdateBookShelf={this.updateBookShelf}
            bookShelfGetter={this.bookShelfGetter}
          />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList
            books={this.state.books}
            onUpdateBookShelf={this.updateBookShelf}
            />

            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import sortBy from 'sort-by';
import BookList from './BookList'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {
  state = {
    query: '',
    books:[],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.sort(sortBy('title'));
      this.setState({books:books})
    })
  }

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

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
        book.shelf = shelf;
        this.moveToShelf(book);
      });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch
            books={this.state.books}
            onUpdateBooks={this.updateBookShelf}
            onUpdateBookShelf={this.updateBookShelf}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList
            books={this.state.books}
            onUpdateBookShelf={this.updateBookShelf}
            />

            <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
      )}
      </div>
    )
  }
}

export default BooksApp

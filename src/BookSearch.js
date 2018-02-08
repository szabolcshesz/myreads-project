import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookItem from './BookItem';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class BookSearch extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
    onUpdateBooks: PropTypes.func.isRequired,
    bookShelfGetter: PropTypes.func.isRequired
  };

  state = {
    query: '',
    resultlist: []
  };

  timeoutFunc = null;
  timer = null;

  /**
  * Updates state.query
  * @param {string} query query string
  */
  updateQuery = (query) => {
    this.setState({ query:query });
  };

  /**
  * Search function with API call
  * sets the state.resultlist - the list of results
  * @param {string} query query string
  */
  bookSearch = (query) => {
    window.clearTimeout(this.timer);
    this.timeoutFunc = () => {
    BooksAPI.search(query)
      .then((results) => {
        if (!results.error) {
        let shelvesResult = results.map((book) => {
          book.shelf = this.props.bookShelfGetter(book.id);
          return book;
          });
          this.setState({ resultlist: shelvesResult});
        } else {
          this.setState({ resultlist: [] });
        }
        });
    }
    this.timer = window.setTimeout(this.timeoutFunc, 500);
  };

  render() {
    const { query, resultlist } = this.state;
    if (query) {
      this.bookSearch(query);
    }

    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link to='/' className="close-search" >Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            placeholder="Search by title or author"
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
      {query && (resultlist.length === 0 ? (<p>No results found for <em>"{query}"</em></p>)
      : (<p>Showing {resultlist.length} books for <em>"{query}"</em></p>))}
      <ol className='books-grid'>
        {resultlist.map((book) => (
          <BookItem
            key={book.id}
            id={book.id}
            book={book}
            onUpdateBookShelf={this.props.onUpdateBookShelf}
            />
        ))}
    </ol>
    </div>
    </div>
    )
  }
}


export default BookSearch

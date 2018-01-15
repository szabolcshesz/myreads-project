import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookItem from './BookItem'
import { Link } from 'react-router-dom';

class BookSearch extends Component {

  state = {
    query: '',
    list: []
  }

  timeoutFunc = null;
  timer = null;

  updateQuery = (query) => {
    this.setState({ query:query })
    query = query.trim()
  }

  bookSearch = (query) => {
    window.clearTimeout(this.timer);
    this.timeoutFunc = () => {
    BooksAPI.search(query)
      .then((results) => {
          this.setState({ list: results});
          return results
        });
    }
    this.timer = window.setTimeout(this.timeoutFunc, 500);
  }

  render() {
    const { query, list } = this.state;
    if (query) {
      this.bookSearch(query)
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
      {query && (list.length === 0 ? (<p>No results found for <em>"{query}"</em></p>)
      : (<p>Showing {list.length} books for <em>"{query}"</em></p>))}
      <ol className='books-grid'>
        {list.map((book) => (
          <BookItem
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

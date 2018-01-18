import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class BookList extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  };

  state = {
    books: this.props.books
  };

  render() {
    let shelfLoader = (shelf) => {
      return this.props.books.filter((book) => book.shelf === shelf);
    };

    const shelves = [
      { id: 'currentlyReading', name: 'Currently Reading' },
      { id: 'wantToRead', name: 'Want to Read' },
      { id: 'read', name: 'Read' }
    ];

    return (
      <div className="container full-width">
        {shelves.map((shelf) => (
            <BookShelf
              key={shelf.id}
              id={shelf.id}
              title={shelf.name}
              books={shelfLoader(shelf.id)}
              onUpdateBookShelf={this.props.onUpdateBookShelf}
              />
            ))}
      </div>
    )
  }
}

export default BookList

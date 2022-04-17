import React, { Component } from "react";
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI'
import Book from "./Book";


class SearchBooks extends Component {
  state = {
    books: [],
    query: "",
  }

  upeateQuery(query) {
    BooksAPI.search(query)
    .then((books) => {
      return (
        books ? this.setState({ books }) : []
      )
    })
    this.setState({query});
  }
  bookShelf(book, shelf) {
    BooksAPI.update(book, shelf)
  }

  searchResoults() {
    const { books, query } = this.state;
    if(query) {
      return books.error ?
      <div>No results found</div>
      : books.map((book, index) => {
        return (
          <Book
            key={index}
            book={book}
            bookShelf={this.bookShelf.bind(this)}
          />
        )
      })
    }
  }

  render() {
    return (
      <div className="search-books-results">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                      placeholder="Search by title or author"
                      value={this.state.query}
                      onChange={e => this.upeateQuery(e.target.value)}
              />
            </div>
          </div>
          <ol className="books-grid">
            {this.searchResoults()}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
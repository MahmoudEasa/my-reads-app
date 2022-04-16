import React, { Component } from 'react'
import escapeStringRegexp from 'escape-string-regexp';

import AddBook from './AddBook'
import * as BooksAPI from '../BooksAPI'
import Book from './Book';

class Sections extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }
  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll()
    .then(books => {
      // Currently Reading
      const matchCurrentlyReading = new RegExp(escapeStringRegexp("currentlyReading"));
      let currentlyReading = books ? books.filter(book => {
        return matchCurrentlyReading.test(book.shelf)
      }) : null;
  
      // Want To Read
      const matchWantToRead = new RegExp(escapeStringRegexp("wantToRead"));
      let wantToRead = books ? books.filter(book => {
        return matchWantToRead.test(book.shelf)
      }) : null;
  
      // Read
      const matchRead = new RegExp(escapeStringRegexp("read"));
      let read = books ? books.filter(book => {
        return matchRead.test(book.shelf)
      }) : null;
  
      this.setState({currentlyReading, wantToRead, read})
    })
    .catch(err => {console.log(err)})
  }

  bookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => this.getBooks());
  }

  renderShelf(books, title) {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) =>
            <Book
              key={index}
              book={book}
              bookShelf={this.bookShelf.bind(this)}
            />)}
          </ol>
        </div>
      </div>
    )
  }
  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="app">
        <div className="list-books">

          {/* Nav Bar */}
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          {/* Main Sections */}
          <div className="list-books-content">
            <div>
              {this.renderShelf(currentlyReading, 'Currently Reading')}
              {this.renderShelf(wantToRead, 'Want to Read')}
              {this.renderShelf(read, 'Read')}
            </div>
          </div>
            {/* Open Search */}
            <AddBook />
        </div>
      </div>
    )
  }
}

export default Sections
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  state = {
    booksQuery: [],
  };

  static propType = {
    bsBooks: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  };

  intersect = (a, b) => {
    let t;
    if (b.length > a.length) {
      t = b;
      b = a;
      a = t;
    }
    return a.filter((e) => b.indexOf(e) > -1);
  };

  updateQuery = (query) => {
    if (query === "") {
      this.setState({
        booksQuery: [],
      });

      return;
    }

    BooksAPI.search(query, 20).then((books) => {
      this.updateBookSearchState(books);

      if (books !== undefined && books.error !== "empty query") {
        this.setState({
          booksQuery: books,
        });
      } else {
        this.setState({
          booksQuery: [],
        });
      }
    });
  };

  updateBookSearchState = (books) => {
    if (books !== undefined && books.error !== "empty query") {
      let bookIds = books.map((book) => book.id);
      let currentlyReadingIntersect = this.intersect(
        bookIds,
        this.props.bsBooks
          .filter((cr) => cr.shelf === "currentlyReading")
          .map((b) => b.id)
      );
      let readIntersects = this.intersect(
        bookIds,
        this.props.bsBooks.filter((r) => r.shelf === "read").map((b) => b.id)
      );
      let wantToReadIntersects = this.intersect(
        bookIds,
        this.props.bsBooks
          .filter((wr) => wr.shelf === "wantToRead")
          .map((b) => b.id)
      );

      for (let item of books) {
        if (currentlyReadingIntersect.includes(item.id)) {
          item.shelf = "currentlyReading";
        }
        if (readIntersects.includes(item.id)) {
          item.shelf = "read";
        }
        if (wantToReadIntersects.includes(item.id)) {
          item.shelf = "wantToRead";
        }
      }
    }
  };

  clearQuery = () => {
    this.setState({
      query: "",
      booksQuery: [],
    });
  };

  handleBookShelfChange = (book, shelf) => {
    this.props.onBookShelfChange(book, shelf);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={this.clearQuery}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksQuery.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  booksShelfChange={this.handleBookShelfChange}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

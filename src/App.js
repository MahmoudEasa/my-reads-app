import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import SearchBooks from "./components/SearchBooks";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
      });
    });
  }

  moveBookShelf = (book, newValue) => {
    book.props.book.shelf = newValue;
    this.setState((state) => ({
      books: state.books
        .filter((b) => b.id !== book.props.book.id)
        .concat([book.props.book]),
    }));
    BooksAPI.update(book.props.book, newValue);
  };

  render() {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Home
              books={this.state.books}
              onBookShelfChange={this.moveBookShelf}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchBooks
              bsBooks={this.state.books}
              onBookShelfChange={this.moveBookShelf}
            />
          }
        />
      </Routes>
    );
  }
}

export default BooksApp;

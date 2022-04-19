import React from "react";
import PropTypes from "prop-types";
import Shelf from "./Shelf";
import AddBook from "./AddBook";

const Home = (props) => {
  const handleBookShelfChange = (book, shelf) => {
    props.onBookShelfChange(book, shelf);
  };

  return (
    <div className="app">
      <div className="list-books">
        {/* Nav Bar */}
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              title="Currently Reading"
              cat="currentlyReading"
              books={props.books.filter(
                (bs) => bs.shelf === "currentlyReading"
              )}
              onBookShelfChange={handleBookShelfChange}
            />
            <Shelf
              title="Want to Read"
              cat="wantToRead"
              books={props.books.filter((bs) => bs.shelf === "wantToRead")}
              onBookShelfChange={handleBookShelfChange}
            />
            <Shelf
              title="Read"
              cat="read"
              books={props.books.filter((bs) => bs.shelf === "read")}
              onBookShelfChange={handleBookShelfChange}
            />
          </div>
        </div>
        <AddBook />
      </div>
    </div>
  );
};

Home.propTypes = {
  books: PropTypes.array.isRequired,
  onBookShelfChange: PropTypes.func.isRequired,
};

export default Home;

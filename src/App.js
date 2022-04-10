import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReading from './CurrentlyReading'
import ReadSection from './ReadSection'
import WantToRead from './WantToRead'
import OpenSearch from './OpenSearch'
import SearchBooks from './SearchBooks'
// import { Route } from "react-router-dom"


class BooksApp extends React.Component {
  render() {
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
                {/* Currently Reading */}
                <CurrentlyReading />
                {/* Want to Read */}
                <WantToRead />
                {/* Read */}
                <ReadSection />
              </div>
            </div>
                {/* Open Search */}
                <OpenSearch />
          </div>
          {/* Search Books */}
          <SearchBooks />
      </div>
    )
  }
}

export default BooksApp

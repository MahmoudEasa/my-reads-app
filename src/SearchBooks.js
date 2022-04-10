import React, { Component } from "react";
import MainSearch from "./MainSearch";
// import { MainSearch } from "./MainSearch"

class SearchBooks extends Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search">Close</button>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        
        {/* Main Search */}
        <MainSearch />
      </div>
    )
  }
}

export default SearchBooks
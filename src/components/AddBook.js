import React from "react";
import { Link } from 'react-router-dom'

const AddBook = () => {
    return(
      <div className="open-search">
          <Link className="link" to="/search">Add a book</Link>
      </div>
    )
}

export default AddBook
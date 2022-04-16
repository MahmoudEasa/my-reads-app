import React from 'react'
import { Route, Routes } from 'react-router-dom';

import './App.css'
import Home from './components/Home';
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  render() {
    return (
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search' element={<SearchBooks />}/>
      </Routes>
    )
  }
}

export default BooksApp

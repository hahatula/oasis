//import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <div></div>
      <Footer />
    </div>
  );
}

export default App;

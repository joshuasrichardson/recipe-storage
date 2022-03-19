import React, {Component} from 'react';
import './App.css';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
import AddFoodStorage from './components/AddFoodStorage.js';
import ViewFoodStorage from './components/ViewFoodStorage.js';
import ViewRecipes from './components/ViewRecipes.js';
import Login from './components/Login.js';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import {GlobalProvider} from './context/GlobalState';

function App() {
  return (<GlobalProvider>
    <BrowserRouter>
      <div className="App">
        <Nav/>
        <Routes>
          <Route path="/" exact="exact" element={<Home/>}/>
          <Route path="/add-item" element={<AddFoodStorage/>}/>
          <Route path="/view-items" element={<ViewFoodStorage/>}/>
          <Route path="/view-recipes" exact="exact" element={<ViewRecipes/>}/>
          <Route path="/login" element={<Login hasAccount = {
              true
            } />}/>
          <Route path="/register" element={<Login hasAccount = {
              false
            } />}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  </GlobalProvider>);
}

const Home = () => {

  return (<div className="page">
    <div className="main-container">
      <h1>Recipe Storage</h1>
      <p className="call-to-action">Get started by viewing recipes or creating your own account.</p>
      <div className="selections-container">
        <Link to="/view-recipes" className="button-link">
          <button>See Recipes</button>
        </Link>
        <Link to="/register" className="button-link">
          <button>Create Account</button>
        </Link>
      </div>
      <p>Right now, you cannot actually make your own account, login, or add items. However, at some point, having an account will allow you to keep track of your food storage, choose recipes based on the ingredients you own, and set up meal plans and budgeting.</p>
    </div>
  </div>);
}

export default App;

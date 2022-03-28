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
import useCookie from 'react-use-cookie';

function App() {
  const [userId, setUserId] = useCookie('token', '0');

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
    </div>
  </div>);
}

export default App;

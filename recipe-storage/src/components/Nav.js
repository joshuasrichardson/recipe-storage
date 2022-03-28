import React, {useContext} from 'react';
import '../App.css';
import './nav.css';
import {Link} from 'react-router-dom';
import {ConditionalLink} from './ConditionalLink';
import {GlobalContext} from '../context/GlobalState';

function Nav() {
  const {user, setUser} = useContext(GlobalContext);

  const logout = () => {
    setUser(null);
  }

  return (<div className="Nav">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid nav-links">
        <Link to='/' className="navbar-brand logo" href="/index.html">Recipe Storage</Link>
        <h4 className="navbar-brand username">{
            user !== null
              ? user.username
              : ""
          }</h4>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li>
              <ConditionalLink to='/add-item' classN="nav-link" condition={user != null}>
                {
                  user != null
                    ? "Add Item"
                    : ""
                }
              </ConditionalLink>
            </li>
            <li>
              <ConditionalLink to='/view-items' classN="nav-link" condition={user != null}>
                {
                  user != null
                    ? "View Items"
                    : ""
                }
              </ConditionalLink>
            </li>
            <li>
              <Link to='/view-recipes' className="nav-link">
                View Recipes
              </Link>
            </li>
            <li>
              <ConditionalLink to='/login' classN="nav-link" condition={user == null}>
                {
                  user == null
                    ? "Login"
                    : ""
                }
              </ConditionalLink>
              {user != null && <div className="nav-link" onClick={() => setUser(null)}>Logout</div>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>);
}

export default Nav;

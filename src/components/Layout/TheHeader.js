import React from 'react';
import { Link } from 'react-router-dom';
import './TheHeader.css';

const Header = () => {
  return (
    <div className="header">
      <h1>Hunddagis Adminverktyg</h1>
      <nav>
        <ul className='headerUl'>
          <li>
            <Link className="link" to="/">Home</Link>
          </li>
          <li>
            <Link className="link" to="/create">Create</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
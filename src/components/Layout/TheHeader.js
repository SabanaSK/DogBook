import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="header__link">
        <h1 className="header__title">Hunddagis Adminverktyg</h1>
      </Link>
    </div>
  );
}

export default Header;

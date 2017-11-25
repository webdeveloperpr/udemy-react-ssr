import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => {
  const authButton = auth
    ? <a href="/api/logout">Logout</a>
    : <a href="/api/auth/google">Login</a>;
  return (
    <nav style={{ padding: '0 10px' }}>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          React SSR!
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/users">
              Users
            </Link>
          </li>
          <li>
            <Link to="/admins">
              Admin
            </Link>
          </li>
          <li>
            {authButton}
          </li>
        </ul>
      </div>
    </nav>
  )
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);

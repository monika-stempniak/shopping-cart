import { NavLink } from 'react-router-dom';
import React from 'react';

import styles from './Header.module.scss';

const Header = ({ user, children }) => {

  return (
    <div>
      <ul>
        <li>
          <NavLink exact activeClassName={styles.active} to="/">Books</NavLink>
        </li>
        {
          user && user.login === "admin" 
          ? (
            <li>
            <NavLink activeClassName={styles.active} to="/new">Add Book</NavLink>
            </li>
          ) : (
            <li>
              <NavLink activeClassName={styles.active} to="/cart">Cart</NavLink>
          </li>
          )
        }
      </ul>
      {children}
    </div>
  );
}

export default Header;

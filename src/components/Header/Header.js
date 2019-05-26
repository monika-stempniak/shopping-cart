import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {

  return (
    <ul>
      <li>
        <NavLink exact activeClassName={styles.active} to="/">Books</NavLink>
      </li>
      <li>
        <NavLink activeClassName={styles.active} to="/cart">Cart</NavLink>
      </li>
      <li>
        <NavLink activeClassName={styles.active} to="/new">Add Book</NavLink>
      </li>
    </ul>
  );
}

export default Header;

import { NavLink } from 'react-router-dom';
import React from 'react';

import styles from './Header.module.scss';

const Header = ({ user, children }) => {

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        {children}
        <ul className={styles.navbarNav}>
          <li className={styles.navItem}>
            <NavLink exact activeClassName={styles.active} className={styles.navLink} to="/">Books</NavLink>
          </li>
          {
            user && user.login === "admin" 
            ? (
              <li className={styles.navItem}>
              <NavLink activeClassName={styles.active} className={styles.navLink} to="/new">Add Book</NavLink>
              </li>
            ) : (
              <li className={styles.navItem}>
                <NavLink activeClassName={styles.active} className={styles.navLink} to="/cart">Cart</NavLink>
            </li>
            )
          }
        </ul>
      </nav>
    </div>
  );
}

export default Header;

import React from 'react';
import { Link } from 'react-router';
import styles from './Header.scss';

const Header = () => (
  <header className={styles['header']}>
    <div className="container">
      <div className={styles['logo']}>
        <Link to="/">ReactJS Bangkok 1.0.0</Link>
      </div>
      <nav className={styles['nav']}>
        <ul>
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
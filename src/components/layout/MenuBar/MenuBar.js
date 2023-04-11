import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import ProductSearch from '../../features/ProductSearch/ProductSearch';

import styles from './MenuBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const MenuBar = () => {
  const [mobileMenu, setMobileMenu] = useState(true);

  const action = () => {
    setMobileMenu(!mobileMenu);
  };

  const menuLinks = [
    '/',
    'tenis',
    'padel',
    'badminton',
    'squash',
    'table tenis',
    'blog',
  ];

  return (
    <div className={mobileMenu ? styles.root : styles.rootMobile}>
      <div className='container'>
        <div className={`row align-items-center`}>
          <div className={`col ${styles.search}`}>
            <ProductSearch />
          </div>
          <button onClick={action} className={`col ${styles.bars}`}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className={mobileMenu ? 'col-auto ' + styles.menu : styles.menuMobile}>
            <ul>
              {menuLinks.map(link => (
                <li key={link}>
                  <NavLink
                    exact
                    to={link !== '/' && link !== 'blog' ? '/shop/' + link : link}
                    className={isActive => (isActive ? styles.active : undefined)}
                  >
                    {link === '/' ? 'home' : link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  children: PropTypes.node,
};

export default MenuBar;

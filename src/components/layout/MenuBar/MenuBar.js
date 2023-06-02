import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ProductSearch from '../../features/ProductSearch/ProductSearch';
import styles from './MenuBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllCategories } from '../../../redux/categoriesRedux';

const MenuBar = () => {
  const [mobileMenu, setMobileMenu] = useState(true);
  const categories = useSelector(getAllCategories);
  const action = () => {
    setMobileMenu(!mobileMenu);
  };

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
              <li>
                <NavLink exact to='/'
                  className={isActive => isActive ? styles.active : undefined}>
                  Home
                </NavLink>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <NavLink
                    exact
                    to={'/shop/' + category.id}
                    className={isActive => (isActive ? styles.active : undefined)}
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink exact to='/blog'
                  className={isActive => isActive ? styles.active : undefined}>
                  blog
                </NavLink>
              </li>
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

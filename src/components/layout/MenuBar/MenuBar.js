import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import ProductSearch from '../../features/ProductSearch/ProductSearch';
import styles from './MenuBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getAllCategories } from '../../../redux/categoriesRedux';
import clsx from 'clsx';
import { getViewportMode } from '../../../redux/viewportModeRedux';

const MenuBar = () => {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  const categories = useSelector(getAllCategories);
  const viewportMode = useSelector(getViewportMode);
  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  useEffect(() => {
    const handleOutsideClick = e => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenu(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className={clsx(styles.root, viewportMode === 'mobile' && styles.mobileMenu)}>
      <div className='container'>
        <div className={clsx('row', styles.menuBarContainer)}>
          <div className={clsx('col-auto', styles.search)}>
            <ProductSearch />
          </div>
          <div
            className={clsx('col-auto', styles.menu)}
            ref={viewportMode === 'mobile' ? mobileMenuRef : null}
          >
            <button onClick={toggleMobileMenu} className={clsx(styles.bars)}>
              <FontAwesomeIcon icon={faBars} />
            </button>
            <div
              className={clsx(
                styles.desktopMenu,
                viewportMode === 'mobile' && mobileMenu && styles.menuMobile
              )}
            >
              <ul onClick={() => setMobileMenu(false)}>
                <li>
                  <NavLink
                    exact
                    to='/'
                    className={isActive => (isActive ? styles.active : undefined)}
                  >
                    Home
                  </NavLink>
                </li>
                {categories.map(category => (
                  <li key={category.id}>
                    <NavLink
                      exact
                      to={'/shop/' + category.id}
                      className={isActive =>
                        isActive || location.pathname.includes('/' + category.id + '-')
                          ? styles.active
                          : undefined
                      }
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    exact
                    to='/blog'
                    className={isActive =>
                      isActive || location.pathname.startsWith('/blog/')
                        ? styles.active
                        : undefined
                    }
                  >
                    blog
                  </NavLink>
                </li>
              </ul>
            </div>
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

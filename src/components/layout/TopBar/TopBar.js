import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './TopBar.module.scss';
import Currency from '../../features/Currency/Currency';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser, logOut } from '../../../redux/loggedUserRedux';
import { Dropdown } from 'react-bootstrap';
import clsx from 'clsx';

const TopBar = () => {
  const loggedUser = useSelector(getLoggedUser);
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      setIsLogged(true);
    }
  }, [loggedUser]);

  const handleLogout = () => {
    dispatch(logOut());
    setIsLogged(false);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className='row'>
          <div className={`col-8 col-sm-6 text-left ${styles.topOptions}`}>
            <ul>
              <li>
                <Currency />
              </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle
                    className={styles.languageButton}
                    id='dropdown-basic'
                  >
                    English
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={styles.languageMenu}>
                    <Dropdown.Item
                      className={clsx(styles.menuItem, 'dropdown-item')}
                      as={'button'}
                    >
                      English
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
          <div className={`col-4 col-sm-6 text-right ${styles.topMenu}`}>
            <ul className={styles.iconList}>
              <li>
                {!isLogged && (
                  <Link to='/login'>
                    <FontAwesomeIcon className={styles.icon} icon={faUser} />
                    <span className={styles.iconLabel}> Login</span>
                  </Link>
                )}
                {isLogged && (
                  <Link to='/'>
                    <FontAwesomeIcon className={styles.icon} icon={faDoorOpen} />
                    <span className={styles.iconLabel} onClick={handleLogout}>
                      {' '}
                      Logout
                    </span>
                  </Link>
                )}
              </li>
              <li>
                <Link to='/register'>
                  <FontAwesomeIcon className={styles.icon} icon={faLock} />
                  <span className={styles.iconLabel}> Register</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// TopBar.propTypes = {};

export default TopBar;

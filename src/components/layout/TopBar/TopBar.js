import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faLock, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './TopBar.module.scss';
import Currency from '../../features/Currency/Currency';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser, logOut } from '../../../redux/loggedUserRedux';

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
                <a href='#'>
                  English <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
                </a>
              </li>
              <li>
                <a href='#'>
                  Help <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
                </a>
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
                    <FontAwesomeIcon className={styles.icon} icon={faUser} />
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
              <li>
                <a href='#'>
                  <FontAwesomeIcon className={styles.icon} icon={faBars} />
                </a>
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

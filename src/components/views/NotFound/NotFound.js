import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.notFound}>
          <h1>Sorry, there is nothing here.</h1>
          <p>Please go back to the{' '}
            <Link to='/'>
              home page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
import React from 'react';
import styles from './Banner.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';

const Banner = () => {
  const location = useLocation();
  const { categoryId } = useParams();

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.banner}>
          <p className={styles.title}>rackets</p>
          <p className={styles.subtitle}>
            always <span>25%</span> off or more
          </p>
        </div>
        <div className={styles.breadcrumbs}>
          <p>
            {location.pathname !== '/' && <Link to='/'>Home</Link>}
            {categoryId && (
              <>
                {' > '}
                {categoryId}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;

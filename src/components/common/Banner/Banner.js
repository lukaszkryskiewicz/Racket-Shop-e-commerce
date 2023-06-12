import React from 'react';
import styles from './Banner.module.scss';
import { Link, useParams } from 'react-router-dom';

const Banner = () => {
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
        <div className={styles.menu}>
          <p>
            <Link to='/'>Home</Link>
            {categoryId && (
              <>
                {' > '}
                <Link to={'/shop/' + categoryId}>{categoryId}</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;

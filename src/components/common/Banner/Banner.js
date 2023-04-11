import React from 'react';
import styles from './Banner.module.scss';

const Banner = () => {
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
            Home &gt; <span>Rackets</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;

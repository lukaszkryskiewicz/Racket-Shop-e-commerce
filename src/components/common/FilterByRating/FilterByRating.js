import React, { useState } from 'react';
import styles from './FilterByRating.module.scss';
import { useDispatch } from 'react-redux';
import { removeFilter, updateFilter } from '../../../redux/filterRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';

const FilterByRating = () => {
  const dispatch = useDispatch();
  const [activeRating, setActiveRating] = useState(null);

  const handleClick = row => {
    if (activeRating === row) {
      setActiveRating(null);
      dispatch(removeFilter({ name: 'ratingFilter' }));
    } else {
      setActiveRating(row);
      dispatch(updateFilter({ name: 'ratingFilter', value: row }));
    }

  };

  return (
    <>
      <div className='container'>
        <div className={styles.root}>
          <div className={styles.title}>
            <h5>Filter by rating</h5>
          </div>
          <div className={styles.starsRating}>
            <ul className={styles.starsList}>
              {[1, 2, 3, 4].map(row => (
                <li key={row} className={clsx(styles.starsRow, activeRating === row && styles.active)} onClick={() => handleClick(row)}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className={styles.stars}>
                      {i <= row ? (
                        <FontAwesomeIcon icon={faStar}>{i} stars</FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon icon={farStar}>{i} stars</FontAwesomeIcon>
                      )}
                    </span>
                  ))} &amp; more
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div >
    </>
  );
};

export default FilterByRating;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './StarsReview.module.scss';
import StarsReviewBasic from '../StarsReviewBasic/StarsReviewBasic';
import { HashLink as NavLink } from 'react-router-hash-link';

const StarsReview = props => {
  const productLink = '/product/' + props.id + '#top';

  return (
    <div className={styles.content}>
      <NavLink to={productLink}>
        <h5>{props.name}</h5>
      </NavLink>
      <div className={styles.stars}>
        <StarsReviewBasic {...props} />
      </div>
    </div>
  );
};

StarsReview.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  stars: PropTypes.number,
  myStars: PropTypes.number,
};

export default StarsReview;

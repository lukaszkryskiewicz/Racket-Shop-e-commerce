import React from 'react';
import styles from './ProductReviews.module.scss';
import StarsReview from '../../common/StarsReview/StarsReview';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AddProductReview from '../AddProductReview/AddProductReview';

const ProductReviews = product => {
  return (
    <div className={styles.root}>
      <ul className={styles.givenReviews}>
        {product.reviews ? (
          product.reviews.map(review => <div key={review.id}>test</div>)
        ) : (
          <li>
            <p className={styles.opinion}>There are no reviews for this product.</p>
          </li>
        )}
      </ul>
      <div className={styles.review}>
        <AddProductReview />
      </div>
    </div>
  );
};

ProductReviews.propTypes = {
  product: PropTypes.object,
};

export default ProductReviews;

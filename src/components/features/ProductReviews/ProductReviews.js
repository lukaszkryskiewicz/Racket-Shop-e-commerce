import React from 'react';
import styles from './ProductReviews.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AddProductReview from '../AddProductReview/AddProductReview';
import StarsReviewBasic from '../../common/StarsReviewBasic/StarsReviewBasic';

const ProductReviews = product => {
  return (
    <div className={styles.root}>
      <ul className={styles.givenReviews}>
        {product.reviews ? (
          product.reviews.map(review =>
            <div key={review.id}>
              <div className={styles.reviewContent}>
                <div className={clsx('row', styles.reviewFirstRow)}>
                  <div className={clsx('col-2', styles.reviewStars)}>
                    <StarsReviewBasic id={product.id} stars={review.stars} noAction />
                  </div>
                  <div className={clsx('col-2', styles.reviewDate)}>
                    {review.date}
                  </div>
                </div>
                <p className={styles.reviewText}>
                  {review.text}
                </p>
                <p className={styles.reviewAuthor}>{review.author}</p>
              </div>
            </div>)
        ) : (
          <li>
            <p className={styles.reviewText}>There are no reviews for this product</p>
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

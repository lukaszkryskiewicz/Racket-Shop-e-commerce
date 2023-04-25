import React from 'react';
import styles from './AddProductReview.module.scss';
import StarsReview from '../../common/StarsReview/StarsReview';
import clsx from 'clsx';

const AddProductReview = () => {
  return (
    <>
      <h3>Add a review test</h3>
      <div className={styles.reviewBox}>
        <p>Your rating</p>
        <div className={'row ' + styles.ratingBox}>
          <p className={'col-1 ' + styles.rate}>Bad</p>
          <div className={'col-2 ' + styles.rateStars}>
            <StarsReview />
          </div>
          <p className={'col-1 ' + styles.rate}>Good</p>
        </div>
        <form className={'row ' + styles.form}>
          <p>Your review</p>
          <textarea
            className={'col-12 form-control mb-3 ' + styles.textarea}
            rows='3'
            type='text'
          ></textarea>
          <div className={'col-5 ' + styles.input}>
            <input className='form control' type='text' placeholder='Name*'></input>
          </div>
          <div className={'col-5 ' + styles.input}>
            <input className='form control' type='text' placeholder='Email*'></input>
          </div>
          <button className={'col-2 ' + styles.button} type='submit'>
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductReview;

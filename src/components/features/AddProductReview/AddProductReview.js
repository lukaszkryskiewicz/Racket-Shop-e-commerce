import React, { useState } from 'react';
import styles from './AddProductReview.module.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import StarsReviewBasic from '../../common/StarsReviewBasic/StarsReviewBasic';
import Button from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { addReview } from '../../../redux/productsRedux';
import shortid from 'shortid';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const AddProductReview = ({ id }) => {
  const dispatch = useDispatch();
  const [stars, setStars] = useState(0);
  const [starsError, setStarsError] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);

  const schema = yup.object({
    author: yup
      .string()
      .max(30, 'Name must have less than 30 characters')
      .required('Please enter your name'),
    email: yup
      .string()
      .test('valid-email', 'Please enter a valid email', value => {
        if (!value) return false;

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(value);
      })
      .required('Please enter your mail'),
    text: yup.string().required('Please add a few words about product'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddReview = data => {
    if (stars === 0) {
      setStarsError(true);
    } else {
      const currentDate = new Date().toLocaleDateString('pl-PL');
      const formattedDate = currentDate.split('.').join('/');
      const reviewData = {
        stars: stars,
        author: data.author,
        email: data.email,
        text: data.text,
        date: formattedDate,
        id: shortid(),
      };
      dispatch(addReview({ productId: id, review: reviewData }));
      setReviewDone(true);
    }
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        {reviewDone ? (
          <h3>Thank you for the review!</h3>
        ) : (
          <div className={styles.reviewBox}>
            <h3>Add a review</h3>

            <form className={styles.form} onSubmit={handleSubmit(handleAddReview)}>
              <h4>Your rating</h4>
              <div className={clsx('row', styles.ratingBox)}>
                <div className={clsx('col', styles.rateStars)}>
                  <StarsReviewBasic id={id} getStars={stars === 0 ? setStars : null} />
                  {starsError && <p>Please add rating!</p>}
                </div>
              </div>
              <h4>Your review</h4>
              <div className={clsx('row', styles.textAreaContainer)}>
                <textarea
                  className={clsx('col-12 form-control mb-3', styles.textarea)}
                  rows='3'
                  type='text'
                  {...register('text')}
                  placeholder='Enter your review*'
                />
                <p>{errors.text?.message}</p>
              </div>
              <div className={clsx('row', styles.inputsContainer)}>
                <div className={clsx('col-md-10 col-12', styles.inputs)}>
                  <div className={clsx('col-6', styles.input)}>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Name*'
                      {...register('author')}
                    />
                    <p>{errors.author?.message}</p>
                  </div>
                  <div className={clsx('col-6', styles.input)}>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Email*'
                      {...register('email')}
                    />
                    <p>{errors.email?.message}</p>
                  </div>
                </div>
                <Button
                  className={clsx('col-12 col-md-2', styles.button)}
                  type='submit'
                  variant='small'
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

AddProductReview.propTypes = {
  id: PropTypes.string,
};

export default AddProductReview;

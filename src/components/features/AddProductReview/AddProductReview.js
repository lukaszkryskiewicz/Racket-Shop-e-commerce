import React, { useState } from 'react';
import styles from './AddProductReview.module.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import StarsReviewBasic from '../../common/StarsReviewBasic/StarsReviewBasic';
import Button from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { addReview } from '../../../redux/productsRedux';
import shortid from 'shortid';

const AddProductReview = ({ id }) => {
  const dispatch = useDispatch();
  const [stars, setStars] = useState(0);
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [reviewDone, setReviewDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('pl-PL');
    const formattedDate = currentDate.split('.').join('/');
    dispatch(addReview({ productId: id, review: { author, stars, text, date: formattedDate, id: shortid() } }));
    setReviewDone(true);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        {reviewDone ?
          <h3>You have already added a review!</h3>
          :
          <div className={styles.reviewBox}>
            <h3>Add a review</h3>
            <h4>Your rating</h4>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={clsx('row', styles.ratingBox)}>
                <div className={clsx('col-2', styles.rateStars)}>
                  <StarsReviewBasic id={id} getStars={stars === 0 ? setStars : null} />
                </div>
              </div>
              <h4>Your review</h4>
              <div className={clsx('row', styles.textAreaContainer)}>
                <textarea
                  className={clsx('col-12 form-control mb-3', styles.textarea)}
                  rows='3'
                  type='text'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>
              <div className={clsx('row', styles.inputsContainer)}>
                <div className={clsx('col-5', styles.input)}>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Name*'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}></input>
                </div>
                <div className={clsx('col-5', styles.input)}>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Email*'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <Button className={clsx('col-2', styles.button)} type='submit' variant='small'>
                  Continue
                </Button>
              </div>
            </form>
          </div>}
      </div>
    </div>
  );
};

AddProductReview.propTypes = {
  id: PropTypes.string,
};

export default AddProductReview;

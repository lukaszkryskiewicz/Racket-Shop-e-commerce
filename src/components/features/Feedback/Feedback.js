import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './Feedback.module.scss';
import { useState } from 'react';
import { getAllFeedbacks } from '../../../redux/feedbacksRedux';
import Swipeable from '../../common/Swipeable/Swipeable';
import clsx from 'clsx';
import Dots from '../../common/Dots/Dots';

const Feedback = () => {
  const [activePage, setActivePage] = useState(0);
  const feedbacks = useSelector(state => getAllFeedbacks(state));
  const handlePageChange = newPage => {
    setActivePage(newPage);
  };

  const leftAction = () => {
    if (activePage > 0) {
      let page = activePage - 1;
      handlePageChange(page);
    }
  };

  const rightAction = () => {
    let page = activePage + 1;
    if (page < feedbacks.length) {
      handlePageChange(page);
    }
  };

  return (
    <>
      <Swipeable leftAction={leftAction} rightAction={rightAction}>
        <div className={styles.root}>
          <div className='container'>
            <div className={styles.panelBar}>
              <div className={clsx('row g-0 align-items-end')}>
                <div className={clsx('col-10', styles.heading)}>
                  <h3>Client Feedback</h3>
                </div>
                <Dots
                  pagesCount={feedbacks.length}
                  handlePageChange={handlePageChange}
                  activePage={activePage}
                />
              </div>
            </div>
            <div className={clsx('row justify-content-center')}>
              {feedbacks.slice(activePage, activePage + 1).map(feedback => (
                <div
                  key={feedback.id}
                  className={clsx('row justify-content-center text-center')}
                >
                  <div className={clsx('row justify-content-center', styles.header)}>
                    &rdquo;
                  </div>
                  <div className={clsx('row justify-content-center mx-5 mb-2')}>
                    <p>{feedback.description}</p>
                  </div>
                  <div className={clsx('row mb-4')}>
                    <div className={clsx('col-6', styles.photo)}>
                      <div className={styles.image}>
                        <img
                          alt={feedback.author}
                          src={`${process.env.PUBLIC_URL}/images/feedback/${feedback.id}.jpg`}
                        />
                      </div>
                    </div>
                    <div className={clsx('col-6 text-nowrap', styles.author)}>
                      <b className={clsx('p-0')}>{feedback.author}</b>
                      <p className={clsx('p-0')}>{feedback.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Swipeable>
    </>
  );
};

Feedback.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      author: PropTypes.string,
      status: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

export default Feedback;

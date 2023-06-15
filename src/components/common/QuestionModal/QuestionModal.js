import React, { useState, useRef } from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import styles from './QuestionModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { useForm } from 'react-hook-form';
import useOutsideClick from '../../../utils/useOutsideClickHook';

const QuestionModal = ({ closeModal, id }) => {
  const product = useSelector(state => getProductById(state, id));
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();
  const ref = useRef();
  useOutsideClick(ref, closeModal);

  const handleClick = e => {
    e.preventDefault();
    closeModal(false);
  };

  const handleSubmit = e => {
    setMessageSent(true);
    setQuestion('');
    setEmail('');
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.modalContainer} ref={ref}>
          <div className={styles.closeButton}>
            <Button onClick={handleClick}>
              <FontAwesomeIcon className={styles.icon} icon={faTimesCircle} />
            </Button>
          </div>
          <form onSubmit={validate(handleSubmit)}>
            <h3 className={styles.modalHeader}>
              {messageSent ? 'Success!' : 'Please write your question below'}
            </h3>
            <div className={clsx('row', styles.modalInfoContainer)}>
              <div className={clsx('col-5', styles.imageContainer)}>
                <img src={product.source} alt={product.name} />
              </div>
              <div className={clsx('col-7', styles.inputsContainer)}>
                {!messageSent && (
                  <div className={styles.textContainer}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <input
                      {...register('email', {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                      className={styles.mailInput}
                      type='email'
                      placeholder='Your email address*'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && <span>This is not a valid email</span>}
                    <textarea
                      {...register('content', {
                        required: true,
                        minLength: 20,
                      })}
                      className={styles.textarea}
                      rows={4}
                      placeholder='Write your question here'
                      value={question}
                      onChange={e => setQuestion(e.target.value)}
                    />
                    {errors.content && (
                      <span>Content must have at least 20 characters</span>
                    )}
                  </div>
                )}
                {messageSent && (
                  <div className={clsx(styles.messageSent)}>Message has been sent!</div>
                )}
                <div className={clsx(styles.buttonsContainer)}>
                  <div className={clsx(styles.buttons)}>
                    {!messageSent && (
                      <Button type='submit' variant='small' className={styles.button}>
                        Send message
                      </Button>
                    )}
                    {messageSent && (
                      <Button
                        variant='small'
                        className={styles.button}
                        onClick={handleClick}
                      >
                        Close
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

QuestionModal.propTypes = {
  closeModal: PropTypes.func,
  id: PropTypes.string,
};

export default QuestionModal;

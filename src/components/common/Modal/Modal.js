import React, { useState } from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';


const Modal = ({ closeModal, id }) => {
  const product = useSelector(state => getProductById(state, id));
  const [question, setQuestion] = useState('');

  const handleClick = e => {
    e.preventDefault();
    closeModal(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(question);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.modalContainer}>
          <div className={styles.closeButton}>
            <Button onClick={handleClick} variant='small'>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <h3 className={styles.modalHeader}>Please write your question below</h3>
          <div className={clsx('row', styles.modalInfoContainer)}>
            <div className={clsx('col-4')}>
              <div className={styles.imageContainer}>
                <img src={product.source} alt={product.name} />
              </div>
            </div>
            <div className={clsx('col-8')}>
              <div className={styles.textContainer}>
                <h3 className={styles.productName}>{product.name}</h3>
                <form onSubmit={handleSubmit}>
                  <p>Your Question</p>
                  <textarea
                    placeholder="write your question"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                  />
                  <div className={clsx('row', styles.buttonsContainer)}>
                    <div className={clsx('col-12', styles.buttons)}>
                      <Button type='submit' variant='small' className={styles.button}>Send message</Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  id: PropTypes.string,
};

export default Modal;
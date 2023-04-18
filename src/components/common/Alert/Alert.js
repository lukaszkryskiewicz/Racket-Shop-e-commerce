import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';
import Button from '../Button/Button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { getCurrency } from '../../../redux/currencyRedux';

const Alert = ({ type, id, amount }) => {
  const product = useSelector(state => getProductById(state, id));
  console.log(id)
  const currency = useSelector(getCurrency);
  /*   const product = {
      id: '1',
      name: 'testowa nazwa',
      amount: 2,
      source: '/images/racket/tennis/tennis-racket-21.webp',
      price: 200,
    } */

  const handleClick = () => {

  }


  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.alertContainer}>
          <div className={styles.closeButton}>
            <Button onClick={handleClick} variant='small'>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <h3 className={styles.alertHeader}>Product was succesfully added to cart</h3>
          <div className={clsx('row', styles.alertInfoContainer)}>
            <div className={clsx('col-4')}>
              <div className={styles.imageContainer}>
                <img src={product.source} alt={product.name} />
              </div>
            </div>
            <div className={clsx('col-8')}>
              <div className={styles.textContainer}>
                <h3 className={styles.productName}>{product.name}</h3>
                <ul className={styles.productInfoList}>
                  <li className={styles.productAmount}>You ordered {product.amount} {product.amount > 1 ? 'pieces' : 'piece'}</li>
                  <li className={styles.productPrice}>Total price: {product.price * product.amount * currency.multiplier} {currency.sign}</li>
                  <p className={styles.text}>Estimated delivery time - 3 days</p>
                </ul>
              </div>
            </div>
          </div>
          <div className={clsx('row', styles.buttonsContainer)}>
            <div className={clsx('col-12', styles.buttons)}>
              <Button link='/cart' variant='small' className={styles.button}>go to cart</Button>
              <Button onClick={handleClick} variant='small' className={styles.button}>continue shopping</Button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Alert;

Alert.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  amount: PropTypes.number,
};
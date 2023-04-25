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

const Alert = ({ type, id, quantity = 1, closeAlert, action }) => {
  const product = useSelector(state => getProductById(state, id));
  const currency = useSelector(getCurrency);

  const alertInfo = alertType => {
    switch (alertType) {
      case 'success':
        return {
          title: 'Product was succesfully added to cart',
          content: <>
            <li className={styles.productAmount}>You ordered {quantity} {quantity > 1 ? 'pieces' : 'piece'}</li>
            <li className={styles.productPrice}>Total price: {(product.price * quantity * currency.multiplier).toFixed(2)} {currency.sign}</li>
          </>,
          text: 'Estimated delivery time - 3 days',
        };
      case 'error':
        return {
          title: 'Unfortunatelly we don\' have enough products',
          content: <>
            <li className={styles.productAmount}>Avalibale: {product.quantity} {product.quantity > 1 ? 'pieces' : 'piece'}</li>
          </>,
          text: 'Please choose smaller quantity or other products',
        };
      case 'delete':
        return {
          title: 'Are you sure?',
          content: <>
            <li className={styles.productAmount}>You want to delete {product.name}</li>
          </>,
          text: 'Please confirm or cancel',
        };
      default:
        return null;
    }
  };



  const handleClick = e => {
    e.preventDefault();
    closeAlert(false);
  };

  const handleDelete = e => {
    e.preventDefault();
    action();
  };

  const alertMessage = alertInfo(type);


  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.alertContainer}>
          <div className={styles.closeButton}>
            <Button onClick={handleClick}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <div className={styles.alertContent}>
            <h3 className={styles.alertHeader}>{alertMessage.title}</h3>
            <div className={clsx('row', styles.alertInfoContainer)}>
              <div className={clsx('col-4')}>
                <div className={styles.imageContainer}>
                  <img src={product.source} alt={product.name} />
                </div>
              </div>
              <div className={clsx('col-8', styles.rightContent)}>
                <div className={styles.textContainer}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <ul className={styles.productInfoList}>
                    {alertMessage.content}
                    {alertMessage.text}
                  </ul>
                  <div className={clsx('row', styles.buttonsContainer)}>
                    <div className={clsx('col-12', styles.buttons)}>
                      {(type === 'success' || type === 'delete') && <Button link='/cart' variant='small' className={styles.button}>go to cart</Button>}
                      {type !== 'delete' && <Button link='#' onClick={handleClick} variant='small' className={styles.button}>continue shopping</Button>}
                      {type === 'delete' && <Button link='/cart' variant='small' className={styles.button} onClick={handleDelete}>delete product</Button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
};

export default Alert;

Alert.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  productAmount: PropTypes.number,
  closeAlert: PropTypes.func,
  quantity: PropTypes.number,
  action: PropTypes.func,
};
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';
import Button from '../Button/Button';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { getCurrency } from '../../../redux/currencyRedux';
import useOutsideClick from '../../../utils/useOutsideClickHook';

const Alert = ({ type, id, quantity = 1, closeAlert, action }) => {
  const product = useSelector(state => getProductById(state, id));
  const currency = useSelector(getCurrency);
  const ref = useRef();
  useOutsideClick(ref, closeAlert);

  const alertInfo = alertType => {
    switch (alertType) {
      case 'success':
        return {
          title: 'Product was succesfully added to cart',
          content: (
            <>
              <li className={styles.productAmount}>
                You ordered {quantity} {quantity > 1 ? 'pieces' : 'piece'}
              </li>
              <li className={styles.productPrice}>
                Total price:{' '}
                {(product.price * quantity * currency.multiplier).toFixed(2)}{' '}
                {currency.sign}
              </li>
            </>
          ),
          text: 'Estimated delivery time - 3 days',
        };
      case 'error':
        return {
          title: "Unfortunatelly we don't have enough products",
          content: (
            <>
              <li className={styles.productAmount}>
                Avalibale: {product.quantity}{' '}
                {product.quantity > 1 ? 'pieces' : 'piece'}
              </li>
            </>
          ),
          text: 'Please choose smaller quantity or other products',
        };
      case 'delete':
        return {
          title: 'Are you sure?',
          content: (
            <>
              <li className={styles.productAmount}>
                You want to delete {product.name}
              </li>
            </>
          ),
          text: 'Please confirm or cancel',
        };
      case 'compareError':
        return {
          title: 'Not enough products to compare',
          content: (
            <>
              <li className={styles.productAmount}>
                Please add at least one more Product to comparison
              </li>
            </>
          ),
        };
      case 'checkout':
        return {
          title: 'Thank you!',
          content: (
            <>
              <li className={styles.productAmount}>Your products have been ordered</li>
            </>
          ),
          text: 'Please check your email and follow the steps',
        };
      case 'register':
        return {
          title: 'Registration completed!',
          text: 'You can now sign in',
        };
      case 'registerError':
        return {
          title: 'Register Error',
          text: 'it seems that you already have the account, please sign in',
        };
      case 'loginError':
        return {
          title: 'User or password incorrect',
          text: "Please try again or click 'Forgot password?'!",
        };
      case 'login':
        return {
          title: 'You are now logged in!',
          text: 'Enjoy!',
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
        <div className={styles.alertContainer} ref={ref}>
          <div className={styles.closeButton}>
            <Button onClick={handleClick}>
              <FontAwesomeIcon className={styles.icon} icon={faTimesCircle} />
            </Button>
          </div>
          <div className={styles.alertContent}>
            <h3 className={styles.alertHeader}>{alertMessage.title}</h3>
            <div
              className={clsx(
                'row justify-content-around align-items-center',
                styles.alertInfoContainer
              )}
            >
              {product?.source && (
                <div className={clsx('col-4', styles.alertImage)}>
                  <div className={styles.imageContainer}>
                    <img src={product.source} alt={product.name} />
                  </div>
                </div>
              )}
              <div
                className={clsx(product ? 'col-auto' : 'col-12', styles.rightContent)}
              >
                <div className={clsx('col-12', styles.textContainer)}>
                  {product?.name && (
                    <h3 className={styles.productName}>{product.name}</h3>
                  )}
                  <ul className={styles.productInfoList}>
                    {alertMessage.content}
                    {alertMessage.text}
                  </ul>
                  <div className={clsx('row', styles.buttonsContainer)}>
                    <div className={clsx('col-12', styles.buttons)}>
                      {(type === 'success' || type === 'delete') && (
                        <Button link='/cart' variant='small' className={styles.button}>
                          go to cart
                        </Button>
                      )}
                      {type !== 'delete' &&
                        type !== 'checkout' &&
                        type !== 'register' &&
                        type !== 'registerError' && (
                          <Button
                            link='#'
                            onClick={handleClick}
                            variant='small'
                            className={styles.button}
                          >
                            continue shopping
                          </Button>
                        )}
                      {type === 'delete' && (
                        <Button
                          link='/cart'
                          variant='small'
                          className={styles.button}
                          onClick={handleDelete}
                        >
                          delete product
                        </Button>
                      )}
                      {type === 'checkout' && (
                        <Button link='/' variant='small' className={styles.button}>
                          go to the main page
                        </Button>
                      )}
                      {(type === 'register' || type === 'registerError') && (
                        <Button link='/login' variant='small' className={styles.button}>
                          Sing in
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
  productAmount: PropTypes.number,
  closeAlert: PropTypes.func,
  quantity: PropTypes.number,
  action: PropTypes.func,
};

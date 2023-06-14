import React from 'react';
import styles from './Cart.module.scss';
import { getAll } from '../../../redux/cartRedux';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CartLayout from '../../layout/CartLayout/CartLayout';

const Cart = () => {
  const cartProducts = useSelector(getAll);

  const productsQuantity = () => {
    let sum = 0;
    for (const product of cartProducts) {
      sum = sum + product.quantity;
    }
    return sum;
  };


  return (
    <div className={styles.root}>
      <div className={styles.cartBar}>
        <div className='container'>
          <span className='col-6 d-inline-flex justify-content-start ps-1'>
            Cart ({productsQuantity()})
          </span>
        </div>
      </div>
      <CartLayout />
    </div>
  );
};
Cart.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  source: PropTypes.string,
};

export default Cart;

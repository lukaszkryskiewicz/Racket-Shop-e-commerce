import React from 'react';
import { Link } from 'react-router-dom';
import { getAll } from '../../../redux/cartRedux';
// import PropTypes from 'prop-types';

import styles from './CompanyClaim.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const CompanyClaim = () => {
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
      <div className='container'>
        <div className='row align-items-center'>
          <div className={`col text-left ${styles.phoneNumber}`}>
            <p>
              <FontAwesomeIcon className={styles.icon} icon={faMobileAlt} /> 2300 - 3560
              - 222
            </p>
          </div>
          <div className='col px-0 text-center'>
            <a href='/#'>
              <img
                className={styles.logoImage}
                src='/images/logo.png'
                alt='RacketShop'
              />
            </a>
          </div>
          <div className={`col pl-0 text-right ${styles.cart}`}>
            <Link to='/cart' className={styles.cartBox}>
              <div className={styles.cartIcon}>
                <FontAwesomeIcon className={styles.icon} icon={faShoppingBasket} />
              </div>
              <div className={styles.cartCounter}>{productsQuantity()}</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// CompanyClaim.propTypes = {};

export default CompanyClaim;

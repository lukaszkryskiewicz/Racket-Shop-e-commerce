import React, { useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import CartTableLine from './CartTableLine/CartTableLine';
import { checkout, getAll, getCoupons } from '../../../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrency } from '../../../redux/currencyRedux';

const Cart = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState(null);
  const [isCouponActive, setIsCouponActive] = useState(false);
  const [couponMessage, setCouponMessage] = useState(null);
  const cartProducts = useSelector(getAll);
  const currency = useSelector(state => getCurrency(state));
  const coupons = useSelector(getCoupons);

  const handleClick = e => {
    e.preventDefault();
    dispatch(checkout());
  };

  const calculateCart = () => {
    let subTotal = 0;
    let deliveryFee = cartProducts.length !== 0 ? 20 * currency.multiplier : 0;
    cartProducts.map(
      product => (subTotal += product.price * currency.multiplier * product.quantity)
    );
    if (couponCode) {
      coupons.find(coupon => {
        if (coupon.id === couponCode) {
          switch (coupon.type) {
            case 'discount':
              subTotal = subTotal * coupon.value;
              setIsCouponActive(true);
              break;
            case 'freeDelivery':
              deliveryFee = 0;
              setIsCouponActive(true);
              break;
            default:
              return null;
          }
          setCouponMessage('success');
          return true;
        }
        setCouponMessage('error');
        return null;
      });
    }
    let total = subTotal + deliveryFee;
    return { subTotal, total };
  };

  const handleCouponCodeChange = e => {
    setCouponCode(e.target.value.toLowerCase());
    setIsCouponActive(false);
    setCouponMessage(null);
  };

  const handleApplyCoupon = e => {
    e.preventDefault();
    const { subTotal, total } = calculateCart();
    setSubTotalPrice(subTotal.toFixed(2));
    setTotalPrice(total.toFixed(2));
  };

  useEffect(() => {
    const { subTotal, total } = calculateCart();
    setSubTotalPrice(subTotal.toFixed(2));
    setTotalPrice(total.toFixed(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts, currency, isCouponActive]);
  return (
    <div className={styles.root}>
      <div className={styles.cartBar}>
        <div className='container'>
          <span className='col-6 d-inline-flex justify-content-start ps-1'>Cart</span>
          <span className='col-6 d-inline-flex justify-content-end pe-1'>
            <span className={styles.cartIcon}>
              <FontAwesomeIcon icon={faHome} className={styles.icon} />
              &gt; Cart
            </span>
          </span>
        </div>
      </div>
      <div className='container'>
        <div className={styles.cartTable}>
          <div className={`row ${styles.firstRow}`}>
            <span className='col-8'>
              <div className='row'>
                <span className='col-2'></span>
                <span className={`col-10 ps-4 ${styles.left}`}>PRODUCT</span>
              </div>
            </span>
            <span className='col-1'>PRICE</span>
            <span className='col-2'>QUANTITY</span>
            <span className='col-1'>TOTAL</span>
          </div>
          {cartProducts.map(singleItem => (
            <CartTableLine
              key={singleItem.id}
              id={singleItem.id}
              quantity={singleItem.quantity}
              name={singleItem.name}
              price={singleItem.price}
              source={singleItem.source}
            ></CartTableLine>
          ))}
          <div className={`row ${styles.lastRow}`}>
            <span className='col-6 justify-content-start d-flex'>
              <input
                className='me-2'
                onChange={handleCouponCodeChange}
                placeholder='Coupon code'
              />
              <Button
                variant='main'
                onClick={handleApplyCoupon}
                type='submit'
                className={styles.cartButton}
              >
                APPLY COUPON
              </Button>
            </span>
            <span className='col-6 d-flex justify-content-end'>
              {couponMessage === 'null' && null}
              {couponMessage === 'error' &&
                'It looks like code ' + couponCode + ' is not working'}
              {couponMessage === 'success' &&
                'Great! Your code ' + couponCode + ' works!'}
            </span>
          </div>
        </div>
        <div className='row mx-0'>
          <div className='col-6'></div>
          <div className='col-6 mb-4'>
            <div className={`row ${styles.cartTotalsTop}`}>
              <div className='col-5'></div>
              <div className='col-7'>
                <span>Cart totals</span>
              </div>
            </div>
            {isCouponActive && (
              <div className={`row ${styles.cartTotalsRows}`}>
                <div className='col-5'>Discount</div>
                <div className={`col-7 ${styles.borderLeft} ${styles.price}`}>
                  <span>
                    {coupons.map(coupon => {
                      if (coupon.id === couponCode) {
                        switch (coupon.type) {
                          case 'discount':
                            return 'You got ' + (1 - coupon.value) * 100 + '% Discount';
                          case 'freeDelivery':
                            return 'You got free delivery!';
                          default:
                            return 'No cupon';
                        }
                      }
                      return null;
                    })}
                  </span>
                </div>
              </div>
            )}
            <div className={`row ${styles.cartTotalsRows}`}>
              <div className='col-5'>Subtotal</div>
              <div className={`col-7 ${styles.borderLeft} ${styles.price}`}>
                <span>
                  {currency.sign} {subTotalPrice}
                </span>
              </div>
            </div>
            <div className={`row ${styles.cartTotalsRows}`}>
              <div className='col-5'>Total</div>
              <div className={`col-7 ${styles.borderLeft} ${styles.price}`}>
                <span>
                  {currency.sign} {totalPrice}
                </span>
              </div>
            </div>
            <div className={`row ${styles.cartTotalsBottom}`}>
              <div className='col-12'>
                <Button
                  variant='main'
                  type='submit'
                  className={styles.proceedButton}
                  onClick={handleClick}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
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

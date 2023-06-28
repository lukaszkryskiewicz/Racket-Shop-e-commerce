import React, { useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import styles from './CartLayout.module.scss';
import CartProduct from '../../features/CartProduct/CartProduct';
import { checkout, getAll, getCoupons } from '../../../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrency } from '../../../redux/currencyRedux';
import Alert from '../../common/Alert/Alert';

const CartLayout = () => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ status: false, type: 'checkout' });
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [actualDeliveryFee, setActualDeliveryFee] = useState(20);
  const [couponCode, setCouponCode] = useState(null);
  const [isCouponActive, setIsCouponActive] = useState(false);
  const [couponMessage, setCouponMessage] = useState(null);
  const cartProducts = useSelector(getAll);
  const currency = useSelector(state => getCurrency(state));
  const coupons = useSelector(getCoupons);

  const handleClick = e => {
    e.preventDefault();
    if (cartProducts.length > 0) {
      dispatch(checkout());
      setAlert({ status: true, type: 'checkout' });
    }
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
    return { subTotal, total, deliveryFee };
  };

  const handleCouponCodeChange = e => {
    setCouponCode(e.target.value.toLowerCase());
    setIsCouponActive(false);
    setCouponMessage(null);
  };

  const handleApplyCoupon = e => {
    e.preventDefault();
    const { subTotal, total, deliveryFee } = calculateCart();
    setSubTotalPrice(subTotal.toFixed(2));
    setTotalPrice(total.toFixed(2));
    setActualDeliveryFee(deliveryFee.toFixed(2));
  };

  useEffect(() => {
    const { subTotal, total, deliveryFee } = calculateCart();
    setSubTotalPrice(subTotal.toFixed(2));
    setTotalPrice(total.toFixed(2));
    setActualDeliveryFee(deliveryFee.toFixed(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts, currency, isCouponActive]);
  return (
    <div className={styles.root}>
      {alert.status && (
        <Alert closeAlert={setAlert} type={alert.type} action={alert.action} />
      )}
      {cartProducts.length === 0 && (
        <div className='m-5 text-center'>
          <p>Cart is empty!</p>
          <Button variant='small' link='/'>
            Go to main page
          </Button>
        </div>
      )}
      {cartProducts.length > 0 && (
        <div className='container'>
          <div className={styles.cartTable}>
            {cartProducts.map(singleItem => (
              <CartProduct
                key={singleItem.id}
                id={singleItem.id}
                quantity={singleItem.quantity}
                name={singleItem.name}
                price={singleItem.price}
                source={singleItem.source}
              ></CartProduct>
            ))}
            <div className={`row ${styles.lastRow}`}>
              <span className='col-auto justify-content-start d-flex'>
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
                  apply coupon
                </Button>
              </span>
              <span className='col-auto d-flex justify-content-end'>
                {couponMessage === 'null' && null}
                {couponMessage === 'error' &&
                  'It looks like code ' + couponCode + ' is not working'}
                {couponMessage === 'success' &&
                  'Great! Your code ' + couponCode + ' works!'}
              </span>
            </div>
          </div>
          <div className='row mx-0  justify-content-end'>
            <div className='col-auto mb-4'>
              <div className={`row ${styles.cartTotalsTop}`}>
                <div className='col text-center'>
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
                              return (
                                'You got ' + (1 - coupon.value) * 100 + '% Discount'
                              );
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
                <div className='col-5'>Delivery</div>
                <div className={`col-7 ${styles.borderLeft} ${styles.price}`}>
                  <span>
                    {currency.sign} {actualDeliveryFee}
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
                    Proceed to checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
CartLayout.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  source: PropTypes.string,
};

export default CartLayout;

import React from 'react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './CartTableLine.module.scss';
import PropTypes from 'prop-types';
import Button from '../../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, updateProduct } from '../../../../redux/cartRedux';
import { getCurrency } from '../../../../redux/currencyRedux';
import { getProductById } from '../../../../redux/productsRedux';
import { updateProductQuantity } from '../../../../redux/productsRedux';
import Alert from '../../../common/Alert/Alert';
import clsx from 'clsx';

const CartTableLine = ({ id, name, price, source, quantity }) => {
  const dispatch = useDispatch();
  const product = useSelector(state => getProductById(state, id));
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [alert, setAlert] = useState({ status: false, type: 'error', action: null });
  const currency = useSelector(state => getCurrency(state));
  price = (price * currency.multiplier).toFixed(2);
  const totalForProduct = (price * itemQuantity).toFixed(2);

  const handleDelete = () => {
    setAlert({ status: true, type: 'delete', action: confirmDelete });
  };

  const confirmDelete = () => {
    dispatch(removeProduct(id));
    dispatch(updateProductQuantity({ id, quantity: itemQuantity, type: 'plus' }));
  };

  const handleChange = e => {
    e.preventDefault();
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && product.quantity + itemQuantity >= newQuantity) {
      if (newQuantity > itemQuantity) {
        dispatch(
          updateProductQuantity({
            id,
            quantity: newQuantity - itemQuantity,
            type: 'minus',
          })
        );
      } else {
        dispatch(
          updateProductQuantity({
            id,
            quantity: itemQuantity - newQuantity,
            type: 'plus',
          })
        );
      }
      setItemQuantity(newQuantity);
      dispatch(updateProduct({ id, quantity: newQuantity }));
    } else {
      setAlert({ status: true, type: 'error' });
    }
  };

  const incrementQuantity = () => {
    if (product.quantity >= 1) {
      setItemQuantity(itemQuantity + 1);
      dispatch(updateProduct({ id, quantity: itemQuantity + 1 }));
      dispatch(updateProductQuantity({ id, quantity: 1, type: 'minus' }));
    } else {
      setAlert({ status: true, type: 'error' });
    }
  };

  const decrementQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
      dispatch(updateProduct({ id, quantity: itemQuantity - 1 }));
      dispatch(updateProductQuantity({ id, quantity: 1, type: 'plus' }));
    }
  };

  return (
    <div className={styles.root}>
      <div className={clsx('row', styles.nextRows)}>
        {alert.status && (
          <Alert
            closeAlert={setAlert}
            id={id}
            type={alert.type}
            action={alert.action}
          />
        )}
        <div className='col-md-7 col-6 px-1'>
          <div className={clsx('row w-100', styles.vertCenter)}>
            <div className={clsx('col-12 col-sm-6 d-flex align-items-center')}>
              <Button
                className={clsx('col-auto', styles.button)}
                onClick={e => handleDelete(e)}
              >
                <AiOutlineCloseCircle className={styles.tableIcon} />
              </Button>
              <div className={clsx('col-10 col-sm-5', styles.vertCenter)}>
                <div className={styles.productImage}>
                  <img alt={name} src={source} />
                </div>
              </div>
            </div>
            <div
              className={clsx('col-12 col-sm-6 d-flex flex-column ps-3 text-center')}
            >
              <p className={clsx('my-auto', styles.title)}>{name}</p>
              <p className={clsx('my-auto', styles.price)}>
                {currency.sign} {price}
              </p>
            </div>
          </div>
        </div>
        <div className={clsx('col-md-5 col-6 p-0', styles.rightColumn)}>
          <div className='col-md-6 col-auto text-center'>
            <Button className={styles.amountControls} onClick={decrementQuantity}>
              -
            </Button>
            <input
              className={styles.amountInput}
              onChange={e => handleChange(e)}
              value={itemQuantity}
            />
            <Button className={styles.amountControls} onClick={incrementQuantity}>
              +
            </Button>
          </div>
          <div className={`col-md-6 col-auto text-center ${styles.price}`}>
            {currency.sign} {totalForProduct}
          </div>
        </div>
      </div>
    </div>
  );
};

CartTableLine.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  source: PropTypes.string,
  quantity: PropTypes.number,
  countSubTotal: PropTypes.func,
  totalForProduct: PropTypes.func,
};
export default CartTableLine;

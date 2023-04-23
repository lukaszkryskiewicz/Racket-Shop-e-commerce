import React from 'react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './CartTableLine.module.scss';
import PropTypes from 'prop-types';
import Button from '../../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, updateProduct } from '../../../../redux/cartRedux';
import { getCurrency } from '../../../../redux/currencyRedux';

const CartTableLine = ({ id, name, price, source, quantity }) => {
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const currency = useSelector(state => getCurrency(state));
  price = (price * currency.multiplier).toFixed(2);
  const totalForProduct = (price * itemQuantity).toFixed(2);

  const handleClick = e => {
    e.preventDefault(e);
    dispatch(removeProduct(id));
  };

  const handleChange = e => {
    e.preventDefault();
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setItemQuantity(newQuantity);
      dispatch(updateProduct({ id, quantity: newQuantity }));
    }
  };

  const incrementQuantity = () => {
    if (itemQuantity < 10) {
      setItemQuantity(itemQuantity + 1);
      dispatch(updateProduct({ id, quantity: itemQuantity + 1 }));
    }
  };

  const decrementQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
      dispatch(updateProduct({ id, quantity: itemQuantity - 1 }));
    }
  };

  return (
    <div className={`row ${styles.nextRows}`}>
      <div className='col-8 h-100'>
        <div className={`row w-100 ${styles.vertCenter}`}>
          <Button
            className={`col-1 text-center ${styles.vertCenter}`}
            onClick={handleClick}
          >
            <AiOutlineCloseCircle className={styles.tableIcon} />
          </Button>
          <div className={`col-3 text-center ${styles.vertCenter}`}>
            <div className={styles.productImage}>
              <img alt={name} src={source} />
            </div>
          </div>
          <div className={`col-8  ps-4 ${styles.vertCenter}`}>{name}</div>
        </div>
      </div>
      <div className={`col-1 text-center ${styles.price}`}>
        {currency.sign} {price}
      </div>
      <div className='col-2 text-center'>
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
      <div className={`col-1 text-center ${styles.price}`}>
        {currency.sign} {totalForProduct}
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

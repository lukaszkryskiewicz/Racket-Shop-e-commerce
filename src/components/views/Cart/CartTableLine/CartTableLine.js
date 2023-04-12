import React from 'react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './CartTableLine.module.scss';
import PropTypes from 'prop-types';
import Button from '../../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, updateProduct } from '../../../../redux/cartRedux';
import { getCurrency } from '../../../../redux/currencyRedux';

const CartTableLine = ({ id, name, price, source, amount }) => {
  const dispatch = useDispatch();
  const [itemAmount, setAmount] = useState(amount);
  const currency = useSelector(state => getCurrency(state));
  price = (price * currency.multiplier).toFixed(2);
  const totalForProduct = (price * itemAmount).toFixed(2);

  const handleClick = e => {
    e.preventDefault(e);
    dispatch(removeProduct(id));
  };

  const handleChange = e => {
    e.preventDefault();
    const newAmount = parseInt(e.target.value);
    if (!isNaN(newAmount)) {
      setAmount(newAmount);
      dispatch(updateProduct({ id, amount: newAmount }));
    }
  };

  const incrementAmount = () => {
    if (itemAmount < 10) {
      setAmount(itemAmount + 1);
      dispatch(updateProduct({ id, amount: itemAmount + 1 }));
    }
  };

  const decrementAmount = () => {
    if (itemAmount > 1) {
      setAmount(itemAmount - 1);
      dispatch(updateProduct({ id, amount: itemAmount - 1 }));
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
        <Button className={styles.amountControls} onClick={decrementAmount}>
          -
        </Button>
        <input
          className={styles.amountInput}
          onChange={e => handleChange(e)}
          value={itemAmount}
        />
        <Button className={styles.amountControls} onClick={incrementAmount}>
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
  amount: PropTypes.number,
  countSubTotal: PropTypes.func,
  totalForProduct: PropTypes.func,
};
export default CartTableLine;

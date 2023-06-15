import React from 'react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './CartProduct.module.scss';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, updateProduct } from '../../../redux/cartRedux';
import { getCurrency } from '../../../redux/currencyRedux';
import { getProductById } from '../../../redux/productsRedux';
import { updateProductQuantity } from '../../../redux/productsRedux';
import Alert from '../../common/Alert/Alert';
import clsx from 'clsx';
import { HashLink as Link } from 'react-router-hash-link';

const CartProduct = ({ id, name, price, source, quantity }) => {
  const dispatch = useDispatch();
  const product = useSelector(state => getProductById(state, id));
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [previousItemQuantity, setPreviousItemQuantity] = useState(quantity);
  const [alert, setAlert] = useState({ status: false, type: 'error', action: null });
  const currency = useSelector(state => getCurrency(state));
  price = (price * currency.multiplier).toFixed(2);
  const totalForProduct = (price * itemQuantity).toFixed(2);

  const handleDelete = () => {
    setAlert({ status: true, type: 'delete', action: confirmDelete });
  };

  const confirmDelete = () => {
    dispatch(removeProduct(id));
    dispatch(
      updateProductQuantity({
        id,
        quantity: itemQuantity > 0 ? itemQuantity : previousItemQuantity,
      })
    );
  };

  const handleChange = e => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setItemQuantity(newValue);
    }
  };

  const handleBlur = e => {
    const newValue = parseInt(e.target.value);
    if (
      !isNaN(newValue) &&
      newValue !== 0 &&
      product.quantity + previousItemQuantity >= newValue
    ) {
      dispatch(updateProduct({ id, quantity: newValue }));
      dispatch(
        updateProductQuantity({ id, quantity: previousItemQuantity - newValue })
      );
      setPreviousItemQuantity(newValue);
    } else if (newValue < 1) {
      handleDelete();
    } else {
      setAlert({ status: true, type: 'error' });
      setItemQuantity(previousItemQuantity);
    }
  };

  const incrementQuantity = () => {
    if (product.quantity >= 1) {
      const newValue = itemQuantity + 1;
      setPreviousItemQuantity(newValue);
      setItemQuantity(newValue);
      dispatch(updateProduct({ id, quantity: itemQuantity + 1 }));
      dispatch(updateProductQuantity({ id, quantity: -1 }));
    } else {
      setAlert({ status: true, type: 'error' });
    }
  };

  const decrementQuantity = () => {
    if (itemQuantity > 1) {
      const newValue = itemQuantity - 1;
      setPreviousItemQuantity(newValue);
      setItemQuantity(newValue);
      dispatch(updateProduct({ id, quantity: itemQuantity - 1 }));
      dispatch(updateProductQuantity({ id, quantity: 1 }));
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
                  <Link to={'/product/' + id + '#'}>
                    <img alt={name} src={source} />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={clsx('col-12 col-sm-6 d-flex flex-column ps-3 text-center')}
            >
              <p className={clsx('my-auto', styles.title)}>
                <Link to={'/product/' + id + '#'}>{name}</Link>
              </p>
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
              onBlur={handleBlur}
              value={itemQuantity}
              onChange={handleChange}
            />
            <Button className={styles.amountControls} onClick={incrementQuantity}>
              +
            </Button>
            {product.quantity > 0 && (
              <p className={styles.quantityInfo}>Only {product.quantity} more left!</p>
            )}
            {product.quantity === 0 && (
              <p className={styles.quantityInfo}>No more products left!</p>
            )}
          </div>
          <div className={`col-md-6 col-auto text-center ${styles.price}`}>
            {currency.sign} {totalForProduct}
          </div>
        </div>
      </div>
    </div>
  );
};

CartProduct.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  source: PropTypes.string,
  quantity: PropTypes.number,
  countSubTotal: PropTypes.func,
  totalForProduct: PropTypes.func,
};
export default CartProduct;

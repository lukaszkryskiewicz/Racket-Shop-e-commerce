import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ProductModal from '../ProductModal/ProductModal';
import styles from './ProductBox.module.scss';
import Button from '../Button/Button';
import StarsReview from '../StarsReview/StarsReview';
import ActionButton from '../ActionButton/ActionButton';
import { useSelector } from 'react-redux';
import { getCurrency } from '../../../redux/currencyRedux';
import Alert from '../Alert/Alert';

const ProductBox = props => {
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState({ status: false, type: 'success' });
  const currency = useSelector(state => getCurrency(state));
  const {
    id,
    name,
    price,
    promo,
    stars,
    myStars,
    oldPrice,
    favourite,
    compare,
    source,
  } = props;
  const productLink = '/product/' + id;

  return (
    <div className={styles.root}>
      {modal && <ProductModal closeModal={setModal} productData={props} />}
      {alert.status && <Alert closeAlert={setAlert} id={id} type={alert.type} />}
      <div className={styles.photo}>
        {promo && <div className={styles.sale}>{promo}</div>}
        <NavLink to={productLink}>
          <div className={styles.image}>
            <img alt={name} src={source} />
          </div>
        </NavLink>
        <div className={styles.buttons}>
          <ActionButton
            id={id}
            buttonType={'quickView'}
            buttonVariant='small'
            onClickFunction={setModal}
            productData={props}
          >Quick view</ActionButton>
          <ActionButton
            id={id}
            buttonType={'addToCart'}
            name={name}
            price={price}
            source={source}
            buttonVariant='small'
            onClickFunction={setAlert}
          >
            Add To Cart
          </ActionButton>
        </div>
      </div>
      <div className={styles.content}>
        <StarsReview id={id} stars={stars} myStars={myStars} name={name} />
      </div>
      <div className={styles.line}></div>
      <div className={styles.actions}>
        <div className={styles.outlines}>
          <ActionButton {...{ id, favourite }} buttonType={'favourite'} />
          <ActionButton {...{ id, compare }} buttonType={'compare'} />
        </div>
        {oldPrice && (
          <div className={styles.oldPrice}>
            {currency.sign} {(oldPrice * currency.multiplier).toFixed(2)}
          </div>
        )}
        <div className={styles.price}>
          <Button className={styles.button} variant='small'>
            {currency.sign} {(price * currency.multiplier).toFixed(2)}
          </Button>
        </div>
      </div>
    </div >
  );
};

ProductBox.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number,
  promo: PropTypes.string,
  stars: PropTypes.number,
  myStars: PropTypes.number,
  oldPrice: PropTypes.number,
  favourite: PropTypes.bool,
  compare: PropTypes.bool,
  source: PropTypes.string,
};

export default ProductBox;

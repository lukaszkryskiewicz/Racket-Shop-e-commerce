import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductRow.module.scss';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { getCurrency } from '../../../redux/currencyRedux';
import Button from '../../common/Button/Button';
import ActionButton from '../../common/ActionButton/ActionButton';
import StarsReviewBasic from '../StarsReviewBasic/StarsReviewBasic';
import Alert from '../../common/Alert/Alert';

const ProductRow = product => {
  const currency = useSelector(getCurrency);
  const [alert, setAlert] = useState({ status: false, type: 'success' });
  const {
    id,
    name,
    price,
    promo,
    oldPrice,
    favourite,
    compare,
    source,
    overview,
  } = product;

  return (
    <div className={styles.root}>
      <div className={clsx('row')}>
        <div className={clsx('col-4')}>
          {alert.status && <Alert closeAlert={setAlert} id={id} type={alert.type} />}
          <div className={styles.productPhoto}>
            {promo && <div className={styles.sale}>{promo}</div>}
            <NavLink to={'/product/' + id}>
              <img src={source} alt={name} />
            </NavLink>
          </div>
        </div>
        <div className={clsx('col-8', styles.productInfo)}>
          <div className={clsx('row', styles.headerRow)}>
            <div className={styles.title}>
              <NavLink to={'/product/' + id}>
                <h1>{name}</h1>
              </NavLink>
            </div>
            <div className={clsx(styles.review)}>
              <div>
                <StarsReviewBasic {...product} />
                <p className={clsx(styles.reviewsNumber)}>(0 reviews)</p>
              </div>
            </div>
          </div>
          <div className={clsx('row', styles.priceRow)}>
            <div className={clsx(styles.priceValue)}>
              {oldPrice && (
                <div className={clsx(styles.oldPrice)}>
                  {currency.sign}{' '}
                  {(oldPrice * currency.multiplier).toFixed(2)}
                </div>
              )}
              <div className={clsx(styles.price)}>
                <Button noLink className={styles.button} variant='small'>
                  {currency.sign} {(price * currency.multiplier).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
          <div className={clsx('row', styles.overviewRow)}>
            <div>{overview}</div>
          </div>
          <div className={clsx('row', styles.buttonsRow)}>
            <div className={styles.outlines}>
              <ActionButton
                id={id}
                favourite={favourite}
                buttonType={'favourite'}
              />
              <ActionButton
                id={id}
                compare={compare}
                buttonType={'compare'}
              />
              <ActionButton
                buttonType={'mail'}
                id={product.id}
              >
              </ActionButton>
              <ActionButton
                id={id}
                buttonType={'addToCart'}
                name={name}
                price={price}
                source={source}
                buttonStyle='primary'
                onClickFunction={setAlert}
              >
                Add To Cart
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductRow.propTypes = {
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


export default ProductRow;
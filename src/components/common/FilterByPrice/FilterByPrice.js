import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FilterByPrice.module.scss';
import ReactSlider from 'react-slider';
import Button from '../Button/Button';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../../redux/filterRedux';
import { getAllProducts } from '../../../redux/productsRedux';
import { getCurrency } from '../../../redux/currencyRedux';

const FilterByPrice = ({ categoryId }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => getAllProducts(state));
  const currency = useSelector(getCurrency);
  const maxPrice = () => {
    let tempPrice = 0;
    products.map(product => {
      if (product.category === categoryId) {
        if (product.price > tempPrice) {
          tempPrice = product.price * currency.multiplier;
        }
      }
      return true;
    });
    return tempPrice;
  };
  const [actualPrice, setActualPrice] = useState([0, maxPrice().toFixed(0)]);

  const handleClick = e => {
    e.preventDefault();
    dispatch(updateFilter({ name: 'priceFilter', value: actualPrice }));
  };

  return (
    <>
      <div className='container'>
        <div className={styles.root}>
          <div className={styles.title}>
            <h5>Filter by price</h5>
          </div>
          <div className={clsx('row', styles.range)}>
            <ReactSlider
              className={styles.horizontalSlider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              defaultValue={[0, maxPrice()]}
              max={maxPrice()}
              min={0}
              pearling
              minDistance={2}
              onChange={value => setActualPrice(value)}
            />
          </div>
          <div className={clsx('row p-3', styles.confirm)}>
            <Button
              variant='main'
              className={clsx('col-4 p-1', styles.button)}
              onClick={handleClick}
            >
              Filter
            </Button>
            <div className={clsx('col-5 p-0', styles.rangeDisplay)}>
              <p>
                {currency.sign}{actualPrice[0]} - {currency.sign}{actualPrice[1]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterByPrice;

FilterByPrice.propTypes = {
  categoryId: PropTypes.string,
};

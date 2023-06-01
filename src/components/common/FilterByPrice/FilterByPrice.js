import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FilterByPrice.module.scss';
import ReactSlider from 'react-slider';
import Button from '../Button/Button';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../../redux/filterRedux';
import { getAllProducts } from '../../../redux/productsRedux';
import { getCurrency } from '../../../redux/currencyRedux';

const FilterByPrice = ({ categoryId, clearFilters }) => {
  const dispatch = useDispatch();
  const currency = useSelector(getCurrency);
  const products = useSelector(state => getAllProducts(state));
  const maxPrice = () => {
    let tempPrice = 0;
    products.map(product => {
      if (product.category === categoryId) {
        if (product.price > tempPrice) {
          tempPrice = product.price;
        }
      }
      return true;
    });
    return tempPrice * currency.multiplier;
  };
  const [actualPrice, setActualPrice] = useState([0, maxPrice().toFixed(0)]);

  useEffect(() => {
    setActualPrice([0, maxPrice().toFixed(0)]);
    setSliderKey(Date.now());
    clearFilters();
  }, [currency]);
  const handleClick = e => {
    e.preventDefault();
    dispatch(updateFilter({ name: 'priceFilter', value: actualPrice }));
    console.log(actualPrice)
  };

  const [sliderKey, setSliderKey] = useState(Date.now());

  return (
    <>
      <div className='container'>
        <div className={styles.root}>
          <div className={styles.title}>
            <h5>Filter by price</h5>
          </div>
          <div className={clsx('row', styles.range)}>
            <ReactSlider
              key={sliderKey}
              className={styles.horizontalSlider}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              defaultValue={[0, maxPrice()]}
              max={maxPrice()}
              min={0}
              pearling
              minDistance={2}
              onChange={value => setActualPrice(value)}
              withTracks={true}
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
                {actualPrice[0]} - {actualPrice[1]}
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
  clearFilters: PropTypes.func,
  categoryId: PropTypes.string,
};

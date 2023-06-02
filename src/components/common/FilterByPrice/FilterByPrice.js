import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FilterByPrice.module.scss';
import ReactSlider from 'react-slider';
import Button from '../Button/Button';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFilters, updateFilter } from '../../../redux/filterRedux';
import { getAllProducts } from '../../../redux/productsRedux';
import { getCurrency } from '../../../redux/currencyRedux';

const FilterByPrice = ({ categoryId, clearFilters }) => {
  const dispatch = useDispatch();
  const currency = useSelector(getCurrency);
  const products = useSelector(state => getAllProducts(state));
  const productFilters = useSelector(getAllFilters);
  const priceFilter = productFilters.find(filter => filter.name === 'priceFilter');
  const [filterAplied, setFilterApllied] = useState(false);


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
  const [actualPrice, setActualPrice] = useState([0, parseInt(maxPrice().toFixed(0))]);

  useEffect(() => {
    if (priceFilter) {
      setActualPrice(priceFilter.value);
      setFilterApllied(true);
    } else {
      setActualPrice([0, parseInt(maxPrice().toFixed(0))]);
      setFilterApllied(false);
    }
  }, [priceFilter]);

  useEffect(() => {
    setActualPrice([0, parseInt(maxPrice().toFixed(0))]);
    clearFilters();
  }, [currency]);

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
              value={actualPrice}
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
              variant='small'
              className={clsx('col-4 p-1', styles.button, filterAplied && styles.active)}
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

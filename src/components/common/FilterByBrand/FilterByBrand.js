import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './FilterByBrand.module.scss';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { getAllFilters, removeFilter, updateFilter } from '../../../redux/filterRedux';
import { getAllProducts } from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';

const FilterByBrand = ({ categoryId }) => {
  const dispatch = useDispatch();
  const [activeBrand, setActiveBrand] = useState(null);
  const products = useSelector(state => getAllProducts(state));
  const productFilters = useSelector(getAllFilters);

  const brandFilter = productFilters.find(filter => filter.name === 'brandFilter');
  useEffect(() => {
    if (brandFilter) {
      setActiveBrand(brandFilter.value);
    } else {
      setActiveBrand(null);
    }
  }, [brandFilter]);

  const brands = products.reduce((acc, obj) => {
    if (obj.category === categoryId) {
      if (obj.category === categoryId && !acc[obj.manufacturer]) {
        acc[obj.manufacturer] = 1;
      } else {
        acc[obj.manufacturer]++;
      }

    } return acc;
  }, {});


  const handleClick = brand => {
    if (brand !== activeBrand) {
      setActiveBrand(brand);
      dispatch(updateFilter({ name: 'brandFilter', value: brand }));
    } else {
      setActiveBrand(null);
      dispatch(removeFilter({ name: 'brandFilter' }));
    }
  };
  return (
    <>
      <div className='container'>
        <div className={styles.root}>
          <div className={styles.title}>
            <h5>Filter by brand</h5>
          </div>
          <div>
            <ul className={styles.brandList}>
              {Object.keys(brands).map(brand => (
                <li
                  key={brand}
                  className={`d-flex align-items-center + ${activeBrand ===
                    brand && styles.active}`}
                  onClick={() => handleClick(brand)}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                  <h4>{brand}</h4>
                  <span className={styles.number}>{brands[brand]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterByBrand;


FilterByBrand.propTypes = {
  categoryId: PropTypes.string,
};
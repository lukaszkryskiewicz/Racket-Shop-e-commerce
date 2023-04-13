import React from 'react';
import FilterByRating from '../../common/FilterByRating/FilterByRating';
import FilterByColor from '../../common/FilterByColor/FilterByColor';
// import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import Brands from '../../layout/Brands/Brands';
import FilterByPrice from '../../common/FilterByPrice/FilterByPrice';
import Banner from '../../common/Banner/Banner';
import NewProduct from '../../features/NewProduct/NewProductContainer';
import FilterByBrand from '../../common/FilterByBrand/FilterByBrand';
import { useParams } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { clearFilters } from '../../../redux/filterRedux';

const ProductList = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearFilters());
  };


  return (
    <div className={styles.root}>
      <div className='container'>
        <Banner />
        <div className={`row ${styles.filtered}`}>
          <div className={`col-9 ${styles.productList}`}>
            <NewProduct productsOnDesktop={12} categoryId={categoryId} />
          </div>
          <div className={`col-3 ${styles.filters}`}>
            <FilterByBrand categoryId={categoryId} />
            <FilterByPrice categoryId={categoryId} />
            <FilterByRating />
            <FilterByColor />
            <Button variant="small" onClick={handleClick}>Clear filters</Button>
          </div>
          <div className={`row mt-3 ${styles.brands}`}>
            <Brands />
          </div>
        </div>
      </div>
    </div>
  );
};

// ProductList.propTypes = {};

export default ProductList;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductsDisplayOptions.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSquare } from '@fortawesome/free-solid-svg-icons';

const ProductsDisplayOptions = ({ productsToDisplay, displayForm, sortBy, setProductsToDisplay, setDisplayForm, setSortBy }) => {

  return (
    <>
      <div className={clsx('col-md col-12', styles.menu)}>
        <div className={styles.sortBy}>
          <p className={styles.sortByTitle}>Sort by</p>
          <select
            className={styles.selectSortedBy}
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value={'recommended'}>Recommended</option>
            <option value={'priceLow'}>Price - lowest first</option>
            <option value={'priceHigh'}>Price - highest first</option>
            <option value={'name'}>Name</option>
          </select>
        </div>
        <div className={styles.productsToDisplay}>
          <p className={styles.productToDisplayTitle}>Show</p>
          <select
            className={styles.selectProductsToDisplay}
            value={productsToDisplay}
            onChange={e => setProductsToDisplay(parseInt(e.target.value))}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={18}>18</option>
            <option value={24}>24</option>
          </select>
        </div>
        <div className={styles.displayForm}>
          <ul>
            <li
              onClick={() => setDisplayForm('list')}
              className={displayForm === 'list' && styles.active}
            >
              <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
            </li>
            <li
              onClick={() => setDisplayForm('grid')}
              className={displayForm === 'grid' && styles.active}
            >
              <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

ProductsDisplayOptions.propTypes = {
  productsToDisplay: PropTypes.number,
  displayForm: PropTypes.string,
  sortBy: PropTypes.string,
  setProductsToDisplay: PropTypes.func,
  setDisplayForm: PropTypes.func,
  setSortBy: PropTypes.func,
};

export default ProductsDisplayOptions;
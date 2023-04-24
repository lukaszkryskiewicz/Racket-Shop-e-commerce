import React, { useState } from 'react';
import FilterByRating from '../../common/FilterByRating/FilterByRating';
import FilterByColor from '../../common/FilterByColor/FilterByColor';
import styles from './ProductsPageLayout.module.scss';
import Brands from '../../layout/Brands/Brands';
import FilterByPrice from '../../common/FilterByPrice/FilterByPrice';
import Banner from '../../common/Banner/Banner';
import FilterByBrand from '../../common/FilterByBrand/FilterByBrand';
import { useParams } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters } from '../../../redux/filterRedux';
import ProductList from '../../views/ProductList/ProductList';
import ProductGrid from '../../views/ProductGrid/ProductGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSquare } from '@fortawesome/free-solid-svg-icons';
import { getAllProducts } from '../../../redux/productsRedux';
import { getAllFilters } from '../../../redux/filterRedux';
import { getCurrency } from '../../../redux/currencyRedux';
import clsx from 'clsx';
import Dots from '../../common/Dots/Dots';
import CompareBar from '../../common/CompareBar/CompareBar';

const ProductsPageLayout = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const [productsToDisplay, setProductsToDisplay] = useState(12);
  const [activePage, setActivePage] = useState(0);
  const [displayForm, setDisplayForm] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const filters = useSelector(getAllFilters);
  const currency = useSelector(getCurrency);

  const productSuitsAllFilters = (product, allFilters) => {
    if (product.category === categoryId) {
      for (let i = 0; i < allFilters.length; i++) {
        const checkedFilter = allFilters[i];
        switch (checkedFilter.name) {
          case 'ratingFilter':
            if (!product.stars || checkedFilter.value > product.stars) {
              return false;
            }
            break;
          case 'colorFilter':
            if (
              !product.color ||
              !checkedFilter.value.some(color => product.color.includes(color))
            ) {
              return false;
            }
            break;
          case 'priceFilter':
            if (
              !product.price ||
              product.price * currency.multiplier < checkedFilter.value[0] ||
              product.price * currency.multiplier > checkedFilter.value[1]
            ) {
              return false;
            }
            break;
          case 'brandFilter':
            if (!product.manufacturer || product.manufacturer !== checkedFilter.value) {
              return false;
            }
            break;
          default:
            return false;
        }
      }
    } else {
      return false;
    }
    return true;
  };

  const handlePageChange = newPage => {
    //setFade(false);
    //  setTimeout(() => {
    setActivePage(newPage);
    // setFade(true);
    // }, 400);
  };

  const handleClick = () => {
    dispatch(clearFilters());
  };

  let filteredProducts = products.filter(product =>
    productSuitsAllFilters(product, filters)
  );

  let productsToRender = filteredProducts.slice(
    activePage * productsToDisplay,
    (activePage + 1) * productsToDisplay
  );
  let pagesCount = Math.ceil(filteredProducts.length / productsToDisplay);

  const dots = [];
  for (let i = 0; i < pagesCount; i++) {
    dots.push(
      <li key={i}>
        <a
          onClick={() => handlePageChange(i)}
          className={i === activePage && styles.active}
        >
          page {i}
        </a>
      </li>
    );
  }

  return (
    <div className={styles.root}>
      <Banner />
      <div className='container'>
        <div className={clsx('row', styles.filtered)}>
          <div className={clsx('col-9', styles.productList)}>
            <div className={clsx('row g-0 align-items-end', styles.headRow)}>
              <div className={clsx('col-md-auto col-12 mb-3 mb-md-0', styles.heading)}>
                <h3>{categoryId}</h3>
              </div>
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
                    onChange={e => setProductsToDisplay(e.target.value)}
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
              <div className={styles.dots}>
                <Dots
                  pagesCount={pagesCount}
                  handlePageChange={handlePageChange}
                  activePage={activePage}
                />
              </div>
            </div>
            {displayForm === 'list' && (
              <ProductList productsToRender={productsToRender} />
            )}
            {displayForm === 'grid' && (
              <ProductGrid productsToRender={productsToRender} />
            )}
          </div>
          <div className={`col-3 ${styles.filters}`}>
            <FilterByBrand categoryId={categoryId} />
            <FilterByPrice categoryId={categoryId} />
            <FilterByRating />
            <FilterByColor />
            <Button variant='small' onClick={handleClick}>
              Clear filters
            </Button>
          </div>
          <div className={`row mt-3 ${styles.brands}`}>
            <Brands />
            <CompareBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageLayout;

import React, { useEffect, useState } from 'react';
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
import { getSortedProducts } from '../../../redux/productsRedux';
import { getAllFilters } from '../../../redux/filterRedux';
import { getCurrency } from '../../../redux/currencyRedux';
import clsx from 'clsx';
import Dots from '../../common/Dots/Dots';
import CompareBar from '../../common/CompareBar/CompareBar';
import ProductsDisplayOptions from '../../features/ProductsDisplayOptions/ProductsDisplayOptions';
import { getViewportMode } from '../../../redux/viewportModeRedux';

const ProductsPageLayout = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const viewportMode = useSelector(getViewportMode);
  const [fade, setFade] = useState('false');
  const [productsToDisplay, setProductsToDisplay] = useState(12);
  const [activePage, setActivePage] = useState(0);
  const [displayForm, setDisplayForm] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const filters = useSelector(getAllFilters);
  const currency = useSelector(getCurrency);
  const products = useSelector(state => getSortedProducts(state, sortBy));

  useEffect(() => {
    if (viewportMode === 'tablet' || viewportMode === 'mobile') {
      setDisplayForm('grid');
      setProductsToDisplay(12);
    }
  }, [viewportMode]);

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
    setFade(false);
    setTimeout(() => {
      setActivePage(newPage);
      setFade(true);
    }, 400);
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

  useEffect(() => {
    setFade(false);
    setTimeout(() => {
      setActivePage(0);
      setFade(true);
    }, 400);
  }, [productsToDisplay, sortBy, displayForm]);

  return (
    <div className={styles.root}>
      <Banner />
      <div className='container'>
        <div className={clsx('row', styles.filtered)}>
          <div className={clsx('col-lg-9 col-md-8 col-12', styles.productList)}>
            <div className={clsx('row g-0 align-items-center', styles.headRow)}>
              <div className={clsx('col-md-auto col-5 mb-3 mb-md-0', styles.heading)}>
                <h3>{categoryId}</h3>
              </div>
              <div className={clsx('col-md-auto col-12', styles.menu)}>
                <ProductsDisplayOptions
                  productsToDisplay={productsToDisplay}
                  displayForm={displayForm}
                  sortBy={sortBy}
                  setProductsToDisplay={setProductsToDisplay}
                  setDisplayForm={setDisplayForm}
                  setSortBy={setSortBy}
                />
              </div>
              <div className={styles.dots}>
                <Dots
                  pagesCount={pagesCount}
                  handlePageChange={handlePageChange}
                  activePage={activePage}
                />
              </div>
            </div>
            <div
              className={clsx(
                'row',
                fade ? 'fadeIn' : 'fadeOut',
                styles.productContainer
              )}
            >
              {displayForm === 'list' && (
                <ProductList productsToRender={productsToRender} />
              )}
              {displayForm === 'grid' && (
                <ProductGrid productsToRender={productsToRender} />
              )}
            </div>
          </div>
          <div className={`col-lg-3 col-md-4 d-sm-none d-md-block ${styles.filters}`}>
            <FilterByBrand categoryId={categoryId} />
            <FilterByPrice categoryId={categoryId} clearFilters={handleClick} />
            <FilterByRating />
            <FilterByColor />
            <div className={styles.clearFilters}>
              <Button variant='small' onClick={handleClick}>
                Clear filters
              </Button>
            </div>
          </div>
          <div className={`row mt-3 d-sm-none d-md-block ${styles.brands}`}>
            <Brands />
          </div>
          <CompareBar />
        </div>
      </div>
    </div>
  );
};

export default ProductsPageLayout;

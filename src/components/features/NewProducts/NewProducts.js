import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './NewProducts.module.scss';
import ProductBox from '../../common/ProductBox/ProductBox';
import CompareBar from '../CompareBarComponents/CompareBar/CompareBar';
import Swipeable from '../../common/Swipeable/Swipeable';
import { useParams } from 'react-router';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { getAllCategories } from '../../../redux/categoriesRedux';
import { getAllProducts } from '../../../redux/productsRedux';
import { getViewportMode } from '../../../redux/viewportModeRedux';
import Dots from '../../common/Dots/Dots';
import clsx from 'clsx';

const NewProducts = ({ searchedData, productsOnDesktop }) => {
  const categories = useSelector(getAllCategories);
  const products = useSelector(getAllProducts);
  const viewportMode = useSelector(getViewportMode);
  const [activePage, setActivePage] = useState(0);
  const [activeCategory, setActiveCategory] = useState('tennis');
  const [fade, setFade] = useState(true);

  const pageAddress = useParams();
  const location = useLocation();

  const handlePageChange = newPage => {
    setFade(false);
    setTimeout(() => {
      setActivePage(newPage);
      setFade(true);
    }, 400);
  };

  const handleCategoryChange = newCategory => {
    setFade(false);
    setTimeout(() => {
      setActiveCategory(newCategory);
      setActivePage(0);
      setFade(true);
    }, 600);
  };

  const handleCategoryChangeMobile = e => {
    const newCategory = e.target.value;
    setFade(false);
    setTimeout(() => {
      setActiveCategory(newCategory);
      setActivePage(0);
      setFade(true);
    }, 600);
  };

  const isSearchPage = location.pathname.includes('/search');

  let productsToDisplay;

  switch (viewportMode) {
    case 'mobile':
      productsToDisplay = isSearchPage ? 5 : 3;
      break;
    case 'tablet':
      productsToDisplay = isSearchPage ? 10 : 6;
      break;
    case 'desktop':
      productsToDisplay = isSearchPage ? 12 : 9;
      break;
    default:
      productsToDisplay = isSearchPage ? 20 : productsOnDesktop;
      break;
  }

  useEffect(() => handlePageChange(0), [viewportMode, searchedData]);

  const leftAction = () => {
    if (activePage > 0) {
      let page = activePage - 1;
      handlePageChange(page);
    }
  };
  const rightAction = () => {
    let page = activePage + 1;
    if (page < pagesCount) handlePageChange(page);
  };

  let productsToRender = products.filter(item => item.category === activeCategory);
  let pagesCount = Math.ceil(productsToRender.length / productsToDisplay);

  if (searchedData) {
    productsToRender = products.filter(
      product =>
        product.name.toLowerCase().includes(searchedData.searchText) &&
        (!searchedData.category || product.category === searchedData.category)
    );
    pagesCount = Math.ceil(productsToRender.length / productsToDisplay);
  } else if (pageAddress.productId) {
    if (viewportMode === 'desktop') {
      productsToRender = productsToRender.filter((item, index) => index < 3);
    } else {
      productsToRender = productsToRender.filter((item, index) => index < 4);
    }
    pagesCount = 0;
  }

  return (
    <div className={styles.root}>
      <Swipeable leftAction={leftAction} rightAction={rightAction}>
        <div className='container'>
          <div className={styles.panelBar}>
            <div className='row g-0 align-items-end justify-content-between'>
              <div
                className={clsx(
                  'col-auto mb-md-0',
                  styles.heading,
                  isSearchPage && 'w-100'
                )}
              >
                <h3>New products</h3>
              </div>
              {!isSearchPage && (
                <div className={clsx('col', styles.menu)}>
                  {viewportMode !== 'mobile' && (
                    <ul>
                      {categories.map(item => (
                        <li key={item.id}>
                          <button
                            className={clsx(
                              item.id === activeCategory && styles.active
                            )}
                            onClick={() => handleCategoryChange(item.id)}
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {viewportMode === 'mobile' && (
                    <select
                      onChange={e => handleCategoryChangeMobile(e)}
                      value={activeCategory}
                    >
                      {categories.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}
              {pagesCount > 0 && (
                <Dots
                  pagesCount={pagesCount}
                  handlePageChange={handlePageChange}
                  activePage={activePage}
                />
              )}
            </div>
          </div>
          <div className={clsx('row', fade ? 'fadeIn' : 'fadeOut')}>
            {productsToRender.length > 0 &&
              productsToRender
                .slice(
                  activePage * productsToDisplay,
                  (activePage + 1) * productsToDisplay
                )
                .map(item => (
                  <div key={item.id} className={'col-xl-3 col-lg-4 col-md-6 col-12'}>
                    <ProductBox {...item} />
                  </div>
                ))}
            {productsToRender.length === 0 && <div>No results</div>}
          </div>
        </div>
      </Swipeable>
      <CompareBar />
    </div>
  );
};

NewProducts.propTypes = {
  children: PropTypes.node,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
      stars: PropTypes.number,
      promo: PropTypes.string,
      newProduct: PropTypes.bool,
    })
  ),
  viewportMode: PropTypes.string,
  searchedData: PropTypes.object,
  productsOnDesktop: PropTypes.number,
  categoryId: PropTypes.string,
  currency: PropTypes.shape({
    name: PropTypes.string,
    multiplier: PropTypes.number,
    sign: PropTypes.string,
  }),
};

export default NewProducts;

import React from 'react';
import styles from './RacketsGallery.module.scss';
import { useState } from 'react';
import {
  getFeaturedProducts,
  getProductById,
  getSaleOffProducts,
  getSortedProducts,
  getTopSellerProducts,
} from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import StarsReview from '../StarsReview/StarsReview';
import ActionButton from '../ActionButton/ActionButton';
import { useEffect } from 'react';
import { getViewportMode } from '../../../redux/viewportModeRedux';
import { getCurrency } from '../../../redux/currencyRedux';
import ProductModal from '../ProductModal/ProductModal';
import Alert from '../Alert/Alert';
import clsx from 'clsx';
import { HashLink as NavLink } from 'react-router-hash-link';

const RacketsGallery = () => {
  const headlines = ['Featured', 'Top Seller', 'Sale Off', 'Top Rated'];
  const [fadeImage, setFadeImage] = useState(true);
  const [fadeSlider, setFadeSlider] = useState(true);
  const [activeHeadline, setActiveHeadline] = useState('Featured');
  const [activePage, setActivePage] = useState(0);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState({ status: false, type: 'success' });
  const viewportMode = useSelector(viewportMode => getViewportMode(viewportMode));
  const currency = useSelector(getCurrency);
  const productsToDisplay = useSelector(state => {
    switch (activeHeadline) {
      case 'Featured':
        return getFeaturedProducts(state).slice(0, 18);
      case 'Sale Off':
        return getSaleOffProducts(state).slice(0, 18);
      case 'Top Seller':
        return getTopSellerProducts(state).slice(0, 18);
      case 'Top Rated':
        return getSortedProducts(state, 'recommended').slice(0, 18);
      default:
        return [];
    }
  });

  const [activeProduct, setActiveProduct] = useState(productsToDisplay[0]);
  const [activeThumbnail, setActiveThumbnail] = useState(productsToDisplay[0]);

  const handleHeadlineChange = headline => {
    setFadeImage(false);
    setFadeSlider(false);
    setTimeout(() => {
      handlePageChange(0);
      setActiveHeadline(headline);
      setFadeImage(true);
      setFadeSlider(true);
    }, 400);
  };
  const displayedProduct = useSelector(state =>
    getProductById(state, activeProduct.id)
  );

  const columns = viewportMode === 'mobile' ? 4 : viewportMode === 'tablet' ? 6 : 6;
  const pagesCount = Math.ceil(productsToDisplay.length / columns);

  const handlePageChange = newPage => {
    setFadeSlider(false);
    setTimeout(() => {
      setFadeSlider(true);
      setActivePage(newPage);
    }, 400);
  };
  const handleProductChange = product => {
    setFadeImage(false);
    setActiveThumbnail(product);
    setTimeout(() => {
      setFadeImage(true);
      setActiveProduct(product);
    }, 400);
  };

  const leftAction = () => {
    const currentIndex = productsToDisplay.findIndex(
      product => product.id === activeProduct.id
    );
    const newIndex =
      currentIndex === 0 ? productsToDisplay.length - 1 : currentIndex - 1;
    const newProduct = productsToDisplay[newIndex];
    if (currentIndex === columns) {
      handlePageChange(activePage - 1);
    } else if (currentIndex === 0) {
      handlePageChange(pagesCount - 1);
    }
    setFadeImage(false);
    setActiveThumbnail(newProduct);
    setTimeout(() => {
      setFadeImage(true);
      setActiveProduct(newProduct);
    }, 400);
  };

  const rightAction = () => {
    const currentIndex = productsToDisplay.findIndex(
      product => product.id === activeProduct.id
    );
    const newIndex =
      currentIndex === productsToDisplay.length - 1 ? 0 : currentIndex + 1;
    const newProduct = productsToDisplay[newIndex];
    if (newIndex === columns) {
      handlePageChange(activePage + 1);
    } else if (newIndex === 0) {
      handlePageChange(0);
    }
    setFadeImage(false);
    setActiveThumbnail(newProduct);
    setTimeout(() => {
      setFadeImage(true);
      setActiveProduct(newProduct);
    }, 400);
  };

  useEffect(() => handlePageChange(0), [viewportMode]);
  useEffect(() => {
    setActiveProduct(productsToDisplay[0]);
    setActiveThumbnail(productsToDisplay[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHeadline]);

  return (
    <div className={styles.root}>
      {modal && <ProductModal closeModal={setModal} productData={displayedProduct} />}
      {alert.status && (
        <Alert closeAlert={setAlert} id={displayedProduct.id} type={alert.type} />
      )}
      <div className={styles.panelBar}>
        <div className={clsx('row g-0')}>
          <div className={clsx('col', styles.heading)}>
            <h3>Rackets Gallery</h3>
          </div>
        </div>
      </div>
      <div className={styles.galleryWrapper}>
        <ul className={clsx('row g-0', styles.menu)}>
          {headlines.map(headline => (
            <li className={clsx('col')} key={headline}>
              <button
                className={clsx(
                  styles.headlineButton,
                  headline === activeHeadline && styles.active
                )}
                onClick={() => handleHeadlineChange(headline)}
              >
                {headline}
              </button>
            </li>
          ))}
        </ul>
        <div
          className={clsx(
            'row g-0 align-items-center',
            styles.photo,
            fadeImage ? 'fadeIn' : 'fadeOut'
          )}
        >
          <NavLink to={'/product/' + displayedProduct.id + '#top'}>
            <img alt={displayedProduct.name} src={displayedProduct.source} />
          </NavLink>
          <div className={styles.productInfo}>
            <div className={styles.backgroundContent}>
              <div className={styles.price}>
                <p className={styles.newPrice}>
                  {currency.sign}
                  {(displayedProduct.price * currency.multiplier).toFixed(2)}
                </p>
                {displayedProduct.oldPrice && (
                  <p className={styles.oldPrice}>
                    {currency.sign}
                    {(displayedProduct.oldPrice * currency.multiplier).toFixed(2)}
                  </p>
                )}
              </div>
              <div className={styles.content}>
                <StarsReview key={activeProduct.id} {...displayedProduct} />
              </div>
            </div>
          </div>
          <div
            className={clsx(
              styles.buttons,
              viewportMode !== 'mobile' &&
                viewportMode !== 'tablet' &&
                styles.buttonsAnimation
            )}
          >
            <ActionButton
              id={displayedProduct.id}
              favourite={displayedProduct.favourite}
              buttonType={'favourite'}
              dataTooltip='Favourite'
            />
            <ActionButton
              id={displayedProduct.id}
              compare={displayedProduct.compare}
              buttonType={'compare'}
              dataTooltip='Compare'
            />
            {!(viewportMode === 'tablet' || viewportMode === 'mobile') && (
              <ActionButton
                id={displayedProduct.id}
                buttonType={'quickView'}
                dataTooltip='Quick View'
                productData={displayedProduct}
                onClickFunction={setModal}
              />
            )}
            <ActionButton
              id={displayedProduct.id}
              buttonType={'addToCart'}
              dataTooltip='Add to cart'
              name={displayedProduct.name}
              price={displayedProduct.price}
              source={displayedProduct.source}
              onClickFunction={setAlert}
            />
          </div>
        </div>
        <div className={clsx('row g-0 m-2 justify-content-between', styles.slider)}>
          <button
            className={clsx('col-1', styles.arrowButton)}
            onClick={() => leftAction()}
          >
            &#60;
          </button>
          <div className={clsx('col mx-3', fadeSlider ? 'fadeIn' : 'fadeOut')}>
            <div className={clsx('row')}>
              {productsToDisplay
                .slice(activePage * columns, (activePage + 1) * columns)
                .map(product => (
                  <div
                    key={product.name}
                    className={clsx('col-md-2 col-3 px-1', styles.thumbnail)}
                    onClick={() => handleProductChange(product)}
                  >
                    <img
                      alt={product.name}
                      src={product.source}
                      className={clsx(
                        product.id === activeThumbnail.id && styles.active
                      )}
                    />
                  </div>
                ))}
            </div>
          </div>
          <button
            className={clsx('col-1', styles.arrowButton)}
            onClick={() => rightAction()}
          >
            <span>&#62;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default RacketsGallery;

import React from 'react';
import styles from './RacketsGallery.module.scss';
import { useState } from 'react';
import {
  getFeaturedProducts,
  getProductById,
  getSaleOffProducts,
  getTopRatedProducts,
  getTopSellerProducts,
} from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import StarsReview from '../StarsReview/StarsReview';
import ActionButton from '../ActionButton/ActionButton';
import { useEffect } from 'react';
import { getViewportMode } from '../../../redux/viewportModeRedux';
import Swipeable from '../Swipeable/Swipeable';
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
        return getFeaturedProducts(state);
      case 'Sale Off':
        return getSaleOffProducts(state);
      case 'Top Seller':
        return getTopSellerProducts(state);
      case 'Top Rated':
        return getTopRatedProducts(state);
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
      setActiveProduct(productsToDisplay[0]);
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
    handlePageChange(activePage === 0 ? pagesCount - 1 : activePage - 1);
  };
  const rightAction = () => {
    handlePageChange(activePage + 1 >= pagesCount ? 0 : activePage + 1);
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
              <a
                className={clsx(headline === activeHeadline && styles.active)}
                onClick={() => handleHeadlineChange(headline)}
              >
                {headline}
              </a>
            </li>
          ))}
        </ul>
        <div
          className={clsx(
            'row g-0 align-items-center',
            styles.photo,
            fadeImage ? styles.fadeIn : styles.fadeOut
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
                <p className={styles.oldPrice}>
                  {currency.sign}
                  {(displayedProduct.oldPrice * currency.multiplier).toFixed(2)}
                </p>
              </div>
              <div className={styles.content}>
                <StarsReview {...displayedProduct} />
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
            <ActionButton
              id={displayedProduct.id}
              buttonType={'quickView'}
              dataTooltip='Quick View'
              productData={displayedProduct}
              onClickFunction={setModal}
            />
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
        <Swipeable leftAction={leftAction} rightAction={rightAction}>
          <div className={clsx('row g-0 m-2 justify-content-between', styles.slider)}>
            <a
              className={clsx('col-1', styles.arrowButton)}
              onClick={() =>
                handlePageChange(activePage === 0 ? pagesCount - 1 : activePage - 1)
              }
            >
              &#60;
            </a>
            <div
              className={clsx('col mx-3', fadeSlider ? styles.fadeIn : styles.fadeOut)}
            >
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
            <a
              className={clsx('col-1', styles.arrowButton)}
              onClick={() =>
                handlePageChange(activePage + 1 >= pagesCount ? 0 : activePage + 1)
              }
            >
              <span>&#62;</span>
            </a>
          </div>
        </Swipeable>
      </div>
    </div>
  );
};
export default RacketsGallery;

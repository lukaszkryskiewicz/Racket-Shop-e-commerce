import clsx from 'clsx';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';

const ProductDetails = () => {
  const { productId } = useParams();
  const [fadeImage, setFadeImage] = useState(false);
  const [fadeSlider, setFadeSlider] = useState(true);

  return (
    <div className={styles.root}>
      <div className={clsx('container', styles.productDetails)}>
        <div className={clsx('row', styles.mainRow)}>
          <div className={clsx('col-5', styles.photoSection)}>
            <div
              className={clsx(
                'row g-0 align-items-center',
                styles.photo,
                fadeImage ? styles.fadeIn : styles.fadeOut
              )}
            >
              <img src='/images/racket/badminton/badminton-racket-1.webp' />
            </div>
            <div className={clsx('row g-0 m-2 justify-content-between', styles.slider)}>
              <a
                className={'col-1 ' + styles.arrowButton}
                /*      onClick={() =>
                     handlePageChange(activePage === 0 ? pagesCount - 1 : activePage - 1)
                   } */
              >
                &#60;
              </a>
              <div
                className={clsx(
                  'col mx-3',
                  fadeSlider ? styles.fadeIn : styles.fadeOut
                )}
              >
                <div className={clsx('row')}>
                  {/*      {productsToDisplay
                    .slice(activePage * columns, (activePage + 1) * columns)
                    .map(product => ( */}
                  <div
                    /* key={product.name} */
                    className={clsx('col-lg-2 col-md-4 col-3 px-1', styles.thumbnail)}
                    /* onClick={() => handleProductChange(product)} */
                  >
                    <img
                    /*    alt={product.name}
                       src={product.source} */
                    /* className={
                      product.id === activeThumbnail.id ? styles.active : null
                    } */
                    />
                  </div>
                  {/*    ))} */}
                </div>
              </div>
              <a
                className={clsx('col-1', styles.arrowButton)}
                /*       onClick={() =>
                      handlePageChange(activePage + 1 >= pagesCount ? 0 : activePage + 1)
                    } */
              >
                <span>&#62;</span>
              </a>
            </div>
          </div>
          <div className={clsx('col-7', styles.infoSection)}>test2</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

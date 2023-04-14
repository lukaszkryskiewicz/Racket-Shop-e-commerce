import clsx from 'clsx';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';

const ProductDetails = () => {
  const { productId } = useParams();
  const [fadeImage, setFadeImage] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const product = useSelector(state => getProductById(state, productId))
  const pictureNumber = 4;
  const handlePhotoChange = (number) => {
    setFadeImage(false);
    setTimeout(() => {
      setActiveImage(number);
      setFadeImage(true);
    }, 400);
  };

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
            > <p className={styles.photoOverlay}>Picture {activeImage}</p>
              <img alt={product.name} src={product.source} />
            </div>
            <div className={clsx('row g-0 m-2 justify-content-between', styles.slider)}>
              <a
                className={'col-1 ' + styles.arrowButton}
                onClick={() =>
                  handlePhotoChange(activeImage === 0 ? pictureNumber - 1 : activeImage - 1)}
              >
                &#60;
              </a>
              <div
                className={clsx('col mx-3')}>
                <div className={clsx('row', styles.thumbnailsContainer)}>
                  {[...Array(pictureNumber)].map((item, i) => (
                    <div
                      key={i}
                      className={clsx('col-lg-2 col-md-4 col-3 px-1', styles.thumbnail)}
                      onClick={() => handlePhotoChange(i)}
                    >
                      <img
                        alt={product.name}
                        src={product.source}
                        className={
                          i === activeImage ? styles.active : null
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <a
                className={clsx('col-1', styles.arrowButton)}
                onClick={() => handlePhotoChange(activeImage === pictureNumber - 1 ? 0 : activeImage + 1)}
              >
                <span>&#62;</span>
              </a>
            </div>
          </div>
          <div className={clsx('col-7', styles.infoSection)}>
            <div className={clsx('row', styles.headerRow)}>
              <div className={styles.title}>
                <h1>{product.name}</h1>
              </div>
              <div className={styles.review}>
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className={styles.stars}>
                    {i <= product.stars ? (
                      <FontAwesomeIcon icon={faStar}>{i} stars</FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon icon={farStar}>{i} stars</FontAwesomeIcon>
                    )}
                  </span>
                ))}
                <p className={styles.reviewCall}>(0 reviews)</p>
                <Link to={`/product/${product.id}/review`}>
                  <Button variant='outline'>Add your review</Button>
                </Link>
              </div>
            </div>
            <div className={clsx('row', styles.priceRow)}>
              test</div>
            <div className={clsx('row', styles.buttonsRow)}>
              test</div>
            <div className={clsx('row', styles.overviewRow)}>
              test</div>
            <div className={clsx('row', styles.infoRow)}>
              test</div>
            <div className={clsx('row', styles.socialRow)}>
              test</div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProductDetails;

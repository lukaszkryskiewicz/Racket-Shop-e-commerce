import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { HashLink as Link } from 'react-router-hash-link';
import { getCurrency } from '../../../redux/currencyRedux';
import Button from '../../common/Button/Button';
import ActionButton from '../../common/ActionButton/ActionButton';
import {
  faFacebook,
  faTwitter,
  faPinterest,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import Alert from '../../common/Alert/Alert';
import StarsReviewBasic from '../../common/StarsReviewBasic/StarsReviewBasic';

const ProductDetails = ({ productData }) => {
  const { productId } = useParams();
  const productOnSite = useSelector(state => getProductById(state, productId));
  const [fadeImage, setFadeImage] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [alert, setAlert] = useState({ status: false, type: 'success' });
  const currency = useSelector(getCurrency);
  const product = productData || productOnSite;

  const pictureNumber = 4;
  const handlePhotoChange = number => {
    setFadeImage(false);
    setTimeout(() => {
      setActiveImage(number);
      setFadeImage(true);
    }, 400);
  };

  const socialMedia = [
    { name: 'Facebook', icon: faFacebook },
    { name: 'Instagram', icon: faInstagram },
    { name: 'Twitter', icon: faTwitter },
    { name: 'Pinterest', icon: faPinterest },
    { name: 'LinkedIn', icon: faLinkedinIn },
  ];

  const handleQuantityChange = e => {
    e.preventDefault();
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setProductQuantity(newQuantity);
    }
  };

  const incrementQuantity = e => {
    e.preventDefault();
    if (productQuantity < 10) {
      setProductQuantity(productQuantity + 1);
    }
  };

  const decrementQuantity = e => {
    e.preventDefault();
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  return (
    <div className={styles.root}>
      {alert.status && (
        <Alert
          closeAlert={setAlert}
          id={product.id}
          quantity={productQuantity}
          type={alert.type}
        />
      )}
      <div className={clsx('container', styles.productDetails)}>
        <div className={clsx('row', styles.mainRow)}>
          <div className={clsx('col-lg-5 col-md-12', styles.photoSection)}>
            <div
              className={clsx(
                'row g-0 align-items-center',
                styles.photo,
                fadeImage ? 'fadeIn' : 'fadeOut'
              )}
            >
              {' '}
              <p className={styles.photoOverlay}>Picture {activeImage}</p>
              <img alt={product.name} src={product.source} />
            </div>
            <div className={clsx('row g-0 m-2 justify-content-between', styles.slider)}>
              <a
                className={'col-1 ' + styles.arrowButton}
                onClick={() =>
                  handlePhotoChange(
                    activeImage === 0 ? pictureNumber - 1 : activeImage - 1
                  )
                }
              >
                &#60;
              </a>
              <div className={clsx('col mx-3')}>
                <div className={clsx('row', styles.thumbnailsContainer)}>
                  {[...Array(pictureNumber)].map((item, i) => (
                    <div
                      key={i}
                      className={clsx('col-3 px-1', styles.thumbnail)}
                      onClick={() => handlePhotoChange(i)}
                    >
                      <img
                        alt={product.name}
                        src={product.source}
                        className={i === activeImage ? styles.active : null}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <a
                className={clsx('col-1', styles.arrowButton)}
                onClick={() =>
                  handlePhotoChange(
                    activeImage === pictureNumber - 1 ? 0 : activeImage + 1
                  )
                }
              >
                <span>&#62;</span>
              </a>
            </div>
          </div>
          <div className={clsx('col-lg-7 col-md-12', styles.infoSection)}>
            <div className={clsx('row', styles.headerRow)}>
              <div className={styles.title}>
                <h1>{product.name}</h1>
              </div>
              <div className={clsx(styles.review)}>
                <div>
                  <StarsReviewBasic {...product} />
                  <p className={clsx(styles.reviewsNumber)}>
                    ({product.reviews ? product.reviews.length : 0} reviews)
                  </p>
                </div>
                <Link
                  className={clsx(styles.reviewCallButton)}
                  to={`/product/${product.id}#reviews`}
                >
                  Add your review
                </Link>
              </div>
            </div>
            <div className={clsx('row', styles.priceRow)}>
              <div className={clsx(styles.priceValue)}>
                {product.oldPrice && (
                  <div className={clsx(styles.oldPrice)}>
                    {currency.sign}{' '}
                    {(product.oldPrice * currency.multiplier).toFixed(2)}
                  </div>
                )}
                <div className={clsx(styles.price)}>
                  <Button className={styles.button} variant='small'>
                    {currency.sign} {(product.price * currency.multiplier).toFixed(2)}
                  </Button>
                </div>
              </div>
            </div>
            <div className={clsx('row', styles.buttonsRow)}>
              <div className={styles.outlines}>
                <ActionButton
                  id={product.id}
                  buttonType={'addToCart'}
                  name={product.name}
                  price={product.price}
                  source={product.source}
                  buttonStyle='primary'
                  quantity={productQuantity}
                  onClickFunction={setAlert}
                >
                  Add To Cart
                </ActionButton>
                <ActionButton
                  id={product.id}
                  favourite={product.favourite}
                  buttonType={'favourite'}
                />
                <ActionButton
                  id={product.id}
                  compare={product.compare}
                  buttonType={'compare'}
                />
                <ActionButton buttonType={'mail'} id={product.id}></ActionButton>
              </div>
              <div className={styles.quantity}>
                <span>Quantity: </span>
                <Button
                  variant='outline'
                  className={styles.amountControls}
                  onClick={decrementQuantity}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <input
                  className={styles.amountInput}
                  onChange={e => handleQuantityChange(e)}
                  value={productQuantity}
                />
                <Button
                  variant='outline'
                  className={styles.amountControls}
                  onClick={incrementQuantity}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            </div>
            <div className={clsx('row', styles.overviewRow)}>
              <p className={styles.overviewTitle}>Quick Overview</p>
              <div>{product.overview}</div>
            </div>
            <div className={clsx('row', styles.infoRow)}>
              <div>
                <p>
                  <span>availability: </span>
                  {product.quantity > 0
                    ? 'In Stock (' + product.quantity + ')'
                    : 'Currently not available'}
                </p>
              </div>
              <div>
                <p className='m-0'>
                  <span>category: </span>
                  {product.category}
                </p>
              </div>
            </div>
            <div className={clsx('row d-none d-lg-block', styles.socialRow)}>
              <div className={styles.social}>
                {socialMedia.map(socialMedium => (
                  <Link
                    key={socialMedium.name}
                    className={`${styles.media} ${styles.outline}`}
                    to='/'
                    onClick={e => {
                      e.preventDefault();
                      window.open('https://www.' + socialMedium.name + '.com/');
                    }}
                  >
                    <Button variant='outline' className={styles.media}>
                      <FontAwesomeIcon icon={socialMedium.icon} /> {socialMedium.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

ProductDetails.propTypes = {
  closeModal: PropTypes.bool,
  productData: PropTypes.object,
};

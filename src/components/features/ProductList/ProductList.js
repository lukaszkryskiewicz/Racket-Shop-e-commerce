import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import { getCurrency } from '../../../redux/currencyRedux';
import Button from '../../common/Button/Button';
import ActionButton from '../../common/ActionButton/ActionButton';
//import StarsReview from '../../common/StarsReview/StarsReview';
import Alert from '../../common/Alert/Alert';


const ProductList = ({ productsToRender }) => {
  const currency = useSelector(getCurrency);
  const [alert, setAlert] = useState(false);



  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={clsx(styles.productListContainer)}>
          {productsToRender.map(product => (
            <div key={product.name} className={clsx('row', styles.productListRow)}>
              {alert && <Alert closeAlert={setAlert} id={product.id} />}
              <div className={clsx('col-4')}>
                <div className={styles.productPhoto}>
                  <NavLink to={'/product/' + product.id}>
                    <img src={product.source} alt={product.name} />
                  </NavLink>
                </div>
              </div>
              <div className={clsx('col-8', styles.productInfo)}>
                <div className={clsx('row', styles.headerRow)}>
                  <div className={styles.title}>
                    <NavLink to={'/product/' + product.id}>
                      <h1>{product.name}</h1>
                    </NavLink>
                  </div>
                  <div className={clsx(styles.review)}>
                    <div>
                      {/*                   <StarsReview noTitle id={product.id} stars={product.stars} myStars={product.myStars} name={product.name}/> */}
                      {[1, 2, 3, 4, 5].map(i => (
                        <span key={i} className={clsx(styles.stars)}>
                          {i <= product.stars ? (
                            <FontAwesomeIcon icon={faStar}>{i} stars</FontAwesomeIcon>
                          ) : (
                            <FontAwesomeIcon icon={farStar}>{i} stars</FontAwesomeIcon>
                          )}
                        </span>
                      ))}
                      <p className={clsx(styles.reviewsNumber)}>(0 reviews)</p>
                    </div>
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
                      <Button noLink className={styles.button} variant='small'>
                        {currency.sign} {(product.price * currency.multiplier).toFixed(2)}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className={clsx('row', styles.overviewRow)}>
                  <div>{product.overview}</div>
                </div>
                <div className={clsx('row', styles.buttonsRow)}>
                  <div className={styles.outlines}>
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
                    <Button
                      variant='outline'
                      className={clsx(styles.button, 'm-1')}
                    // onClick={handleQuestionClick}
                    >
                      <FontAwesomeIcon icon={faEnvelope}>Ask question</FontAwesomeIcon>
                    </Button>
                    <ActionButton
                      id={product.id}
                      buttonType={'addToCart'}
                      name={product.name}
                      price={product.price}
                      source={product.source}
                      buttonStyle='primary'
                      onClickFunction={setAlert}
                    >
                      Add To Cart
                    </ActionButton>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ProductList;

ProductList.propTypes = {
  productsToRender: PropTypes.array,
};
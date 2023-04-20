import React from 'react';
// import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { getAllProducts } from '../../../redux/productsRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { getCurrency } from '../../../redux/currencyRedux';
import Button from '../../common/Button/Button';
import ActionButton from '../../common/ActionButton/ActionButton';
import StarsReview from '../../common/StarsReview/StarsReview';


const ProductList = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const currency = useSelector(getCurrency)

  const allProduct = useSelector(getAllProducts)
const product = allProduct[0]


  return (
    <div className={styles.root}>
      <div className='container'>
      <div className={clsx(styles.productListContainer)}>
        <div className={clsx('row', styles.productListRow)}>
          <div className={clsx('col-4')}>
            <div className={styles.productPhoto}>
            <img src={product.source} alt={product.name}/>
            </div>
          </div>
          <div className={clsx('col-8', styles.productInfo)}>
             <div className={clsx('row', styles.headerRow)}>
              <div className={styles.title}>
                <h1>{product.name}</h1>
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
                >
                  Add To Cart
                </ActionButton>
              </div>
             
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

// ProductList.propTypes = {};

export default ProductList;

import React from 'react';
import styles from './CompareModalProduct.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import StarsReviewBasic from '../../../common/StarsReviewBasic/StarsReviewBasic';
import Button from '../../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { toggleProductCompare } from '../../../../redux/productsRedux';
import { HashLink as Link } from 'react-router-hash-link';

const CompareModalProduct = ({ product, closeModal }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleProductCompare(product.id));
  };

  const handleMovingToProductPage = () => {
    closeModal(false);
  };

  return (
    <div className={clsx(product.id === 'title-col' ? 'col-auto' : 'col', styles.root)}>
      <div className={clsx(styles.productColumn)} key={product.id}>
        <div className={clsx(styles.productTitleRow)}>
          <h3 className={clsx(styles.productTitle)}>{product.name}</h3>
        </div>
        <div className={clsx(styles.productImageRow)}>
          {product.source && (
            <div className={clsx(styles.productPhoto)}>
              <img alt={product.name} src={product.source} />
            </div>
          )}
        </div>
        <div className={styles.infoSection}>
          <div className={styles.name}>
            <p>{product.manufacturer}</p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.color}>
            <p>{product.color.join(', ')}</p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.rating}>
            {product.rating === 'rating' ? (
              'rating'
            ) : (
              <StarsReviewBasic {...product} noAction />
            )}
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.price}>
            <p>{product.price}</p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.productLink}>
            {product.id === 'title-col' ? (
              <p>Link</p>
            ) : (
              <Link
                to={'/product/' + product.id + '#'}
                onClick={handleMovingToProductPage}
              >
                {product.name}
              </Link>
            )}
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.deleteCompare}>
            {product.id === 'title-col' ? (
              <p>Delete product</p>
            ) : (
              <Button onClick={handleClick} variant='main' className={styles.button}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CompareModalProduct.propTypes = {
  product: PropTypes.object,
  closeModal: PropTypes.func,
};

export default CompareModalProduct;

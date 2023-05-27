import React from 'react';
import styles from './ProductExtendedInfo.module.scss';
import clsx from 'clsx';
/* import PropTypes from 'prop-types'; */
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import ProductReviews from '../ProductReviews/ProductReviews';

const ProductExtendedInfo = () => {
  const { productId } = useParams();
  const product = useSelector(state => getProductById(state, productId));

  return (
    <div className={styles.root}>
      <div className={'container ' + styles.container}>
        <div className={styles.box}>
          <div className={'row ' + styles.menu}>
            <div className={'col-2 ' + styles.menuText}>
              <p>description</p>
            </div>
            <div
              id='review'
              className={clsx('col-2 ' + styles.menuText, styles.active)}
            >
              <p>reviews({product.reviews ? product.reviews.length : 0})</p>
            </div>
            <div className={'col-2 ' + styles.menuText}>
              <p>specification</p>
            </div>
            <div className={'col-2 ' + styles.menuText}>
              <p>custom tab</p>
            </div>
          </div>
          <ProductReviews {...product} />
        </div>
      </div>
    </div>
  );
};

/* ProductExtendedInfo.propTypes = {

}; */

export default ProductExtendedInfo;

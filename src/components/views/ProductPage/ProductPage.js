import React from 'react';
import styles from './ProductPage.module.scss';
import ProductReview from '../../features/ProductReview/ProductReview';
import NewProduct from '../../features/NewProduct/NewProductContainer';

const ProductPage = () => {
  return (
    <div className={styles.root}>
      <ProductReview />
      <NewProduct productsOnDesktop={8} />
    </div>
  );
};

// ProductPage.propTypes = {};

export default ProductPage;

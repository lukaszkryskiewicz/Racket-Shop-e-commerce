import React from 'react';
import styles from './ProductPage.module.scss';
import ProductReview from '../../features/ProductReview/ProductReview';
import NewProduct from '../../features/NewProduct/NewProductContainer';
import ProductDetails from '../../features/ProductDetails/ProductDetails';

const ProductPage = () => {
  return (
    <div className={styles.root}>
      <ProductDetails />
      <ProductReview />
      <NewProduct productsOnDesktop={8} />
    </div>
  );
};

// ProductPage.propTypes = {};

export default ProductPage;

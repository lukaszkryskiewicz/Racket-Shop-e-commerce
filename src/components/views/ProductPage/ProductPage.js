import React from 'react';
import styles from './ProductPage.module.scss';
import ProductExtendedInfo from '../../features/ProductExtendedInfo/ProductExtendedInfo';
import NewProducts from '../../features/NewProducts/NewProducts';
import ProductDetails from '../../features/ProductDetails/ProductDetails';

const ProductPage = () => {
  return (
    <div className={styles.root}>
      <ProductDetails />
      <ProductExtendedInfo id='#review' />
      <NewProducts productsOnDesktop={4} />
    </div>
  );
};

// ProductPage.propTypes = {};

export default ProductPage;

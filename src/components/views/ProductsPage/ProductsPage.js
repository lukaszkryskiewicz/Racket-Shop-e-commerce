import React from 'react';
import styles from './ProductsPage.module.scss';
import ProductsPageLayout from '../../layout/ProductsPageLayout/ProductsPageLayout';

const ProductsPage = () => {
  return (
    <div className={styles.root}>
      <ProductsPageLayout />
    </div>
  );
};
export default ProductsPage;

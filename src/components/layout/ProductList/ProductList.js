import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import clsx from 'clsx';
import ProductRow from '../../common/ProductRow/ProductRow';


const ProductList = ({ productsToRender }) => {


  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={clsx(styles.productListContainer)}>
          {productsToRender.map(product => (
            <div key={product.name} className={clsx('row', styles.productListRow)}>
              <ProductRow {...product} />
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
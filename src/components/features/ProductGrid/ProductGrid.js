import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductGrid.module.scss';
import ProductBox from '../../common/ProductBox/ProductBox';

const ProductGrid = ({ productsToRender }) => {

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.gridContainer}>
          <div className={`row`}>
            {productsToRender.length > 0 &&
              productsToRender
                .map(product => (
                  <div key={product.id} className={'col-lg-4 col-md-6 col-12'}>
                    <ProductBox {...product} />
                  </div>
                ))}
            {productsToRender.length === 0 && <div>No results</div>}
          </div>
        </div>
      </div>
    </div>
  );
};



export default ProductGrid;


ProductGrid.propTypes = {
  productsToRender: PropTypes.array,
};

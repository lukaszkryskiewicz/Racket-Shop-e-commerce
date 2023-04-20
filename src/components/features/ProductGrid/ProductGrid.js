import React from 'react';
// import PropTypes from 'prop-types';
import styles from './ProductGrid.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProductGrid = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();



  return (
    <div className={styles.root}>
      <div className={styles.gridContainer}>
        
      </div>
    </div>
  );
};

// ProductList.propTypes = {};

export default ProductGrid;

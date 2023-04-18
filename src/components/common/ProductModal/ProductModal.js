import React from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import styles from './ProductModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import ProductDetails from '../../features/ProductDetails/ProductDetails';


const ProductModal = ({ closeModal, productData }) => {

  const handleClick = e => {
    e.preventDefault();
    closeModal(false);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.productModalContainer}>
          <ProductDetails productData={productData} />
          <div className={styles.closeButton}>
            <Button onClick={handleClick} variant='small'>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  closeModal: PropTypes.bool,
  productData: PropTypes.object,
};

export default ProductModal;
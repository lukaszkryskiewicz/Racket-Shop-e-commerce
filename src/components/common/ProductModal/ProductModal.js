import React from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import styles from './ProductModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ProductDetails from '../../features/ProductDetails/ProductDetails';
import clsx from 'clsx';

const ProductModal = ({ closeModal, productData }) => {
  const handleClick = e => {
    e.preventDefault();
    closeModal(false);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div
          className={clsx('col-xl-auto col-sm-8 col-12', styles.productModalContainer)}
        >
          <div className={clsx(styles.closeButton)}>
            <Button className={styles.button} onClick={handleClick}>
              <FontAwesomeIcon className={styles.icon} icon={faTimesCircle} />
            </Button>
          </div>
          <ProductDetails productData={productData} modalView />
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  closeModal: PropTypes.func,
  productData: PropTypes.object,
};

export default ProductModal;

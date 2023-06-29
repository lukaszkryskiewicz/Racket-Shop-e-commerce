import React, { useRef, useEffect } from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import styles from './ProductModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ProductDetails from '../../features/ProductDetails/ProductDetails';
import clsx from 'clsx';
import useOutsideClick from '../../../utils/useOutsideClickHook';
import { useSelector } from 'react-redux';
import { getViewportMode } from '../../../redux/viewportModeRedux';

const ProductModal = ({ closeModal, productData }) => {
  const viewportMode = useSelector(getViewportMode);
  const handleClick = e => {
    e.preventDefault();
    closeModal(false);
  };

  useEffect(() => {
    if (viewportMode === 'tablet' || viewportMode === 'mobile') {
      closeModal(false);
    }
  }, [closeModal, viewportMode]);

  const ref = useRef();
  useOutsideClick(ref, closeModal);

  return (
    <div className={styles.root}>
      <div className='container'>
        <div
          className={clsx('col-xl-auto col-sm-8 col-12', styles.productModalContainer)}
          ref={ref}
        >
          <div className={clsx(styles.closeButton)}>
            <Button className={styles.button} onClick={handleClick}>
              <FontAwesomeIcon className={styles.icon} icon={faTimesCircle} />
            </Button>
          </div>
          <ProductDetails productData={productData} modalView closeModal={closeModal} />
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

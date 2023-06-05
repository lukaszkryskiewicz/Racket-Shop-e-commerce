import React from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import styles from './CompareModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getProductsToCompare } from '../../../redux/productsRedux';
import clsx from 'clsx';


const CompareModal = ({ closeModal }) => {
  const productsToCompare = useSelector(getProductsToCompare);


  const handleClick = e => {
    e.preventDefault();
    closeModal(false);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.compareModalContainer}>
          {productsToCompare.map(product => (
            <div className={clsx('col', styles.productColumn)} key={product.id}>
              <div className={clsx(styles.productHeaderRow)}>
                <h3 className={clsx(styles.productTitle)}>{product.name}</h3>
                <div className={clsx(styles.productPhoto)}>
                  <img alt={product.name} src={product.source} />
                </div>
              </div>
              <div className={styles.infoSection}>
                <div className={styles.name}>
                  <p>{productsToCompare.name}</p>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.closeButton}>
            <Button onClick={handleClick}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

CompareModal.propTypes = {
  closeModal: PropTypes.func,
};

export default CompareModal;
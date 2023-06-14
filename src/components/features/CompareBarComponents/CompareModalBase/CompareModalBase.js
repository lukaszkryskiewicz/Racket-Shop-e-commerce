import React, { useEffect } from 'react';
import Button from '../../../common/Button/Button';
import PropTypes from 'prop-types';
import styles from './CompareModalBase.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getProductsToCompare } from '../../../../redux/productsRedux';
import CompareModalProduct from '../CompareModalProduct/CompareModalProduct';

const CompareModalBase = ({ closeModal }) => {
  const productsToCompare = useSelector(getProductsToCompare);
  const titleCol = [
    {
      id: 'title-col',
      name: 'Name',
      source: null,
      manufacturer: 'brand',
      color: ['color'],
      rating: 'rating',
      price: 'price',
    },
  ];

  useEffect(() => {
    if (productsToCompare.length < 2) {
      closeModal(false);
    }
  }, [closeModal, productsToCompare]);

  const modalArray = titleCol.concat(productsToCompare);

  const handleClick = e => {
    e.preventDefault();
    closeModal(false);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.closeButton}>
          <Button onClick={handleClick}>
            <FontAwesomeIcon className={styles.icon} icon={faTimesCircle} />
          </Button>
        </div>
        <div className={styles.compareModalContainer}>
          {modalArray.map(product => (
            <CompareModalProduct product={product} key={product.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

CompareModalBase.propTypes = {
  closeModal: PropTypes.func,
};

export default CompareModalBase;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import { getCurrency } from '../../../redux/currencyRedux';
import Button from '../../common/Button/Button';
import ActionButton from '../../common/ActionButton/ActionButton';
//import StarsReview from '../../common/StarsReview/StarsReview';
import Alert from '../../common/Alert/Alert';
import ProductRow from '../../common/ProductRow/ProductRow';


const ProductList = ({ productsToRender }) => {
  const currency = useSelector(getCurrency);
  const [alert, setAlert] = useState(false);



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
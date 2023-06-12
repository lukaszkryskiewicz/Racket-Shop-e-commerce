import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ActionButton.module.scss';
import Button from '../Button/Button';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket,
  faExchangeAlt,
  faHeart,
  faEye,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleProductFavourite,
  getProductsToCompare,
  toggleProductCompare,
  updateProductQuantity,
} from '../../../redux/productsRedux';
import { addProduct } from '../../../redux/cartRedux';
import { getProductById } from '../../../redux/productsRedux';
import Modal from '../Modal/Modal';

const ActionButton = ({
  id,
  favourite,
  compare,
  buttonType,
  dataTooltip,
  name,
  source,
  price,
  children,
  buttonStyle,
  buttonVariant,
  productData,
  onClickFunction,
  quantity = 1,
}) => {
  const dispatch = useDispatch();
  const product = useSelector(state => getProductById(state, id));
  const [modal, setModal] = useState(false);

  const handleFavouriteClick = e => {
    e.preventDefault();
    dispatch(toggleProductFavourite(id));

  };

  const compareList = useSelector(state => getProductsToCompare(state));
  const handleCompareClick = e => {
    const checkIfItemIsCompared = compareList.find(item => item.id === id); //check if item is already selected to compare
    e.preventDefault();
    if (compareList.length < 4 || !!checkIfItemIsCompared) {
      //!!checkIfItemIsCompared --> converts result to boolean -> true if item was already selected, and false otherwise
      dispatch(toggleProductCompare(id));
    }
  };


  const handleQuickViewClick = e => {
    e.preventDefault();
    onClickFunction(true);
  };

  const handleAddToCartClick = e => {
    e.preventDefault();
    if (product.quantity >= quantity) {
      onClickFunction({ status: true, type: 'success' });
      dispatch(addProduct({ id, name, source, price, quantity }));
      dispatch(updateProductQuantity({ id, quantity: -quantity }));
    } else {
      onClickFunction({ status: true, type: 'error' });
    }
  };

  const handleMail = e => {
    e.preventDefault();
    setModal(true);

  };

  const getButtonProps = buttonType => {
    switch (buttonType) {
      case 'favourite':
        return {
          name: 'Favourite',
          function: handleFavouriteClick,
          icon: favourite ? faHeart : farHeart,
          active: favourite ? styles.active : null,
        };
      case 'compare':
        return {
          name: 'Compare',
          function: handleCompareClick,
          icon: faExchangeAlt,
          active: compare ? styles.active : null,
        };
      case 'quickView':
        return { name: 'Quick View', function: handleQuickViewClick, icon: faEye };
      case 'addToCart':
        return {
          name: 'Add to cart',
          function: handleAddToCartClick,
          icon: faShoppingBasket,
        };
      case 'mail':
        return {
          name: 'Mail us',
          function: handleMail,
          icon: faEnvelope,
        };
      default:
        return null;
    }
  };

  const buttonProps = getButtonProps(buttonType);
  return (
    <div className={styles.root}>
      {modal && <Modal closeModal={setModal} id={id} />}
      <Button
        variant={buttonVariant || 'outline'}
        className={clsx(buttonStyle === 'primary' ? styles.primaryButtonStyle : null, buttonProps.active, 'm-1')}
        onClick={buttonProps.function}
        data-tooltip={dataTooltip}
      >
        <FontAwesomeIcon icon={buttonProps.icon}>{buttonProps.name}</FontAwesomeIcon>
        {children && <span className={styles.children}>{children}</span>}
      </Button>
    </div>
  );
};

export default ActionButton;

ActionButton.propTypes = {
  id: PropTypes.string,
  favourite: PropTypes.bool,
  compare: PropTypes.bool,
  buttonType: PropTypes.string,
  dataTooltip: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  source: PropTypes.string,
  children: PropTypes.string,
  buttonStyle: PropTypes.string,
  buttonVariant: PropTypes.string,
  productData: PropTypes.object,
  onClickFunction: PropTypes.func,
  quantity: PropTypes.number,
};

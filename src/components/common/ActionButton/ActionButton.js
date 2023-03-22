import React from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleProductFavourite,
  getProductsToCompare,
  toggleProductCompare,
} from '../../../redux/productsRedux';

const ActionButton = ({ id, favourite, compare, buttonType }) => {
  const dispatch = useDispatch();
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
  };

  const handleAddToCartClick = e => {
    e.preventDefault();
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
      default:
        return null;
    }
  };

  const buttonProps = getButtonProps(buttonType);

  return (
    <Button
      variant='outline'
      className={clsx(styles.button, buttonProps.active)}
      onClick={buttonProps.function}
    >
      <FontAwesomeIcon icon={buttonProps.icon}>{buttonProps.name}</FontAwesomeIcon>
    </Button>
  );
};

export default ActionButton;

ActionButton.propTypes = {
  id: PropTypes.string,
  favourite: PropTypes.bool,
  compare: PropTypes.bool,
  buttonType: PropTypes.string,
};

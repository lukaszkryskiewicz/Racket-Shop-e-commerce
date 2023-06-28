import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addMyStars, getProductById } from '../../../redux/productsRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import styles from './StarsReviewBasic.module.scss';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { toast } from 'react-toastify';

const StarsReviewBasic = ({ id, stars, noAction, getStars }) => {
  const centralStars = useSelector(state => getProductById(state, id)).myStars;
  const starsToDisplay = getStars ? 0 : stars ? stars : centralStars;
  const [myStarsState, setMyStarsState] = useState(starsToDisplay ? starsToDisplay : 0);
  const [hoverStars, setHoverStars] = useState(undefined);
  const dispatch = useDispatch();
  const location = useLocation();
  if (location.pathname.includes('/shop')) {
    noAction = true;
  }

  useEffect(() => {
    if (!getStars && !noAction) {
      setMyStarsState(centralStars ? centralStars : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centralStars]);

  const handleClick = (e, clickedStars) => {
    e.preventDefault();
    if (myStarsState === 0 && !noAction) {
      setMyStarsState(clickedStars);
      if (!getStars) {
        dispatch(addMyStars({ id, clickedStars }));
        toast.success('Thank you for the rating!');
      }
    }
    if (getStars) {
      getStars(clickedStars);
    }
  };

  const handleMouseOver = i => {
    if (!noAction) {
      if (myStarsState === 0) {
        setHoverStars(i);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoverStars(undefined);
  };

  const drawProperStar = i => {
    if (myStarsState !== 0 && !location.pathname.includes('/shop')) {
      return myStarsState < i ? farStar : faStar;
    } else if (hoverStars) {
      return hoverStars < i ? farStar : faStar;
    } else {
      return i <= stars ? faStar : farStar;
    }
  };

  const drawStarStyle = i => {
    if (myStarsState !== 0 && !location.pathname.includes('/shop') && !noAction) {
      return styles.hoverStars;
    } else if (hoverStars) {
      return hoverStars < i ? styles.stars : styles.hoverStars;
    } else {
      return styles.stars;
    }
  };

  return (
    <div className={styles.basicStars}>
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} href='#' className={clsx(noAction && styles.noPointer)}>
          <FontAwesomeIcon
            key={i}
            className={drawStarStyle(i)}
            icon={drawProperStar(i)}
            onClick={e => handleClick(e, i)}
            onMouseOver={() => handleMouseOver(i)}
            onMouseLeave={handleMouseLeave}
          >
            {i} stars
          </FontAwesomeIcon>
        </button>
      ))}
    </div>
  );
};

StarsReviewBasic.propTypes = {
  id: PropTypes.string,
  stars: PropTypes.number,
  myStars: PropTypes.number,
  noAction: PropTypes.bool,
  getStars: PropTypes.func,
};

export default StarsReviewBasic;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addMyStars } from '../../../redux/productsRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import styles from './StarsReviewBasic.module.scss';

const StarsReviewBasic = ({ id, stars, myStars, noAction, getStars }) => {
  const [myStarsState, setMyStarsState] = useState(myStars ? myStars : 0);
  const [hoverStars, setHoverStars] = useState(undefined);
  const dispatch = useDispatch();

  const handleClick = (e, clickedStars) => {
    e.preventDefault();
    if (myStarsState === 0 && !noAction) {
      setMyStarsState(clickedStars);
      if (!getStars) {
        dispatch(addMyStars({ id, clickedStars }));
      }
    }
    if (getStars) {
      getStars(clickedStars);
    }
  };

  const handleMouseOver = i => {
    if (myStarsState === 0 && !noAction) {
      setHoverStars(i);
    }
  };

  const handleMouseLeave = () => {
    setHoverStars(undefined);
  };

  const drawProperStar = i => {
    if (myStarsState !== 0) {
      return myStarsState < i ? farStar : faStar;
    } else if (hoverStars) {
      return hoverStars < i ? farStar : faStar;
    } else {
      return i <= stars ? faStar : farStar;
    }
  };

  const drawStarStyle = i => {
    if (myStarsState !== 0) {
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
        <button key={i} href='#'>
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

import React, { useState } from 'react';
import styles from './FilterByColor.module.scss';
import { useDispatch } from 'react-redux';
import { removeFilter, updateFilter } from '../../../redux/filterRedux';


const FilterByColor = () => {
  const dispatch = useDispatch();
  const [activeColor, setActiveColor] = useState([]);

  const colorsArray = ['red', 'black', 'yellow', 'blue', 'white', 'green'];

  const handleClick = color => {
    let newColor = [...activeColor];
    if (newColor.includes(color)) {
      newColor = newColor.filter(item => item !== color);
      setActiveColor(newColor);
    } else {
      newColor.push(color);
      setActiveColor(newColor);
    }
    if (newColor.length > 0) {
      dispatch(updateFilter({ name: 'colorFilter', value: newColor }));
    } else {
      dispatch(removeFilter({ name: 'colorFilter' }));
    }
  };



  return (
    <>
      <div className='container'>
        <div className={styles.root}>
          <div className={styles.title}>
            <h5>Filter by Color</h5>
          </div>
          <div>
            <ul className={styles.colorList}>
              {colorsArray.map(color => (
                <li
                  key={color}
                  className={`d-flex align-items-center + ${activeColor.includes(color) &&
                    styles.active}`}
                  onClick={() => handleClick(color)}
                >
                  <span className={styles[color]}></span>
                  <h4>{color}</h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterByColor;

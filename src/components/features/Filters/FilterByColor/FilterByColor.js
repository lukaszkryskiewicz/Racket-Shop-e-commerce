import React, { useEffect, useState } from 'react';
import styles from './FilterByColor.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFilters, removeFilter, updateFilter } from '../../../../redux/filterRedux';
import Button from '../../../common/Button/Button';


const FilterByColor = () => {
  const dispatch = useDispatch();
  const [activeColor, setActiveColor] = useState([]);
  const productFilters = useSelector(getAllFilters);

  const colorFilter = productFilters.find(filter => filter.name === 'colorFilter');
  useEffect(() => {
    if (colorFilter) {
      setActiveColor(colorFilter.value);
    } else {
      setActiveColor([]);
    }
  }, [colorFilter]);

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
                <li key={color}>
                  <Button className={`d-flex align-items-center + ${activeColor.includes(color) &&
                    styles.active}`}
                  onClick={() => handleClick(color)}>
                    <span className={styles[color]}></span>
                    <h4>{color}</h4>
                  </Button>
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

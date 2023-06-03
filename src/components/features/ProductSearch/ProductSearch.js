import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { changeSearch } from '../../../redux/searchRedux';
import styles from './ProductSearch.module.scss';
import { getAllCategories } from '../../../redux/categoriesRedux';
import { useHistory } from 'react-router-dom';

const ProductSearch = () => {
  const history = useHistory();
  const categories = useSelector(getAllCategories);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();

  /*   useEffect(() => {
      dispatch(changeSearch({ searchText: '', category: undefined }));
    }, [dispatch]); */

  const handleSubmit = e => {
    console.log('test');
    if (searchText.length > 0) {
      e.preventDefault();
      console.log('test2');
      const category = selectedCategory ? selectedCategory.toLowerCase() : undefined;
      dispatch(changeSearch({ searchText, category }));
      setSearchText('');
      setSelectedCategory('');
      history.push('/search');
    } else {
      console.log('test3');
      e.preventDefault();
    }
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.category}>
        <select
          className={styles.selectCategoryList}
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value=''>Select a category</option>
          {categories.map(category => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.searchField}>
        <input
          placeholder='Search products...'
          type='text'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button type='submit' className='m-1'>
          <FontAwesomeIcon className={styles.icon} icon={faSearch} />
        </button>
      </div>
    </form>
  );
};

ProductSearch.propTypes = {
  children: PropTypes.node,
};

export default ProductSearch;

import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { changeSearch } from '../../../redux/searchRedux';
import styles from './ProductSearch.module.scss';
import { getAllCategories } from '../../../redux/categoriesRedux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

const ProductSearch = () => {
  const history = useHistory();
  const categories = useSelector(getAllCategories);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { register, handleSubmit: validate } = useForm();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (searchText.length > 0) {
      const category = selectedCategory ? selectedCategory.toLowerCase() : undefined;
      dispatch(changeSearch({ searchText: searchText.toLowerCase(), category }));
      setSearchText('');
      setSelectedCategory('');
      history.push('/search');
    }
  };

  return (
    <form className={clsx('row', styles.root)} onSubmit={validate(handleSubmit)}>
      <div className={clsx('col-auto', styles.category)}>
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
      <div className={clsx('col-auto', styles.searchField)}>
        <input
          {...register('search', {
            required: true,
          })}
          placeholder='Search products...'
          type='text'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button type='submit'>
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

import React from 'react';
import styles from './Search.module.scss';
import NewProducts from '../../features/NewProducts/NewProducts';
import { useSelector } from 'react-redux';
import { getSearch } from '../../../redux/searchRedux';
import clsx from 'clsx';

const Search = () => {
  const searchInfo = useSelector(getSearch);

  return (
    <div className={styles.root}>
      <div className={clsx('container', styles.searchInfo)}>
        <h3 className={styles.currentSearch}>
          You are looking for products
          {searchInfo.category !== undefined
            ? ' from ' + searchInfo.category.toUpperCase() + ' category '
            : null}
          {searchInfo.searchText !== ''
            ? " with '" + searchInfo.searchText + "' in the product name"
            : null}
          .
        </h3>
        <NewProducts searchedData={searchInfo} productsOnDesktop={8} />
      </div>
    </div>
  );
};

export default Search;

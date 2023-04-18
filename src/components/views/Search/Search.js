import React from 'react';
import styles from './Search.module.scss';
import NewProduct from '../../features/NewProduct/NewProduct';
import { useSelector } from 'react-redux';
import { getAll } from '../../../redux/categoriesRedux';
import { getAllProducts } from '../../../redux/productsRedux';
import { getSearch } from '../../../redux/searchRedux';
import clsx from 'clsx';

const Search = () => {
  const categories = useSelector(getAll);
  const products = useSelector(getAllProducts);
  const searchInfo = useSelector(getSearch);

  return (
    <div className={styles.root}>
      <div className={clsx('container', styles.searchInfo)}>
        <h3 className={styles.currentSearch}>You are looking for products
          {searchInfo.category !== undefined ? ' from ' + searchInfo.category.toUpperCase() + ' category ' : null}
          {searchInfo.searchText !== '' ? ' with \'' + searchInfo.searchText + '\' in the product name' : null}.

        </h3>
        <NewProduct
          categories={categories}
          products={products}
          searchedData={searchInfo}
          productsOnDesktop={8}
        />
      </div>
    </div>
  );

};

export default Search;

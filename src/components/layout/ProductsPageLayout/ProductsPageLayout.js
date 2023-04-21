import React, {useState} from 'react';
import FilterByRating from '../../common/FilterByRating/FilterByRating';
import FilterByColor from '../../common/FilterByColor/FilterByColor';
import styles from './ProductsPageLayout.module.scss';
import Brands from '../../layout/Brands/Brands';
import FilterByPrice from '../../common/FilterByPrice/FilterByPrice';
import Banner from '../../common/Banner/Banner';
import NewProduct from '../../features/NewProduct/NewProductContainer';
import FilterByBrand from '../../common/FilterByBrand/FilterByBrand';
import { useParams } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters } from '../../../redux/filterRedux';
import ProductList from '../../features/ProductList/ProductList';
import ProductGrid from '../../features/ProductGrid/ProductGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSquare } from '@fortawesome/free-solid-svg-icons';
import { getAllProducts } from '../../../redux/productsRedux';

const ProductsPageLayout = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts)
const [productsToDisplay, setProductsToDisplay] = useState(12)
  const [activePage, setActivePage] = useState(0);

  const handlePageChange = newPage => {
    //setFade(false);
  //  setTimeout(() => {
      setActivePage(newPage);
     // setFade(true);
   // }, 400);
  };

  const handleClick = () => {
    dispatch(clearFilters());
  };

  let filteredProducts = products.filter(item => item.category === categoryId)

  let productsToRender = filteredProducts.slice(
    activePage * productsToDisplay,
    (activePage+1) * productsToDisplay
  );

  let pagesCount = Math.ceil(filteredProducts.length / productsToDisplay);

  const dots = [];
  for (let i = 0; i < pagesCount; i++) {
    dots.push(
      <li key={i}>
        <a
          onClick={() => handlePageChange(i)}
          className={i === activePage && styles.active}
        >
          page {i}
        </a>
      </li>
    );
  }


   {/* <div className={`row + ${fade ? styles.fadeIn : styles.fadeOut}`}>
            {productsToRender.length > 0 &&
              productsToRender
                .slice(
                  activePage * productsToDisplay,
                  (activePage + 1) * productsToDisplay
                )
                .map(item => (
                */ } 
  

  return (
    <div className={styles.root}>
      <div className='container'>
        <Banner />
        <div className={`row ${styles.filtered}`}>
          <div className={`col-9 ${styles.productList}`}>
          <div className='row g-0 align-items-end'>
              <div className={'col-md-auto col-12 mb-3 mb-md-0 ' + styles.heading}>
                <h3>{categoryId}</h3>
              </div>
              <div className={'col-md col-12 ' + styles.menu}>
                <div>
                 <div>test</div>
                 <div>            <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon></div>
                </div>
              </div>
              <div className={'col-lg-auto col-12 text-center ' + styles.dots}>
                <ul>{dots}</ul>
              </div>
            </div>
            <ProductList productsToRender={productsToRender}/>
            <ProductGrid productsToRender={productsToRender}/>
{/*             <NewProduct productsOnDesktop={12} categoryId={categoryId} /> */}
          </div>
          <div className={`col-3 ${styles.filters}`}>
            <FilterByBrand categoryId={categoryId} />
            <FilterByPrice categoryId={categoryId} />
            <FilterByRating />
            <FilterByColor />
            <Button variant='small' onClick={handleClick}>
              Clear filters
            </Button>
          </div>
          <div className={`row mt-3 ${styles.brands}`}>
            <Brands />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageLayout;

import React, { useState } from 'react';
import styles from './ProductExtendedInfo.module.scss';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import ProductReviews from '../ProductReviews/ProductReviews';

const ProductExtendedInfo = () => {
  const { productId } = useParams();
  const tabs = ['description', 'reviews', 'specification', 'custom tab'];
  const [activeTab, setActiveTab] = useState('reviews');
  const product = useSelector(state => getProductById(state, productId));

  return (
    <div className={styles.root}>
      <div className={clsx('container', styles.box)}>
        <div className={'row ' + styles.menu}>
          {tabs.map(tab => (
            <div
              className={clsx(
                'col-md-3',
                styles.menuText,
                tab === activeTab && styles.active
              )}
              id={tab}
              key={tab}
            >
              <div onClick={() => setActiveTab(tab)}>
                {tab}{' '}
                {tab === 'reviews' &&
                  product.reviews &&
                  '(' + (product.reviews.length || '0') + ')'}
              </div>
            </div>
          ))}
        </div>
        {activeTab === 'reviews' && <ProductReviews {...product} />}
        {activeTab !== 'reviews' && (
          <div className={clsx(styles.tabsContent)}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductExtendedInfo;

import React from 'react';
import styles from './GalleryAd.module.scss';
import Button from '../Button/Button';
import { useSelector } from 'react-redux';
import { getTopSellerProducts } from '../../../redux/productsRedux';

const GalleryAd = () => {
  const galleryAdProduct = useSelector(getTopSellerProducts).slice(0, 1);

  return (
    <div className={styles.root}>
      <div className={styles.photo}>
        <img alt={galleryAdProduct[0].name} src={galleryAdProduct[0].source} />
      </div>
      <div className={styles.promoText}>
        <p className={styles.text}>
          From <span className={styles.price}>$500.00</span>
        </p>
        <p className={styles.title}>{galleryAdProduct[0].name}</p>
        <Button link={'/product/' + galleryAdProduct[0].id} variant='main' className={styles.button}>
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default GalleryAd;

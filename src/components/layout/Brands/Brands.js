import styles from './Brands.module.scss';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';
import { getAll } from '../../../redux/brandsRedux';

const Brands = () => {
  const brands = useSelector(state => getAll(state));

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1023 },
      items: 4,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 425 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 3,
      slidesToSlide: 3,
    },
  };

  return (
    <div className={styles.root}>
      <div className='container p-3'>
        <div className={styles.carouselContainer}>
          <Carousel
            responsive={responsive}
            infinite={true}
            transition='all .5'
            transitionDuration={300}
            containerClass='carousel-container'
            //itemClass='carousel-item-padding-40-px'
          >
            {brands.map(brand => (
              <div key={brand.id} className={styles.brandContainer}>
                <img
                  key={brand.id}
                  className={styles.brandImage}
                  src={brand.source}
                  alt={brand.brandName}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Brands;

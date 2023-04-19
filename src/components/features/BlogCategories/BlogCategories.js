import React, { useState } from 'react';
import styles from './BlogCategories.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllBlogPosts,
  updateBlogFilter,
  removeBlogFilter,
} from '../../../redux/blogRedux';
import clsx from 'clsx';

const BlogCategories = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getAllBlogPosts);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = posts.reduce((acc, obj) => {
    obj.category.forEach(cat => {
      if (!acc[cat]) {
        acc[cat] = 1;
      } else {
        acc[cat]++;
      }
    });

    return acc;
  }, {});

  const handleClick = postsCategory => {
    if (postsCategory !== activeCategory) {
      setActiveCategory(postsCategory);
      dispatch(updateBlogFilter({ name: 'categoryFilter', value: postsCategory }));
    } else {
      setActiveCategory(null);
      dispatch(removeBlogFilter());
    }
  };

  /*   {Object.keys(brands).map(brand => (
      <li
        key={brand}
        className={`d-flex align-items-center + ${activeBrand ===
          brand && styles.active}`}
        onClick={() => handleClick(brand)}
      >
        <FontAwesomeIcon icon={faAngleRight} />
        <h4>{brand}</h4>
        <span className={styles.number}>{brands[brand]}</span>
      </li>
    ))} */
  return (
    <div className={styles.blogCategoriesContainer}>
      <h5 className={styles.blogCategoriesTitle}>Categories</h5>
      <ul className={styles.blogCategoriesList}>
        {Object.keys(categories).map(category => (
          <li
            key={category}
            className={clsx(
              'd-flex align-items-center',
              styles.blogCategory,
              activeCategory === category && styles.active
            )}
            onClick={() => handleClick(category)}
          >
            <FontAwesomeIcon icon={faFolder} /> <h4>{category}</h4>
            <span className={styles.number}>{categories[category]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;

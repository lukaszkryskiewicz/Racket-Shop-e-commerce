import React from 'react';
import styles from './BlogPosts.module.scss';

import { useSelector } from 'react-redux';
import { getAllBlogPosts, getBlogFilters } from '../../../redux/blogRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFolder, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const BlogPosts = () => {
  const posts = useSelector(state => getAllBlogPosts(state));
  let postsToDisplay = posts.slice().reverse();
  const filters = useSelector(getBlogFilters);
  const overviewTextLength = 300;
  const overviewText = text =>
    text.length > overviewTextLength ? text.slice(0, overviewTextLength) + '...' : text;

  const postSuitsAllFilters = (post, filters) => {
    for (let i = 0; i < filters.length; i++) {
      const checkedFilter = filters[i];
      switch (checkedFilter.name) {
        case 'categoryFilter':
          if (!post.category || !post.category.includes(checkedFilter.value)) {
            return false;
          }
          break;
        default:
          return false;
      }
    }
    return true;
  };

  if (filters.length > 0) {
    postsToDisplay = postsToDisplay.filter(post => postSuitsAllFilters(post, filters));
  }

  return (
    <div className={styles.blogPosts}>
      {postsToDisplay.map(post => (
        <div className={styles.blogPost} key={post.id}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <div className={styles.imageContainer}>
            <img src={post.source} alt={post.title} className={styles.postImage} />
          </div>
          <p className={styles.postText}>{overviewText(post.text)}</p>
          <div className={clsx('row', styles.blogInfoContainer)}>
            <div className={clsx('col-8', styles.postFooter)}>
              <ul className={styles.postFooterIcons}>
                <li>
                  <FontAwesomeIcon icon={faUser} className={styles.icon} />
                  {post.author}
                </li>
                <li>
                  <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
                  {post.date}
                </li>
                <li>
                  <FontAwesomeIcon icon={faFolder} className={styles.icon} />
                  {post.category.map(category => (
                    <span key={category}>
                      {post.category.indexOf(category) !== 0 && ', '}
                      {category}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
            <div className={`col-2 ${styles.readMoreColumn}`}>
              <Link className={styles.link} to={'/blog/' + post.id}>
                Read more...
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;

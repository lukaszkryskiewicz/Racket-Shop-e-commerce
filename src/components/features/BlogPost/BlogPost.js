import React from 'react';
import styles from './BlogPost.module.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getBlogPostById } from '../../../redux/blogRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFolder, faUser } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const BlogPost = ({ blogPostId }) => {
  const post = useSelector(state => getBlogPostById(state, parseInt(blogPostId)));

  return (
    <div className={styles.blogPost}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <div className={styles.imageContainer}>
        <img src={post.source} alt={post.title} className={styles.postImage} />
      </div>
      <p className={styles.postText}>{post.text}</p>
      <div className={clsx('row', styles.postInfoContainer)}>
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
        <div className={`col-2 ${styles.backToBlog}`}>
          <Link className={styles.link} to={'/blog'}>
            Go back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

BlogPost.propTypes = {
  blogPostId: PropTypes.string,
};

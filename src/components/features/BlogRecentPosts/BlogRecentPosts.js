import React from 'react';
import { useSelector } from 'react-redux';
import { getRecentPosts } from '../../../redux/blogRedux';
import { Link } from 'react-router-dom';
import styles from './BlogRecentPosts.module.scss';

const BlogRecentPosts = () => {
  const recentPosts = useSelector(getRecentPosts);
  const reverseRecentPosts = recentPosts.slice().reverse();

  return (
    <div className={styles.recentPostsContainer}>
      <h5 className={styles.recentPostsTitle}>Recent Posts</h5>
      <ul className={styles.postList}>
        {reverseRecentPosts.map(post => (
          <li key={post.id}>
            <Link to={'/blog/' + post.id}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogRecentPosts;

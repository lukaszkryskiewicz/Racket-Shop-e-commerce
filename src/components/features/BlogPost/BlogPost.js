import React from 'react';
import styles from './BlogPost.module.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getBlogPostById } from '../../../redux/blogRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFolder, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../../common/Button/Button';

const BlogPost = ({ blogPostId }) => {
  const post = useSelector(state => getBlogPostById(state, parseInt(blogPostId)));

  return (
    <div className={styles.blogPosts}>
      <div key={post.id}>
        <h2 className={styles.postTitle}>{post.title}</h2>
        <div className={styles.imageContainer}>
          <img src={post.source} alt={post.title} className={styles.postImage} />
        </div>
        <p className={styles.postText}>{post.text}</p>
        <div className={`row ${styles.blogInfoContainer}`}>
          <div className='col-8 p-0'>
            <a>
              <FontAwesomeIcon icon={faUser} className={styles.icon}></FontAwesomeIcon>
              {post.author}
            </a>
            <a>
              <FontAwesomeIcon
                icon={faCalendar}
                className={styles.icon}
              ></FontAwesomeIcon>
              {post.date}
            </a>
            <a>
              <FontAwesomeIcon
                icon={faFolder}
                className={styles.icon}
              ></FontAwesomeIcon>
              {post.category}
            </a>
          </div>
          <div className={`col-4 p-0 ${styles.readMoreColumn}`}>
            <Button link={'/blog'}>Back to Blog</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

BlogPost.propTypes = {
  blogPostId: PropTypes.string,
};

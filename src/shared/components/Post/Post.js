import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Post.scss';

const Post = ({post}) => (
  <article className={styles['article']}>
    <footer className={styles['meta']}>
      <div className={styles['meta_list']}>
        <div className={styles['avatar']}>
          <img src={post.avatar} alt=""/>
        </div>
      </div>
      <div className={styles['meta_list']}>
        <div className={styles['author']}>{post.name}</div>
        <div className={styles['date']}>{post.pubDate}</div>
      </div>
    </footer>
    <h3 className={styles['title']}><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
    <div dangerouslySetInnerHTML={{__html: post.excerpt}} />
  </article>
);

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    pubDate: PropTypes.string.isRequired
  }).isRequired,
}

export default Post;
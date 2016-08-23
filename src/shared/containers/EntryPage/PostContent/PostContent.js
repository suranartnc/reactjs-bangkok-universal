import React, { PropTypes } from 'react'
import styles from './PostContent.scss'

const PostContent = ({post}) => {
  return (
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
      <h3 className={styles['title']}>{post.title}</h3>
      <div className={styles['body']} dangerouslySetInnerHTML={{__html: post.body}} />
    </article>
  )
}

PostContent.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    pubDate: PropTypes.string
  })
}

export default PostContent
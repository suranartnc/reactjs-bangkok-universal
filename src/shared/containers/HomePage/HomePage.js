import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as postActions from 'shared/modules/post/postActions';

import Post from 'shared/components/Post/Post';

class HomePage extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(postActions.getPostLatest())
  }

  render() {
    const { posts } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {posts.map((post, index) => {
              return <Post key={post.id} post={post} />;
            })}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ post }) {
  return {
    posts: post.latest
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.array
  })).isRequired
}

export default connect(mapStateToProps)(HomePage);
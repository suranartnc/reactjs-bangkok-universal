import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import * as postActions from 'shared/modules/post/postActions';

import PostContent from './PostContent/PostContent';

class EntryPage extends Component {

  static prefetchData = [
    (params) => postActions.getPostById(params.id)
  ]

  componentDidMount() {
    const { dispatch, params: { id } } = this.props
    dispatch(postActions.getPostById(id));
  }

  render() {
    const { post } = this.props;
    return (
      <div className="container">
        <Helmet title={post.title} />
        <div className="row">
          <div className="col-sm-12">
            <PostContent post={post} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ post }) {
  return {
    post: post.active
  }
}

EntryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string
  }).isRequired
}

export default connect(mapStateToProps)(EntryPage);
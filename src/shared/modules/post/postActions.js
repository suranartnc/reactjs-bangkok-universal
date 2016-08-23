import * as actionTypes from 'shared/modules/post/actionTypes';

export function getPostLatest(limit = 20) {
  return {
    type: actionTypes.POST_GET_LATEST,
    request: {
      path: `/posts?_limit=${limit}`
    }
  };
}

export function getPostById(id) {
  return {
    type: actionTypes.POST_GET_BY_ID,
    request: {
      path: `/posts/${id}`
    }
  };
}
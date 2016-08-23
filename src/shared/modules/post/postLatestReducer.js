import * as actionTypes from './actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case actionTypes.POST_GET_LATEST:
      return action.data;
    default:
      return state;
  }
  return state;
}
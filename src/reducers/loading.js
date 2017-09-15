import { SET_LOADING } from '../actions/';

let cloneObject = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let newState = { 
  loading: true,
  currentSection: 'itemsManager'
};

export default function user(state = newState, action) {
  switch (action.type) {
    case SET_LOADING:
      newState = cloneObject(state);
      newState.loading = action.loading;
      return newState
    default:
      return state || newState;
  }
};
import * as Immutable from 'immutable';
import { actionConstants } from './actions';

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null,
};

export default function {{name.capital}}State(state = initialState, action) {
  const immutableState = Immutable.Map(state);
  switch (action.type) {
    case actionConstants.LOAD_{{name.uppercase}}_REQUEST:
      return immutableState
        .set('isLoading', true)
        .set('error', null)
        .toJS();
    case actionConstants.LOAD_{{name.uppercase}}_SUCCESS:
      return immutableState
        .set('payload', action.payload)
        .set('lastFetched', action.meta.lastFetched)
        .set('isLoading', false)
        .toJS();
    case actionConstants.LOAD_{{name.uppercase}}_FAILURE:
      return immutableState
        .set('error', action.payload)
        .toJS();
    default:
      return state;
  }
}

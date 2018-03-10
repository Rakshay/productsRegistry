import * as events from '../actions/actionEvents';

/**
 *
 *
 * @export
 * @param {Array} [state=[]] the current list state
 * @param {object} action the current redux action object
 * @returns {Array} Returns new list state
 */
export function items (state = [], action) {
  let actionType = action.type;

  if (actionType === events.SET_ITEMS && action.payload instanceof Array) {
    return action.payload;
  }

  return state;
}

export default {
  items
};

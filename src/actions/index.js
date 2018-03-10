/** This provides the various redux actions to trigger app state changes by the redux reducer
 * @module Redux actions
 */

import * as dataRequests from './dataRequests';
import * as events from './actionEvents';

/**
 *
 *
 * @export
 * @param {Array} items The list of items to be added to the store
 * @returns {Object} redux action object
 */
export function setItems (items) {
  return {
    type: events.SET_ITEMS,
    payload: items
  };
}

/**
 * Fetches the items from the store
 *
 * @export
 * @returns {function} - A function consumable by the redux-thunk middleware to fetch items
 */
export function fetchItems () {
  return function (dispatch) {
    dataRequests.fetchItems()
      .then((items) => {
        dispatch(setItems(items));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

/**
 * Deletes the item (which matches the provided id) from the store
 *
 * @export
 * @param {string} id id of the item to be deleted
 * @returns {function} A function consumable by the redux-thunk middleware to delete item
 */
export function deleteItem (id) {
  return function (dispatch) {
    dataRequests.deleteItem(id)
      .then(() => {
        return dataRequests.fetchItems();
      })
      .then((items) => {
        dispatch(setItems(items));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

/**
 * Edits the item (which matches the provided id) in the store
 *
 * @export
 * @param {string} id id of the item to be edited
 * @param {string} description description of the item
 * @param {bool} isComplete status of the item
 * @returns {function} A function consumable by the redux-thunk middleware to edit item
 */
export function editItem (id, productName, productQuantity, productPrice) {
  return function (dispatch) {
    dataRequests.editItem(id, productName, productQuantity, productPrice)
      .then(() => {
        return dataRequests.fetchItems();
      })
      .then((items) => {
        dispatch(setItems(items));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

/**
 * Adds the item to the store
 *
 * @export
 * @param {string} description description of the item
 * @returns {function} A function consumable by the redux-thunk middleware to edit item
 */
export function addItem (productName, productQuantity, productPrice) {
  return function (dispatch) {
    dataRequests.addItem(productName, productQuantity, productPrice)
      .then(() => {
        return dataRequests.fetchItems();
      })
      .then((items) => {
        dispatch(setItems(items));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

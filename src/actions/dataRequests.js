import uuid from 'uuid';

const itemsKey = 'Items';

/**
 * Fetches the list of items from local storage
 *
 * @returns {array} The list of items
 */
const fetchItemsFromStore = () => {
  let items = localStorage.getItem(itemsKey);

  if (items !== undefined && items !== null) {
    items = JSON.parse(items);
  } else {
    items = []
  }

  return items;
};

/**
 * Updates the items in the localstorage
 *
 * @param {string} [items='']
 */
const updateStore = (items = '') => {
  if (items !== undefined) {
    items = JSON.stringify(items);
  }

  localStorage.setItem(itemsKey, items);
};

/**
 * Adds items to the store
 *
 * @export
 * @param {string} productName productName of the item
 * @param {number} productQuantity productQuantity of the item
 * @param {number} productPrice productPrice of the item
 * @returns {function} A promise that adds the item to the data store
 */
export function addItem (productName, productQuantity, productPrice) {
  return new Promise((resolve, reject) => {
    let items = fetchItemsFromStore(),
        item = {
          id: uuid.v4(),
          productName,
          productQuantity,
          productPrice
        };

    items.push(item);

    updateStore(items);

    resolve(item);
  });
}

/**
 * Updates the item in  the store
 *
 * @export
 * @param {string} id id of the item to be edited
 * @param {string} productName productName of the item
 * @param {number} productQuantity productQuantity of the item
 * @param {number} productPrice productPrice of the item
 * @returns {function} A promise that edits the item in the data store
 */
export function editItem (id, productName, productQuantity, productPrice) {
  return new Promise((resolve, reject) => {
    let items = fetchItemsFromStore(),
        item = items.find((datum) => {
          return datum.id === id;
        });

    item.productName = productName;
    item.productQuantity = productQuantity;
    item.productPrice = productPrice;

    updateStore(items);

    resolve(true);
  });
}

/**
 * Deletes the item from the store
 *
 * @export
 * @param {string} id id of the item to be deleted
 * @returns {function} A promise that deletes the item in the data store
 */
export function deleteItem (id) {
  return new Promise((resolve, reject) => {
    let items = fetchItemsFromStore(),
        newItems = items.filter((datum) => {
          return datum.id !== id;
        });

        updateStore(newItems);

    resolve(true);
  });
}

/**
 * Fetxhes items from the store
 *
 * @export
 * @returns {function} A promise that fetces items from the data store
 */
export function fetchItems () {
  return new Promise((resolve, reject) => {
    resolve(fetchItemsFromStore());
  });
}

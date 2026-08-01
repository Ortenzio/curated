/**
 *
 * @param {Array} items - array of objects
 * @param {string | Function} field - name of object field to group the content by
 * @param {boolean} [asObject=false] - optional return the data as an object
 * @param {string} outliersGroup - capture any items in array with empty or null groupBy field name.
 *
 * @returns {Array | object} - depends on asObject flag
 */
export function groupBy (items = [], field = '', asObject = false) {
  const obj = {};

  const isFunc = (typeof field === 'function');

  items.forEach((item) => {
    const key = isFunc ? field(item) : (item[field]);
    if (!obj[key]) {
      obj[key] = { key, items: []};
    }
    obj[key].items.push(item);
  });

  return asObject ? obj : Object.values(obj);
}

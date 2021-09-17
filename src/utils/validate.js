/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0

  return str !== undefined && str.trim().length > 0
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUrl(str) {
  return /^((https\:\/\/)|(http\:\/\/)[0-9a-zA-Z\-\_]+\.\w+)/i.test(str)
}

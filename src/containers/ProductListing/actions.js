/*
 *
 * ProductListing actions
 *
 */

import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @param  {object} searchObj The search object that comes from the view
 *
 * @return {object} An action object with a type of GET_PRODUCTS
 */
export function searchProducts(searchObj) {
  return {
    type: GET_PRODUCTS,
    searchObj
  };
}

/**
 * Dispatched when the products are loaded by the request saga
 *
 * @param  {array} products The products that were returned after filtering
 * 
 * @return {object} An action object with a type of LOAD_REPOS_SUCCESS passing the products
 */
export function searchProductsSuccess(products) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    products
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_PRODUCTS_ERROR passing the error
 */
export function searchProductsError(error) {
  return {
    type: GET_PRODUCTS_ERROR,
    error
  };
}
/*
 *
 * ProductListing actions
 *
 */

import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from './constants';

export function searchProducts() {
  return {
    type: GET_PRODUCTS
  };
}

export function searchProductsSuccess() {
  return {
    type: GET_PRODUCTS
  };
}
export function searchProductsFailure() {
  return {
    type: GET_PRODUCTS
  };
}
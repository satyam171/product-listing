/**
 * Gets the products from the dummy api
 */

import queryString from 'query-string'; 
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_PRODUCTS } from './constants';
import { searchProductsSuccess, searchProductsError } from './actions';

import request from '../../utils/request';

import { push } from 'connected-react-router'

/**
 * Products request/response handler
 */

const likeMapper = {
  search : 'productName_like',
  color : 'color_like',
  adjective : 'productAdjective_like',
  material : 'productMaterial_like',
}

function getQueryString(filterObj){
  let parsedQuery = {};
  let newUrlQuery = {};
  // constructing the action query object from the one received from state 
  for (const key in filterObj) {
      const element = filterObj[key];
      if(element && element !== "None"){ // checking if it's not ''
        parsedQuery[likeMapper[key]] = element;
        newUrlQuery[key] = element; 
      }
  }
  return {
    parsedQuery : queryString.stringify(parsedQuery), 
    newUrlQuery : queryString.stringify(newUrlQuery)
  }
}

export function* fetchProducts(action) {
  
  const {parsedQuery, newUrlQuery} = getQueryString(action.searchObj); 
  const requestURL = `https://json-fake-server.herokuapp.com/products?${parsedQuery}`;

  try {
    // push the new url here
    yield put(push(`${action.location.pathname}?${newUrlQuery}`))
    // Call our request helper (see 'utils/request')
    const products = yield call(request, requestURL);
    yield put(searchProductsSuccess(products));
  } catch (err) {
    yield put(searchProductsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* intiateProductFetch() {
  // Watches for GET_PRODUCTS actions and calls fetchProducts when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_PRODUCTS, fetchProducts);
}
/*
 *
 * ProductListing reducer
 *
 */
import produce from 'immer';
import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS, GET_PRODUCTS_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  products: []
};

/* eslint-disable default-case, no-param-reassign */
const productListingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PRODUCTS:
        draft.loading = true;
        draft.error = false;
        break;

      case GET_PRODUCTS_SUCCESS:
        draft.loading = false;
        draft.products = action.products;
        draft.error = false; 
        break;

      case GET_PRODUCTS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default productListingReducer;

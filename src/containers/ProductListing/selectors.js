import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productListing state domain
 */

const selectProductListingDomain = state =>
  state.productListingReducer || initialState;

/**
 * Other specific selectors
 */

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

  const makeSelectLoading = () =>
  createSelector(
    selectProductListingDomain,
    productsState => productsState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectProductListingDomain,
    productsState => productsState.error,
  );

const makeSelectProducts = () =>
  createSelector(
    selectProductListingDomain,
    productsState => productsState.products,
  );  

/**
 * Default selector used by ProductListing
 */

const makeSelectProductListing = () =>
  createSelector(
    selectProductListingDomain,
    substate => substate,
  );

export default makeSelectProductListing;
export { 
  selectProductListingDomain,
  makeSelectLocation,
  makeSelectLoading,
  makeSelectProducts, 
  makeSelectError
};

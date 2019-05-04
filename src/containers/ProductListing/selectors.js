import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productListing state domain
 */

const selectProductListingDomain = state =>
  state.productListing || initialState;

/**
 * Other specific selectors
 */

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
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
export { selectProductListingDomain, makeSelectLocation };

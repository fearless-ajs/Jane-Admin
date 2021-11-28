import { createSelector } from "reselect";

const selectRouting = state => state.routing;

export const selectCurrentRoute = createSelector(
  [selectRouting],
  routing => routing.currentRoute
);
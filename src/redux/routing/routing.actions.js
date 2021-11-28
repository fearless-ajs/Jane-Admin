import { RoutingActionTypes } from "./routing.types";

export const setCurrentRoute = route => ({
   type: RoutingActionTypes.SET_CURRENT_ROUTE,
   payload: route
});


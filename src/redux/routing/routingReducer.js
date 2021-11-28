import { RoutingActionTypes } from "./routing.types";
const INITIAL_STATE = {
    currentRoute: null,
}

const routingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RoutingActionTypes.SET_CURRENT_ROUTE:
            return {
                ...state,
                currentRoute: action.payload
            }
        default:
            return state;
    }
}

export default routingReducer;
import { SettingActionTypes } from "./setting.types";
const INITIAL_STATE = {
    currentSetting: null,
    currentRouteMountStatus: false,
}

const settingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SettingActionTypes.SET_CURRENT_SETTING:
            return {
                ...state,
                currentSetting: action.payload
            }
        case SettingActionTypes.SET_ROUTE_MOUNT_STATUS:
            return {
                ...state,
                currentRouteMountStatus: action.payload
            }
        case SettingActionTypes.SET_SETTING_UPLOAD_PROGRESS:
            return {
                ...state,
                currentProgress: action.payload
            }
        default:
            return state;
    }
}

export default settingReducer;
import { SettingActionTypes } from "./setting.types";

export const setCurrentSetting = setting => ({
   type: SettingActionTypes.SET_CURRENT_SETTING,
   payload: setting
});

export const setSettingUploadProgress = percentage => ({
   type: SettingActionTypes.SET_SETTING_UPLOAD_PROGRESS,
   payload: percentage
});

export const setRouteMountStatus = status => ({
   type: SettingActionTypes.SET_ROUTE_MOUNT_STATUS,
   payload: status
});

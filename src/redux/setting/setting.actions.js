import { SettingActionTypes } from "./setting.types";
export const setCurrentSetting = setting => ({
   type: SettingActionTypes.SET_CURRENT_SETTING,
   payload: setting
});

export const setSettingUploadProgress = percentage => ({
   type: SettingActionTypes.SET_SETTING_UPLOAD_PROGRESS,
   payload: percentage
});

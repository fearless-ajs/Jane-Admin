import { createSelector } from "reselect";

const selectSetting = state => state.setting;

export const selectCurrentSetting = createSelector(
  [selectSetting],
  setting => setting.currentSetting
);
import { UPDATE_RATIO } from "./types";

export const updateRatio = (data, name) => ({
  type: UPDATE_RATIO,
  data,
  name
});

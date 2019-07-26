import { UPDATE_VIEWPORT } from "./types";

export const updateViewPort = (numColView, numRowView) => ({
  type: UPDATE_VIEWPORT,
  numColView,
  numRowView
});

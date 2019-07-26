import { UPDATE_VIEWPORT } from "../actions/types";

const initialState = {
  numberColumns: 15,
  numColView: 5,
  numRowView: 3
};

export default function(state = initialState, action) {
  // check for which action
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return {
        ...state,
        numColView: action.numColView,
        numRowView: action.numRowView
      };

    default:
      return state;
  }
}

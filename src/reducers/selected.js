import { UPDATE_SELECTION, UPDATE_AREAS } from "../actions/types";

const initialState = {
  areas: []
};

export default function(state = initialState, action) {
  // check for which action
  switch (action.type) {
    case UPDATE_SELECTION:
      return {
        ...state,
        areas: [...state.areas, action.data]
      };
    case UPDATE_AREAS:
      return {
        ...state,
        areas: action.data
      };
    default:
      return state;
  }
}

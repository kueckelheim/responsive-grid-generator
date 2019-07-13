import { UPDATE_RATIO } from "../actions/types";

const initialState = {
  numberColumns: 15,
  ratioRows: 10,
  ratioCols: 15
};

export default function(state = initialState, action) {
  // check for which action
  switch (action.type) {
    case UPDATE_RATIO:
      return {
        ...state,
        [action.name]: action.data
      };
    default:
      return state;
  }
}

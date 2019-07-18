// import { UPDATE_RATIO, UPDATE_RATIO2 } from "../actions/types";

const initialState = {
  numberColumns: 15
};

export default function(state = initialState, action) {
  // check for which action
  switch (action.type) {
    // case UPDATE_RATIO:
    //   return {
    //     ...state,
    //     [action.name]: action.data
    //   };
    // case UPDATE_RATIO2:
    //   return {
    //     ...state,
    //     ratioCols: action.width,
    //     ratioRows: action.height
    //   };
    default:
      return state;
  }
}

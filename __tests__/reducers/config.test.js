import { UPDATE_VIEWPORT } from "../../src/actions/types.js";
import config from "../../src/reducers/config.js";

const initialState = {
  numberColumns: 15,
  numColView: 5,
  numRowView: 3
};

describe("Config Reducer", () => {
  it("should return default state", () => {
    const newState = config(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it("should return new state if receiving action-type UPDATE_VIEWPORT", () => {
    const newState = config(initialState, {
      type: UPDATE_VIEWPORT,
      numColView: 1,
      numRowView: 7
    });
    expect(newState).toEqual({
      numberColumns: 15,
      numColView: 1,
      numRowView: 7
    });
  });
});

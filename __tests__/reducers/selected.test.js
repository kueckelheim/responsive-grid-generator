import { UPDATE_SELECTION, UPDATE_AREAS } from "../../src/actions/types.js";
import selected from "../../src/reducers/selected.js";

const initialState = {
  areas: []
};

describe("Selection Reducer", () => {
  it("should return default state", () => {
    const newState = selected(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it("should return new state if receiving action-type UPDATE_SELECTION", () => {
    const area = {
      selectedElements: [1, 2, 3],
      rows: [1, 2, 3],
      columns: [1, 2, 3],
      name: "testArea",
      color: "red"
    };
    const newState = selected(initialState, {
      type: UPDATE_SELECTION,
      data: area
    });
    expect(newState).toEqual({ areas: [...initialState.areas, area] });
  });

  it("should return new state if receiving action-type UPDATE_AREAS", () => {
    const areas = [
      {
        selectedElements: [1, 2, 3],
        rows: [1, 2, 3],
        columns: [1, 2, 3],
        name: "testArea",
        color: "red"
      },
      {
        selectedElements: [1, 2, 3],
        rows: [1, 2, 3],
        columns: [1, 2, 3],
        name: "testArea",
        color: "red"
      }
    ];
    const newState = selected(initialState, {
      type: UPDATE_AREAS,
      data: areas
    });
    expect(newState).toEqual({ areas: areas });
  });
});

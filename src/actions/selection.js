import { UPDATE_SELECTION, UPDATE_AREAS } from "./types";

export const updateSelection = (indexes, name, numberColumns) => {
  const colors = [
    "lightblue",
    "LimeGreen",
    "LightCoral",
    "LightSeaGreen",
    "Violet",
    "Orange",
    "Tomato",
    "Gold"
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];

  // include rows here. get nr of columns from function call
  const rows = indexes.map(y => {
    const z = y / numberColumns;
    if (Number.isInteger(z)) {
      return z + 1;
    } else {
      return Math.ceil(z);
    }
  });
  const columns = indexes.map(
    y => Math.round(((y / numberColumns) % 1) * numberColumns) + 1
  );

  const newArea = {
    selectedElements: indexes,
    rows,
    columns,
    name: name,
    color: color
  };

  return { type: UPDATE_SELECTION, data: newArea };
};

export const updateAreas = data => ({ type: UPDATE_AREAS, data });

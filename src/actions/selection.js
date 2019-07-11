import { UPDATE_SELECTION, UPDATE_AREAS } from "./types";

export const updateSelection = (indexes, name) => {
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

  const newArea = {
    selectedElements: indexes,
    name: name,
    color: color
  };

  return { type: UPDATE_SELECTION, data: newArea };
};

export const updateAreas = data => ({ type: UPDATE_AREAS, data });

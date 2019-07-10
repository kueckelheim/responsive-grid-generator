import { UPDATE_SELECTION } from "./types";

export const updateSelection = data => {
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
    selectedElements: data,
    color: color
  };

  return { type: UPDATE_SELECTION, data: newArea };
};

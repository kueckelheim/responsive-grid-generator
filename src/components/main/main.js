import React from "react";
import "./main.scss";

import Grid from "./grid/grid.js";
import Show from "./show/show.js";

class Main extends React.PureComponent {
  render() {
    // make number of columns dependent on viewport width
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;

    var gridWidth = 96 + "vw";
    var gridHeight = 110 + "vw";
    if (viewportWidth > 1000) {
      gridWidth = 46 + "vw";
      gridHeight = 70 + "vw";
    }

    return (
      <div className="main">
        <div
          className="gridContainer"
          style={{ width: gridWidth, height: gridHeight }}
        >
          <Grid gridWidth={gridWidth} />
        </div>
        <div className="showContainer" style={{ width: gridWidth }}>
          <Show width={gridWidth} />
        </div>
      </div>
    );
  }
}

export default Main;

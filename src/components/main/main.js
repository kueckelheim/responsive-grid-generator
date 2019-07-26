import React from "react";
import "./main.scss";

import Grid from "./grid/grid.js";
import Show from "./show/show.js";

class Main extends React.PureComponent {
  render() {
    // make number of columns dependent on viewport width
    // const viewportWidth =
    //   window.innerWidth || document.documentElement.clientWidth;

    return (
      <div className="main">
        <div className="gridContainer">
          <Grid />
        </div>
        <div className="showContainer">
          <Show />
        </div>
      </div>
    );
  }
}

export default Main;

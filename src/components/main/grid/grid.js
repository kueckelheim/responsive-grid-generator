import React from "react";
import "./grid.scss";

import Selectable from "./selectable.js";
import Overlay from "./overlay.js";
import ViewSelect from "./viewSelect.js";

class Grid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
    this.state = {
      numCol: 10,
      numRow: 10
    };
  }

  // save width and height in state
  componentDidMount = () => {
    // set up state according to parent size
    const rect = this.selector.current.getBoundingClientRect();
    // cols and rows should have 40x40px
    // identify number of cols and rows
    const numCol = Math.floor(rect.width / 40);
    const numRow = Math.floor(rect.height / 40);
    // update state
    this.setState({
      numCol,
      numRow
    });
  };
  render() {
    return (
      <div className="grid">
        <div className="gridContainer" ref={this.selector}>
          <Selectable numCol={this.state.numCol} numRow={this.state.numRow} />
          <Overlay numCol={this.state.numCol} numRow={this.state.numRow} />
          <ViewSelect numCol={this.state.numCol} numRow={this.state.numRow} />
        </div>
      </div>
    );
  }
}

export default Grid;

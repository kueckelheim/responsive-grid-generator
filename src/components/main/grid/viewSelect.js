import React from "react";
import "./viewSelect.scss";

import { Resizable } from "re-resizable";

import { connect } from "react-redux";

import { updateViewPort } from "../../../actions/config.js";

class ViewSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
    this.state = {
      widthTop: 5 * 40 - 3,
      heightLeft: 40 * 3 - 3,
      initialized: false
    };
  }

  handleResizeTop = d => {
    // get width of current selector
    var widthTop = this.state.widthTop;
    // then adjust with selection-deltas
    widthTop = widthTop + d.width;
    // see how many cols would fit
    const numCols = Math.ceil(widthTop / 40);
    // round up width
    widthTop = numCols * 40 - 3;
    // update in state
    this.setState({
      widthTop
    });
    // update viewport in store
    this.props.updateViewPort(numCols, this.props.numRowView);
  };
  handleResizeLeft = d => {
    // get height of current selector
    var heightLeft = this.state.heightLeft;
    // then adjust with selection-deltas
    heightLeft = heightLeft + d.height;
    // see how many rows would fit
    const numRows = Math.ceil(heightLeft / 40);
    // round up height
    heightLeft = numRows * 40 - 3;
    // update in state
    this.setState({
      heightLeft
    });
    // update viewport in store
    this.props.updateViewPort(this.props.numColView, numRows);
  };

  componentDidUpdate = () => {
    // inital viewport size = 65% of numCol and 40% of numRow
    if (!this.state.initialized) {
      const widthTop = Math.round(this.props.numCol * 0.65) * 40 - 3;
      const heightLeft = Math.round(this.props.numRow * 0.4) * 40 - 3;
      // update state with selector width + height
      this.setState({ widthTop, heightLeft, initialized: true });
      // update store with viewport cols and rows
      this.props.updateViewPort(
        Math.round(this.props.numCol * 0.65),
        Math.round(this.props.numRow * 0.4)
      );
    }
  };

  render() {
    return (
      <div className="viewSelect">
        <div className="top">
          <Resizable
            size={{
              width: this.state.widthTop,
              height: 15
            }}
            enable={{
              top: false,
              right: true,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false
            }}
            onResizeStop={(e, direction, ref, d, event) => {
              this.handleResizeTop(d);
            }}
          >
            <div className="topTool" />
          </Resizable>
        </div>
        <div className="left">
          <Resizable
            size={{
              width: 15,
              height: this.state.heightLeft
            }}
            enable={{
              top: false,
              right: false,
              bottom: true,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false
            }}
            onResizeStop={(e, direction, ref, d, event) => {
              this.handleResizeLeft(d);
            }}
          >
            <div className="leftTool" />
          </Resizable>
        </div>
        <div
          className="lineVertical"
          style={{
            left: this.state.widthTop + 2,
            height: this.props.numRow * 40
          }}
        />
        <div
          className="lineHorizontal"
          style={{
            top: this.state.heightLeft + 2,
            width: this.props.numCol * 40
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  numColView: state.config.numColView,
  numRowView: state.config.numRowView
});
export default connect(
  mapStateToProps,
  { updateViewPort }
)(ViewSelect);

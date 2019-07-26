import React from "react";
import "./show.scss";

// import ShowCase from "./showCase.js";

import { Resizable } from "re-resizable";

class Show extends React.PureComponent {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
    this.state = {
      widthParent: 0,
      heightParent: 0,
      ratio: "17:10",
      ratioCols: 17,
      ratioRows: 10,
      widthCurrent: 0,
      heightCurrent: 0
    };
  }
  componentDidMount = () => {
    // set up state according to parent size
    const rect = this.selector.current.getBoundingClientRect();
    // calculate inital ShowCase size
    this.updateSize(
      this.state.ratioCols,
      this.state.ratioRows,
      rect.width,
      rect.height
    );
    // update state
    this.setState({
      widthParent: rect.width,
      heightParent: rect.height
    });
  };

  onChange = e => {
    // update ratio in state
    const value = e.target.value;
    const name = e.target.name;
    if (name === "ratioRows") {
      this.setState({ ratioRows: value });
    } else this.setState({ ratioCols: value });
    // update width and height in state
    var widthParent = this.state.widthParent;
    var heightParent = this.state.heightParent;
    // adjust for updated row/column. not updated in state yet
    if (name === "ratioRows") {
      this.updateSize(this.state.ratioCols, value, widthParent, heightParent);
    } else {
      this.updateSize(value, this.state.ratioRows, widthParent, heightParent);
    }
    this.setState({ ratio: "" });
  };

  handleResizeStop = d => {
    // get width and height of current rectangle
    var width = this.state.widthCurrent;
    var height = this.state.heightCurrent;
    // then adjust with selection-deltas
    width = width + d.width;
    height = height + d.height;

    // update ratio and sizes in store
    this.setState({
      ratio: "",
      ratioCols: width,
      ratioRows: height,
      widthCurrent: width,
      heightCurrent: height
    });
  };

  handleSelection = e => {
    // get selected value
    const ratio = e.target.value;
    // only options with values selectable
    if (ratio !== "") {
      // split at double point
      var ratioSplit = ratio.split(":");
      // calculate widthCurrent and heightCurrent with selected ratio
      this.updateSize(
        ratioSplit[0],
        ratioSplit[1],
        this.state.widthParent,
        this.state.heightParent
      );
      // update state
      this.setState({
        ratio,
        ratioCols: ratioSplit[0],
        ratioRows: ratioSplit[1]
      });
    }
  };

  updateSize = (ratioCols, ratioRows, widthParent, heightParent) => {
    // create a rectangle fitting respective ratio without leaving the original rectangle borders
    var height = widthParent / (ratioCols / ratioRows);
    var width = widthParent;
    if (height > heightParent) {
      height = heightParent;
      width = height * (ratioCols / ratioRows);
    }
    this.setState({ widthCurrent: width, heightCurrent: height });
  };

  render() {
    const style = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "solid 1px #ddd",
      background: "#f0f0f0"
    };

    return (
      <div className="show">
        <div className="container">
          <div className="boxContainer">
            <h2>View:</h2>
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
          </div>
          <div className="ratioContainer">
            <div className="container">
              <h2>Ratio:</h2>
              <select
                name="ratio"
                id="ratio"
                value={this.state.ratio}
                onChange={this.handleSelection}
              >
                <option value="">select</option>
                <option value="17:10">17:10 (Large Screen)</option>
                <option value="10:15">10:15 (Laptop)</option>
                <option value="15:11">15:11 (IPad)</option>
                <option value="13:7">13:7 (Galaxy S6)</option>
              </select>
            </div>
            <div className="container">
              <input
                type="number"
                min="1"
                onChange={this.onChange}
                value={this.state.ratioCols}
                name="ratioCols"
              />
              X
              <input
                type="number"
                min="1"
                onChange={this.onChange}
                value={this.state.ratioRows}
                name="ratioRows"
              />
            </div>
          </div>
        </div>
        {/* Include Resizable Component */}
        {/* <div
          className="resizable"
          style={{
            width: this.props.width,
            height:
              "calc(" +
              this.props.width +
              "*" +
              this.props.config.ratioRows / this.props.config.ratioCols +
              ")"
          }}
          ref={this.selector}
        >
          <ShowCase width={this.props.width} />
        </div> */}
        <div
          className="resizable"
          ref={this.selector}
          style={{
            display: "flex",
            justifyContent: "center"
            // width: this.props.width
          }}
        >
          <Resizable
            size={{
              width: this.state.widthCurrent,
              height: this.state.heightCurrent
            }}
            style={style}
            onResizeStop={(e, direction, ref, d, event) => {
              this.handleResizeStop(d);
            }}
            // bounds={"parent"}
          />
        </div>
      </div>
    );
  }
}

export default Show;

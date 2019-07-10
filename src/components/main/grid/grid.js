import React from "react";
import "./grid.scss";
import Selection from "react-ds";

import Overlay from "./overlay.js";

import { connect } from "react-redux";
import { updateSelection } from "../../../actions/selection.js";
import PropTypes from "prop-types";

class Grid extends React.PureComponent {
  static propTypes = {
    areas: PropTypes.array.isRequired
  };

  constructor() {
    super();

    this.state = {
      ref: null,
      elRefs: []
    };
  }

  handleSelection = indexes => {
    // get all selected elements
    var selectedElements = this.props.areas.map(x => x.selectedElements);
    // merges array of arrays
    selectedElements = [].concat.apply([], selectedElements);
    // check if selection includes already selected elements. If not, save new selection to store
    if (!selectedElements.some(x => indexes.includes(x))) {
      this.props.updateSelection(indexes);
    }
    return null;
  };

  addElementRef = ref => {
    const elRefs = this.state.elRefs;
    elRefs.push(ref);
    this.setState({
      elRefs
    });
  };

  renderSelection() {
    if (!this.state.ref || !this.state.elRefs) {
      return null;
    }
    return (
      <Selection
        target={this.state.ref}
        elements={this.state.elRefs}
        onSelectionChange={this.handleSelection}
      />
    );
  }

  render() {
    // https://codepen.io/michellebarker/post/building-an-aspect-ratio-css-grid-layout
    // make number of columns dependent on viewport width
    var viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;

    var gridWidth = 99 + "vw";
    if (viewportWidth > 1000) {
      gridWidth = 50 + "vw";
    }

    const numberColumns = 15;

    const gridStyle = {
      gridTemplateColumns: "repeat(" + numberColumns + ", 1fr)",
      gridTemplateRows: "repeat(" + numberColumns + ", 1fr)",
      gridAutoRows: gridWidth + "/" + numberColumns
    };

    return (
      <div className="gridContainer" style={{ width: gridWidth }}>
        <div
          className="grid"
          ref={ref => {
            // this setState call requires pureComponent (shallow comparison)
            this.setState({ ref });
          }}
          style={gridStyle}
        >
          {Array.from(Array(numberColumns * numberColumns).keys()).map(
            index => (
              <div className="gridItem" key={index} ref={this.addElementRef} />
            )
          )}
          {this.renderSelection()}
        </div>
        <Overlay numberColumns={numberColumns} gridStyle={gridStyle} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  areas: state.selected.areas
});

export default connect(
  mapStateToProps,
  { updateSelection }
)(Grid);

import React from "react";
import "./grid.scss";
import Selection from "react-ds";

import Overlay from "./overlay.js";

import { connect } from "react-redux";
import { updateSelection } from "../../../actions/selection.js";
import { updateColumns } from "../../../actions/config.js";
import PropTypes from "prop-types";

class Grid extends React.PureComponent {
  static propTypes = {
    areas: PropTypes.array.isRequired
    // numberColumns: PropTypes.number.isRequired
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
      // generate name for new area
      const name = "area" + (this.props.areas.length + 1);
      this.props.updateSelection(
        indexes,
        name,
        this.props.config.numberColumns
      );
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
    const numberColumns = this.props.config.numberColumns;

    // https://codepen.io/michellebarker/post/building-an-aspect-ratio-css-grid-layout
    const gridStyle = {
      gridTemplateColumns: "repeat(" + numberColumns + ", 1fr)",
      gridTemplateRows: "repeat(" + Math.round(numberColumns * 1.3) + ", 1fr)",
      gridAutoRows: this.props.gridWidth + "/" + numberColumns
    };

    return (
      <React.Fragment>
        <div
          className="grid"
          ref={ref => {
            // this setState call requires pureComponent (shallow comparison)
            this.setState({ ref });
          }}
          style={gridStyle}
        >
          {Array.from(
            Array(numberColumns * Math.round(numberColumns * 1.3)).keys()
          ).map(index => (
            <div className="gridItem" key={index} ref={this.addElementRef} />
          ))}
          {this.renderSelection()}
        </div>
        <Overlay numberColumns={numberColumns} gridStyle={gridStyle} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  areas: state.selected.areas,
  config: state.config
});

export default connect(
  mapStateToProps,
  { updateSelection, updateColumns }
)(Grid);

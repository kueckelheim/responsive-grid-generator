import React from "react";
import "./selectable.scss";

import Selection from "react-ds";

import { connect } from "react-redux";
import { updateSelection } from "../../../actions/selection.js";

class Selectable extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      ref: null,
      elRefs: []
    };
  }

  // add accessible grid item ref
  addElementRef = ref => {
    const elRefs = this.state.elRefs;
    elRefs.push(ref);
    this.setState({
      elRefs
    });
  };

  handleSelection = indexes => {
    // get all selected elements
    var selectedElements = this.props.areas.map(x => x.selectedElements);
    // merges array of arrays
    selectedElements = [].concat.apply([], selectedElements);
    // check if selection includes already selected elements. If not, save new selection to store
    if (!selectedElements.some(x => indexes.includes(x))) {
      // generate name for new area
      const name = "area" + (this.props.areas.length + 1);
      this.props.updateSelection(indexes, name, this.props.numCol);
    }
    return null;
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
    // style the grid
    const gridStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(" + this.props.numCol + ", 40px)",
      gridTemplateRows: "repeat(" + this.props.numRow + ", 40px)"
    };

    return (
      <div
        className="selection"
        data-test="selection"
        ref={ref => {
          // this setState call requires pureComponent (shallow comparison)
          this.setState({ ref });
        }}
        style={gridStyle}
      >
        {/* Add numCol * numRow grid items and assign them an accessible ref */}
        {Array.from(Array(this.props.numCol * this.props.numRow).keys()).map(
          index => (
            <div className="gridItem" key={index} ref={this.addElementRef} />
          )
        )}
        {this.renderSelection()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  areas: state.selected.areas,
  config: state.config
});

export default connect(
  mapStateToProps,
  { updateSelection }
)(Selectable);

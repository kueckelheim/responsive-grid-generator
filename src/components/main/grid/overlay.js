import React from "react";
import "./grid.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateAreas } from "../../../actions/selection.js";

class Overlay extends React.PureComponent {
  static propTypes = {
    areas: PropTypes.array.isRequired
  };

  handleClose = evt => {
    // get area name/id that has to be removed
    const name = evt.currentTarget.dataset.name;
    // get areas
    var areas = [...this.props.areas];
    // get index of area with the respective name
    const names = areas.map(x => x.name);
    const index = names.findIndex(x => x === name);
    // remove respective area from areas-array
    areas.splice(index, 1);
    // update store / call reducer
    this.props.updateAreas(areas);
  };
  onChange = e => {
    // get index of area
    const index = e.target.name;
    // copy of areas
    var areas = [...this.props.areas];
    // change name
    areas[index].name = e.target.value;
    // update store
    this.props.updateAreas(areas);
  };

  render() {
    const areas = this.props.areas;

    var overlayItems;
    // if selection has been made, create overlayItems
    if (areas.length > 0) {
      // for each selected area one overlayItem
      overlayItems = areas.map((x, index) => {
        // get row numbers
        const rows = x.selectedElements.map(y => {
          const z = y / this.props.numberColumns;
          if (Number.isInteger(z)) {
            return z + 1;
          } else {
            return Math.ceil(z);
          }
        });
        // get column numbers
        const columns = x.selectedElements.map(
          y =>
            Math.round(
              ((y / this.props.numberColumns) % 1) * this.props.numberColumns
            ) + 1
        );
        // style the new overlayItem
        const overlayItemStyle = {
          display: "initial",
          gridRowStart: Math.min(...rows),
          gridRowEnd: Math.max(...rows) + 1,
          gridColumnStart: Math.min(...columns),
          gridColumnEnd: Math.max(...columns) + 1,
          background: x.color
        };
        return (
          <div className="overlayItem" style={overlayItemStyle} key={index}>
            <div
              className="close"
              onClick={this.handleClose}
              data-name={x.name}
            />
            <input
              name={index}
              component="input"
              type="text"
              index={index}
              onChange={this.onChange}
              value={this.props.areas[index].name}
            />
          </div>
        );
      });
    }

    return (
      <div className="overlay" style={this.props.gridStyle}>
        {overlayItems}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  areas: state.selected.areas
});

export default connect(
  mapStateToProps,
  { updateAreas }
)(Overlay);

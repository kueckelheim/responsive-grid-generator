import React from "react";
import "./grid.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Overlay extends React.PureComponent {
  static propTypes = {
    areas: PropTypes.array.isRequired
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
          <div className="overlayItem" style={overlayItemStyle} key={index} />
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

export default connect(mapStateToProps)(Overlay);

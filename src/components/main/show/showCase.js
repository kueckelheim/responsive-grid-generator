import React from "react";
import "./showCase.scss";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class ShowCase extends React.PureComponent {
  static propTypes = {
    areas: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired
  };

  render() {
    var showCaseStyle, gridItems;
    //  replace later with config value
    const ratio = this.props.config.ratioRows / this.props.config.ratioCols;
    // if selection has been made, create gridSystem
    if (this.props.areas.length > 0) {
      // number of columns = maximum selected column - minimum
      // get total selected columns and rows
      var totalColumns = this.props.areas.map(x => x.columns);
      var totalRows = this.props.areas.map(x => x.rows);
      // merge array of arrays
      totalColumns = [].concat.apply([], totalColumns);
      totalRows = [].concat.apply([], totalRows);
      // get minimums and maximums
      var maxCol = Math.max(...totalColumns);
      var maxRow = Math.max(...totalRows);
      var minCol = Math.min(...totalColumns);
      var minRow = Math.min(...totalRows);
      // get number of columns and rows
      const numberCols = maxCol - minCol + 1;
      const numberRows = maxRow - minRow + 1;
      // https://codepen.io/michellebarker/post/building-an-aspect-ratio-css-grid-layout
      showCaseStyle = {
        gridTemplateColumns: "repeat(" + numberCols + ", 1fr)",
        // height depends on ratio
        gridTemplateRows:
          "repeat(" + numberRows + ", " + 100 / (numberCols * ratio) + "%  )"
      };
      // generate and style grid items according to selected areas
      // their start and end points now depend on the minimum and maximum of the selected grids
      gridItems = this.props.areas.map((x, index) => (
        <div
          style={{
            display: "initial",
            gridRowStart: Math.min(...x.rows) - (minRow - 1),
            gridRowEnd: Math.max(...x.rows) + 1 - (minRow - 1),
            gridColumnStart: Math.min(...x.columns) - (minCol - 1),
            gridColumnEnd: Math.max(...x.columns) + 1 - (minCol - 1),
            background: "white",
            border: "1px solid black"
          }}
          key={index}
        />
      ));
    }
    return (
      <div className="showCase" style={showCaseStyle}>
        {gridItems}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  areas: state.selected.areas,
  config: state.config
});

export default connect(mapStateToProps)(ShowCase);

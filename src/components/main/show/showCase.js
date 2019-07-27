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
      // style the showCase according to selected viewport and selected areas:
      // example:
      //  10 columns = 100vw, total columns 10 --> grid-template-columns: repeat(10, 10%);
      //  8 rows = 100vh, total rows 20 --> grid-template-rows: repeat(20, 100/8 %);
      showCaseStyle = {
        // width depends on selected viewport/number of cols in viewport
        gridTemplateColumns:
          "repeat(" + maxCol + "," + 100 / this.props.config.numColView + "% )",
        // height depends on selected viewport/number of rows in viewport
        // gridTemplateRows:
        //   "repeat(" +
        //   maxRow +
        //   "," +
        //   100 /
        //     (this.props.config.numColView *
        //       (this.props.ratioRows / this.props.ratioCols)) +
        //   "%)"
        gridTemplateRows:
          "repeat(" + maxRow + "," + 100 / this.props.config.numRowView + "% )"
      };
      // generate and style grid items according to selected areas
      // their start and end points depend on the minimum and maximum of the selected grids
      gridItems = this.props.areas.map((x, index) => (
        <div
          style={{
            display: "initial",
            gridRowStart: Math.min(...x.rows),
            gridRowEnd: Math.max(...x.rows) + 1,
            gridColumnStart: Math.min(...x.columns),
            gridColumnEnd: Math.max(...x.columns) + 1,
            background: x.color
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

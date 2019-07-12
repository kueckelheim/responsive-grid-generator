import React from "react";
import "./showCase.scss";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class ShowCase extends React.PureComponent {
  static propTypes = {
    areas: PropTypes.array.isRequired
  };

  render() {
    // get total selected elements
    var allSelected = this.props.areas.map(x => x.selectedElements);
    // merges array of arrays
    allSelected = [].concat.apply([], allSelected);
    console.log(allSelected);

    return (
      <div className="showCase">
        {/* pass number of elements inline style */}
        {/* add number of divs according to number of areas */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  areas: state.selected.areas
});

export default connect(mapStateToProps)(ShowCase);

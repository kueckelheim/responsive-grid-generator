import React from "react";
import "./show.scss";

import ShowCase from "./showCase.js";

import { connect } from "react-redux";
import { updateRatio } from "../../../actions/config.js";
import PropTypes from "prop-types";

class Show extends React.PureComponent {
  static propTypes = {
    config: PropTypes.object.isRequired
  };

  onChange = e => {
    this.props.updateRatio(e.target.value, e.target.name);
  };

  render() {
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
                id="ratio" /*value={this.props.config.ratio} */
              >
                <option value="10:17">10:17 (Big Screen)</option>
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
                value={this.props.config.ratioRows}
                name="ratioRows"
              />
              :
              <input
                type="number"
                min="1"
                onChange={this.onChange}
                value={this.props.config.ratioCols}
                name="ratioCols"
              />
            </div>
          </div>
        </div>
        {/* Include Resizable Component */}
        <div
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
        >
          <ShowCase width={this.props.width} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  config: state.config
});

export default connect(
  mapStateToProps,
  { updateRatio }
)(Show);

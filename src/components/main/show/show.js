import React from "react";
import "./show.scss";

import ShowCase from "./showCase.js";

class Show extends React.PureComponent {
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
            <h2>Ratio:</h2>
            <select
              name="ratio"
              id="ratio" /*value={this.props.config.ratio} */
            >
              <option value="10:15">10:15 (Big Screen)</option>
              <option value="10:13">10:13 (Laptop)</option>
              <option value="10:11">10:13 (IPad)</option>
              <option value="10:10">10:13 (Galaxy S6)</option>
            </select>
          </div>
        </div>
        {/* Include Resizable Component */}
        <div className="resizable">
          <ShowCase />
        </div>
      </div>
    );
  }
}

export default Show;

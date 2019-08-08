import React from "react";
import "./howTo.scss";

class HowTo extends React.PureComponent {
  render() {
    return (
      <div className="howTo" data-test="howTo">
        <ol>
          <li>Select rows/columns per viewport</li>
          <li>Draw areas</li>
          <li>Name areas</li>
          <li>Watch output on different screen formats</li>
          {/* smooth scroll to code component */}
          <li onClick={() => this.props.onClickCode()} className="link">
            Get Code -->
          </li>
        </ol>
      </div>
    );
  }
}

export default HowTo;

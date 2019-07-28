import React from "react";
import "./main.scss";

import Logo from "./logo/logo.js";
import Grid from "./grid/grid.js";
import Show from "./show/show.js";
import Code from "./code/code.js";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openOutput: false,
      showContainerClass: "showContainer close"
    };
  }

  // if !openOutput slide Show component in, otherwise slide it out
  clickOutput = () => {
    if (!this.state.openOutput) {
      this.setState({
        openOutput: true,
        showContainerClass: "showContainer open"
      });
    } else {
      this.setState({
        openOutput: false,
        showContainerClass: "showContainer close"
      });
    }
  };

  render() {
    return (
      <div className="main">
        <div className="logoContainer">
          <Logo />
        </div>
        <div className="gridContainer">
          <Grid />
        </div>
        <div className={this.state.showContainerClass}>
          <Show />
        </div>
        {/* <div className="outputButton" onClick={this.clickOutput}> */}
        {/* <div className="text">Output</div> */}
        {/* </div> */}
        <div className="codeContainer">
          <Code />
        </div>
      </div>
    );
  }
}

export default Main;

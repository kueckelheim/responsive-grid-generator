import React from "react";
import "./logo.scss";

function Logo() {
  return (
    <div className="logo" data-test="logo">
      <div className="container">
        <div>RESPONIVE</div>
        <div>GRID GENERATOR</div>
      </div>
      <div className="simple">As simple as it gets.</div>
    </div>
  );
}

export default Logo;

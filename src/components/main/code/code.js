import React, { Component } from "react";
import "./code.scss";

class Code extends React.PureComponent {
  state = {};
  render() {
    return (
      <div className="code">
        <h1>Your Code</h1>
        <div className="codeBox">
          <div className="html">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ipsum
            dolores, facere animi laborum sed obcaecati quas voluptate. Rerum
            voluptatibus quaerat distinctio iusto itaque necessitatibus saepe ex
            assumenda blanditiis ducimus rem ab dolorem facilis commodi neque
            officiis numquam fugiat, mollitia impedit eum nesciunt. Dolor
            tenetur in, magni accusamus quam quia.
          </div>
          <div className="css">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            molestiae quisquam quae porro a sunt veritatis, distinctio similique
            impedit sit fugiat? Voluptatem laudantium dicta neque eum. Nam
            excepturi totam quisquam fugit sed recusandae debitis autem,
            nesciunt porro necessitatibus et voluptatum sunt id voluptates nisi?
            Quos vel ipsa pariatur eos quod.
          </div>
        </div>
      </div>
    );
  }
}

export default Code;

import React from "react";
import "./code.scss";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Lowlight from "react-lowlight";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";

// Then register them with lowlight
Lowlight.registerLanguage("xml", xml);
Lowlight.registerLanguage("css", css);

class Code extends React.PureComponent {
  static propTypes = {
    areas: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired
  };

  copyStringToClipboard = str => {
    var el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  render() {
    var html = "";
    var css = "";
    if (this.props.areas.length > 0) {
      // get total selected columns and rows
      var totalColumns = this.props.areas.map(x => x.columns);
      var totalRows = this.props.areas.map(x => x.rows);
      // merge array of arrays
      totalColumns = [].concat.apply([], totalColumns);
      totalRows = [].concat.apply([], totalRows);
      // get minimums and maximums
      var maxCol = Math.max(...totalColumns);
      var maxRow = Math.max(...totalRows);
      html =
        "<div class='grid'>\n" +
        //   .join removes the comma
        this.props.areas
          .map(x => "   <div class='" + x.name + "'></div>\n")
          .join("") +
        "</div>\n";

      css =
        ".grid {\n" +
        "// set your height and width value, custom = full screen;\n" +
        "   width: 100vw;\n" +
        "   height: 100vh;\n" +
        "   max-width: 100%;\n" +
        "   display: grid;\n   grid-template-columns: repeat(" +
        maxCol +
        ", " +
        100 / this.props.config.numColView +
        "% );\n" +
        "   grid-template-rows: repeat(" +
        maxRow +
        ", " +
        100 / this.props.config.numRowView +
        "% );\n}\n" +
        this.props.areas
          .map(
            x =>
              ".grid ." +
              x.name +
              " {\n" +
              "   grid-row-start: " +
              Math.min(...x.rows) +
              ";\n" +
              "   grid-row-end: " +
              (Math.max(...x.rows) + 1) +
              ";\n" +
              "   grid-column-start: " +
              Math.min(...x.columns) +
              ";\n" +
              "   grid-column-end: " +
              (Math.max(...x.columns) + 1) +
              ";\n" +
              "}\n"
          )
          .join("");
    }
    return (
      <div className="code">
        <div className="headline">Your Code</div>
        <div className="codeBoxContainer">
          <div className="codeBox">
            <div className="head">HTML</div>
            <div className="lowlight">
              <Lowlight language="xml" value={html} />
            </div>
            {/* Copy to clipboard button */}
            {// check if supported by browser
            document.queryCommandSupported("copy") && (
              <button onClick={this.copyStringToClipboard(html)}>
                Copy to Clipboard
              </button>
            )}
          </div>
          <div className="codeBox">
            <div className="head css">CSS</div>
            <div className="lowlight">
              <Lowlight language="css" value={css} />
            </div>
            {/* Copy to clipboard button */}
            {// check if supported by browser
            document.queryCommandSupported("copy") && (
              <button onClick={this.copyStringToClipboard(css)}>
                Copy to Clipboard
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  areas: state.selected.areas,
  config: state.config
});

export default connect(mapStateToProps)(Code);

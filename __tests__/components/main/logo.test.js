import React from "react";
import { shallow } from "enzyme";

import Logo from "../../../src/components/main/logo/logo.js";

// import utilities
import { findByTestAttr } from "../../setup/utils.js";

// shallow render of Logo component
const setUp = (props = {}) => {
  const component = shallow(<Logo {...props} />);
  return component;
};

describe("Logo Component", () => {
  // before each test is run, run setUp function
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("it should render without errors", () => {
    // get data-test attribute .logo inside component
    // we could do it with class names, but using a data-test attribute gives other developers a signal not to change it,
    // while they are more likely to change a classname
    const wrapper = findByTestAttr(component, "logo");
    // logo class should appear once
    expect(wrapper.length).toBe(1);
  });
});

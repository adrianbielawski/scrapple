import React from "react";
import Input from "./input";
import { shallow } from 'enzyme';
import { expect } from "@jest/globals";

describe('Input', () => {
  it('renders an input', () => {
    const wrapper = shallow(<Input />);
    const input = wrapper.find('input');
    expect(input.props()).toEqual(expect.objectContaining({
      className: 'input',
      spellCheck: 'false',
    }));
  })

  it('renders an additional props', () => {
    const wrapper = shallow(<Input foo="bar" boo="hoo" />);
    const input = wrapper.find('input')
    expect(input.props()).toEqual(expect.objectContaining({
      foo: 'bar',
      boo: 'hoo',
    }));
  });
})
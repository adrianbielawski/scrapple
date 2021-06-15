import React from "react";
import Button from "./button";
import { shallow } from 'enzyme';
import { expect } from "@jest/globals";

describe('Button', () => {

  it('renders a button', () => {
    const wrapper = shallow(<Button>The button</Button>);
    const button = wrapper.find('button');
    expect(button.text()).toBe('The button');
    expect(button.prop('className')).toBe('button');
  });

  it('renders an additional props', () => {
    const wrapper = shallow(<Button foo="bar" boo="hoo">The button</Button>);
    const button = wrapper.find('button')
    expect(button.props()).toEqual(expect.objectContaining({
      foo: 'bar',
      boo: 'hoo',
    }));
  });

  it('calls callback on click', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick}>The button</Button>);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(onClick).toBeCalledTimes(1);
  });
})
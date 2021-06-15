import React from "react";
import LoadingSpinner from "./loadingSpinner";
import { shallow } from 'enzyme';
import { expect } from "@jest/globals";

describe('LoadingSpinner', () => {
  it('renders a LoadingSpinner', () => {
    const wrapper = shallow(<LoadingSpinner />);
    const loader = wrapper.find('div');
    expect(loader.prop('className')).toBe('loader noBackground');
  });

  it('renders a LoadingSpinner with background', () => {
    const wrapper = shallow(<LoadingSpinner background={true}/>);
    const loader = wrapper.find('div');
    expect(loader.prop('className')).toBe('loader false');
  });

  it('renders a LoadingSpinner with correct size', () => {
    const wrapper = shallow(<LoadingSpinner size={60} />);
    const loader = wrapper.find('div');
    expect(loader.prop('style')).toEqual(expect.objectContaining({
      height: '60px',
      width: '60px',
    }));
  });
})
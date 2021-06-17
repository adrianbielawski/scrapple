import React from "react";
import Pagination from "./pagination";
import { shallow, mount } from 'enzyme';
import { expect } from "@jest/globals";
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next');

const automation = name => `[data-automation="${name}"]`

describe('Pagination', () => {
  let mockTranslate;

  beforeEach(() => {
    mockTranslate = jest.fn(() => 'mockTranslation');
    useTranslation.mockReturnValue({ t: mockTranslate })
  })

  it('renders correctly', () => {
    const fetchAction = jest.fn()
    const data = {
      previous: 1,
      next: 2,
      count: 57,
    }
    const wrapper = mount(<Pagination data={data} fetchAction={fetchAction} />);
    const pagination = wrapper.find(automation('pagination'));
    expect(pagination.props()).toEqual(expect.objectContaining({
      className: 'pagination',
      'data-automation': 'pagination',
    }));
  });

  it.each([
    //automationaName, expectedPageNumber
    ['chevronLeft', 2],
    ['chevronRight', 4],
  ])(
    'calls fetch action with correct props on %j click',
    (automationName, expectedPageNumber) => {
      const fetchAction = jest.fn();
      const data = {
        previous: 2,
        next: 4,
        count: 57,
      }
      const params = { params: 'asd' };
      const wrapper = mount(<Pagination data={data} fetchAction={fetchAction} params={params} />);
      const chevronRight = wrapper.find(`svg${automation(automationName)}`);

      chevronRight.simulate('click');

      expect(fetchAction).toBeCalledTimes(1);
      expect(fetchAction).toBeCalledWith(expectedPageNumber, params);
    });

  it.each([
    //automationaName, expectedPageNumber, previous, next
    ['chevronLeft', 'no previous page', null, 2],
    ['chevronRight', 'no next page', 0, null],
  ])(
    'disables %s when %s',
    (automationName, _, previous, next) => {
      const fetchAction = jest.fn();
      const data = {
        previous,
        next,
        count: 57,
      }

      const wrapper = mount(
        <Pagination
          data={data}
          fetchAction={fetchAction}
          params={{ params: 'asd' }}
        />
      );
      const chevron = wrapper.find(
        `svg${automation(automationName)}`
      );

      chevron.simulate('click');

      expect(chevron.hasClass('chevron inactive')).toEqual(true);
      expect(fetchAction).toBeCalledTimes(0);
    });

  it('display correct number of items and translated text', () => {
    const fetchAction = jest.fn();
    const data = {
      previous: 2,
      next: 4,
      count: 57,
    }
    const params = { params: 'asd' };
    const wrapper = mount(<Pagination data={data} fetchAction={fetchAction} params={params} />);
    const translatedText = wrapper.find(automation('number')).text();

    expect(translatedText).toBe('mockTranslation');
    expect(mockTranslate).toBeCalledTimes(1);
    expect(mockTranslate).toHaveBeenCalledWith('ofNum', { count: 57 })
  })
})
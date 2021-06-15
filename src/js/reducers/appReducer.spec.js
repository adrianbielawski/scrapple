import { expect } from '@jest/globals';
import { changeLanguage } from '../actions/appActions';
import appReducer from './appReducer';
import { initialState } from './appReducer';

describe('App reducer', () => {
  it('does not change state when action is unknown', () => {
    const newState = appReducer(initialState, { type: 'unknownAction', payload: 3 });
    expect(newState).toEqual(initialState);
  });

  it.each([
    ['en', { language: 'en' }],
    ['pl', { language: 'pl' }]
  ])('APP/LANGUAGE_CHANGED returns correct state when language = %s', (language, expected) => {
    const newState = appReducer(initialState, changeLanguage(language));

    expect(newState).not.toBe(initialState);
    expect(newState).toEqual(expect.objectContaining(expected));
  });
})
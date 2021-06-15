import { changeLanguage } from "./appActions"

describe('App actions', () => {
  it('"changeLanguage" returns an object of correct shape', () => {
    const action = changeLanguage('en');
    expect(action).toEqual({ type: 'APP/LANGUAGE_CHANGED', language: 'en' });
  });
})
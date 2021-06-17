import * as actions from './authActions';
import { setAlert } from './appActions';
import axiosInstance from 'axiosInstance';
import history from './history'

jest.mock('axiosInstance');
jest.mock('./history');

describe('logIn action', () => {
  beforeEach(() => {
    axiosInstance.post.mockReset();
    history.push.mockReset();
    delete window.localStorage;
    window.localStorage = { setItem: jest.fn() };
  });

  it.each([
    [{ referrer: 'asd' }, 'asd'],
    [undefined, '/main_menu']
  ])('Works as expected when successful and location.state = %j', async (state, expectedReferrer) => {
    const dispatch = jest.fn();
    const apiResult = { id: 1, name: 'foo', lastName: 'bar', data: { key: '123', user: 'foo' } };
    const location = { state }

    axiosInstance.post.mockReturnValue(Promise.resolve(apiResult));

    await actions.logIn('user@scrapple.com', 'password', history, location)(dispatch);

    expect(axiosInstance.post).toHaveBeenCalledTimes(1);
    expect(axiosInstance.post).toHaveBeenCalledWith('/login/', {
      email: 'user@scrapple.com',
      password: 'password'
    });

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(window.localStorage.setItem).toHaveBeenCalledWith('token', apiResult.data.key)

    expect(dispatch).toHaveBeenCalledTimes(2);

    expect(dispatch.mock.calls).toEqual([
      [actions.logInStart()],
      [actions.logInSuccess(apiResult.data.user)],
    ]);

    expect(history.push).toHaveBeenCalledTimes(1)
    expect(history.push).toHaveBeenCalledWith(expectedReferrer)
  });

  it.each([
    [{ response: { data: [['error']] } }, 'error'],
    [undefined, 'Something went wrong']
  ])('handles errors correctly when error = %j', async (error, expectedError) => {
    const dispatch = jest.fn();

    axiosInstance.post.mockReturnValue(Promise.reject(error));

    await actions.logIn('user@scrapple.com', 'password', history, location)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(3)

    expect(dispatch.mock.calls).toEqual([
      [actions.logInStart()],
      [actions.logInFailure()],
      [setAlert('alert', expectedError)],
    ])
  })
});

describe('getUser action', () => {
  beforeEach(() => {
    axiosInstance.get.mockReset();
    delete window.localStorage;
    window.localStorage = { removeItem: jest.fn() }
  });

  it('works as expected when successful', async () => {
    const dispatch = jest.fn();
    const apiResult = { data: { userName: 'Adrian' } };

    axiosInstance.get.mockReturnValue(Promise.resolve(apiResult));

    await actions.getUser()(dispatch);

    expect(axiosInstance.get).toHaveBeenCalledTimes(1);
    expect(axiosInstance.get).toHaveBeenCalledWith('/user/');

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(dispatch.mock.calls).toEqual([
      [actions.getUserSuccess(apiResult.data)],
    ]);
  });

  it('handles errors correctly', async () => {
    const dispatch = jest.fn();

    axiosInstance.get.mockReturnValue(Promise.reject());

    await actions.getUser()(dispatch);

    expect(axiosInstance.get).toHaveBeenCalledTimes(1);
    expect(axiosInstance.get).toHaveBeenCalledWith('/user/');

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('token');

    expect(dispatch.mock.calls).toEqual([
      [actions.getUserFailure()],
    ]);
  });
})
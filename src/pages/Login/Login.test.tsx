import { configureStore, Store } from '@reduxjs/toolkit';
import { fireEvent, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';

import { userEvent, renderWithAllProviders } from '@/utils/testUtils';
import { IUser } from '@/apis/getUser/types';
import { IRootState } from '@/redux/types';
import appAxios from '@/services/appAxios';
import { keyLogin } from '@/apis/login';

import Login from './index';
import reducer, {
  initialState,
  updateUser,
  userSelector,
  isAuthenticatedSelector,
} from './slice';

let store: Store<Pick<IRootState, 'login'>>;

const mockData: IUser = {
  id: 1,
  firstName: 'Terry',
  lastName: 'Medhurst',
  maidenName: 'Smitham',
  age: 50,
  gender: 'male',
  email: 'atuny0@sohu.com',
  phone: '+63 791 675 8914',
  username: 'atuny0',
  password: '9uQFF1Lh',
  birthDate: '2000-12-25',
  image: 'https://robohash.org/hicveldicta.png',
  bloodGroup: 'A−',
};

describe('pages/Login', () => {
  describe('slice.ts', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          login: reducer,
        },
      });
    });

    it('should return the initial state', () => {
      const state = store.getState();

      expect(state.login).toEqual(initialState);
    });

    it('should handle updateUser action', () => {
      store.dispatch(updateUser(mockData));
      const state = store.getState();

      expect(userSelector(state)).toEqual(mockData);
    });

    it('should isAuthenticated return true if user exist', () => {
      store.dispatch(updateUser(mockData));
      const state = store.getState();

      expect(isAuthenticatedSelector(state)).toEqual(true);
    });

    it('should isAuthenticated return false if user null', () => {
      const state = store.getState();

      expect(isAuthenticatedSelector(state)).toEqual(false);
    });
  });

  describe('index.tsx', () => {
    describe('snapshot', () => {
      it('should render and match the snapshot', () => {
        const { container } = renderWithAllProviders(<Login />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
    describe('function', () => {
      let mockedAlert: Mock<any, any>;
      let mockAxios: MockAdapter;

      beforeEach(() => {
        mockAxios = new MockAdapter(appAxios);
        mockedAlert = vi.fn();
        global.alert = mockedAlert;
      });

      it('renders login form with username, password input and login button', () => {
        const { getByTestId } = renderWithAllProviders(<Login />);
        const usernameElement = getByTestId('username');
        const passwordElement = getByTestId('password');
        const buttonElement = getByTestId('loginButton');
        expect(usernameElement).toBeInTheDocument();
        expect(passwordElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
      });

      it('should update state when input values change', () => {
        const { getByTestId } = renderWithAllProviders(<Login />);
        const usernameInput = getByTestId('username');
        const passwordInput = getByTestId('password');

        fireEvent.change(usernameInput, { target: { value: 'username' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        expect(usernameInput).toHaveValue('username');
        expect(passwordInput).toHaveValue('password');
      });

      it('calls login API with correct username and password', async () => {
        const user = userEvent.setup();
        const { getByTestId, getByText } = renderWithAllProviders(<Login />);
        const usernameElement = getByTestId('username');
        const passwordElement = getByTestId('password');
        const buttonElement = getByTestId('loginButton');

        // Click the submit button without filling the form
        await user.click(buttonElement);

        expect(getByText('username is required')).toBeInTheDocument();
        expect(getByText('password is required')).toBeInTheDocument();

        fireEvent.change(usernameElement, { target: { value: 'atuny0' } });
        fireEvent.change(passwordElement, { target: { value: '9uQFF1Lh' } });

        mockAxios
          .onPost(keyLogin, {
            username: 'atuny0',
            password: '9uQFF1Lh',
          })
          .reply(200, mockData);

        fireEvent.click(buttonElement);

        await waitFor(() => {
          expect(mockedAlert).toHaveBeenCalledWith('Login successfully');
        });
      });
    });
  });
});

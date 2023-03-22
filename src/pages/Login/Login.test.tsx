import { configureStore, Store } from '@reduxjs/toolkit';
import { fireEvent, waitFor } from '@testing-library/react';

import { IUser } from '@/apis/getUser/types';
import { IRootState } from '@/redux/types';
import { renderWithAllProviders } from '@/utils/testUtils';
import routes from '@/routes/paths';

import Login from './index';
import reducer, {
  initialState,
  updateUser,
  userSelector,
  isAuthenticatedSelector,
} from './slice';

let store: Store<Pick<IRootState, 'login'>>;

const exampleUser: IUser = {
  id: 1,
  firstName: 'firstName',
  lastName: 'lastName',
  maidenName: 'maidenName',
  age: 21,
  gender: 'male',
  email: 'email@example.com',
  phone: '0123456789',
  username: 'username',
  password: 'password',
  birthDate: '1/1/2000',
  image: 'image',
  bloodGroup: 'A',
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
      store.dispatch(updateUser(exampleUser));
      const state = store.getState();

      expect(userSelector(state)).toEqual(exampleUser);
    });

    it('should isAuthenticated return true if user exist', () => {
      store.dispatch(updateUser(exampleUser));
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
        const mockLoginMutation = jest.fn();
        jest.mock('swr/mutation', () => () => ({
          trigger: mockLoginMutation,
          isMutating: false,
        }));

        const { getByTestId } = renderWithAllProviders(<Login />);
        const usernameElement = getByTestId('username');
        const passwordElement = getByTestId('password');
        const buttonElement = getByTestId('loginButton');
        fireEvent.change(usernameElement, { target: { value: 'username' } });
        fireEvent.change(passwordElement, { target: { value: 'password' } });
        fireEvent.click(buttonElement);

        await waitFor(() => {
          expect(mockLoginMutation).toHaveBeenCalledWith({
            username: 'username',
            password: 'password',
          });
        });
      });

      it('redirects to Users page after successful login', async () => {
        const mockLoginMutation = jest.fn();
        jest.mock('swr/mutation', () => () => ({
          trigger: mockLoginMutation,
          isMutating: false,
        }));

        const mockTokenStorageSet = jest.fn();
        jest.mock('@/utils/tokenStorage', () => ({
          set: mockTokenStorageSet,
        }));

        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
          useNavigate: () => mockNavigate,
        }));

        mockLoginMutation.mockResolvedValueOnce({
          id: 1,
        });

        const { getByTestId } = renderWithAllProviders(<Login />);
        const usernameElement = getByTestId('username');
        const passwordElement = getByTestId('password');
        const buttonElement = getByTestId('loginButton');
        fireEvent.change(usernameElement, { target: { value: 'username' } });
        fireEvent.change(passwordElement, { target: { value: 'password' } });
        fireEvent.click(buttonElement);

        await waitFor(() => {
          expect(mockTokenStorageSet).toHaveBeenCalledWith('1');
          expect(mockNavigate).toHaveBeenCalledWith(routes.users.build());
        });
      });
    });
  });
});

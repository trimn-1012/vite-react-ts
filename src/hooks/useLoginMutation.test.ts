import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { act } from '@testing-library/react';

import appAxios from '@/services/appAxios';
import { IUser } from '@/apis/getUser/types';
import { SWRWrapper } from '@/utils/testUtils';
import { keyLogin } from '@/apis/login';

import { useLoginMutation } from './useLoginMutation';

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

describe('useLoginMutation', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(appAxios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should login success', async () => {
    const { result, waitFor } = renderHook(() => useLoginMutation(), {
      wrapper: SWRWrapper,
    });

    expect(result.current.isMutating).toBe(false);

    mockAxios
      .onPost(keyLogin, {
        username: 'atuny0',
        password: '9uQFF1Lh',
      })
      .reply(200, mockData);

    await act(async () => {
      await result.current.trigger({
        username: 'atuny0',
        password: '9uQFF1Lh',
      });
    });

    await waitFor(() => {
      return !!result.current.data;
    });

    expect(!!result.current.data).toBe(true);
  });
});

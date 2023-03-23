import MockAdapter from 'axios-mock-adapter';

import appAxios from './appAxios';

let mockAxios: MockAdapter;

describe('services/appAxios', () => {
  beforeEach(() => {
    mockAxios = new MockAdapter(appAxios);
  });

  it('should request success', async () => {
    const mockData = { data: 'data' };
    mockAxios.onGet('test').reply(200, mockData);

    const response = await appAxios.get('test');

    expect(response.data).toEqual(mockData);
  });

  it('should request failure', () => {
    const mockError = { message: 'error message' };
    mockAxios.onGet('test').reply(400, mockError);

    appAxios.get('test').catch(error => {
      expect(error.response.data).toEqual(mockError);
    });
  });

  it('should request success with params', async () => {
    const mockData = { data: 'data' };
    const params = { params: { param1: [1, 2, 3], param2: 'test param' } };

    mockAxios.onGet('test', { params }).reply(200, mockData);

    const response = await appAxios.get('test', { params });

    expect(response.data).toEqual(mockData);
  });
});

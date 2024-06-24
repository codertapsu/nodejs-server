import axios from 'axios';

import { findServer } from '@services/server-finder';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const servers = [
  { url: 'https://does-not-work.perfume.new', priority: 1 },
  { url: 'https://gitlab.com', priority: 4 },
  { url: 'http://app.scnt.me', priority: 3 },
  { url: 'https://offline.scentronix.com', priority: 2 },
];

describe('findServer', () => {
  it('should return the online server with the lowest priority', async () => {
    mockedAxios.get.mockImplementation(url => {
      switch (url) {
        case 'https://gitlab.com':
          return Promise.resolve({ status: 200 });
        case 'http://app.scnt.me':
          return Promise.resolve({ status: 200 });
        default:
          return Promise.reject(new Error('Network Error'));
      }
    });

    const server = await findServer(servers);
    expect(server).toEqual({ url: 'http://app.scnt.me', priority: 3 });
  });

  it('should reject if no servers are online', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(findServer(servers)).rejects.toThrow('No servers are online');
  });
});

import axios from 'axios';

import { PotentialServer } from '@models/potential-server.model';

const findServer = async (servers: PotentialServer[]): Promise<PotentialServer> => {
  const timeout = 5000;
  const serverChecks = servers.map(server =>
    axios
      .get(server.url, { timeout })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return server;
        }
        throw new Error('Server not online');
      })
      .catch(() => {
        throw new Error('Server not online');
      }),
  );

  const results = await Promise.allSettled(serverChecks);
  const onlineServers = results
    .filter(server => server.status === 'fulfilled')
    .map(server => (server as PromiseFulfilledResult<PotentialServer>).value);

  if (onlineServers.length === 0) {
    throw new Error('No servers are online');
  }

  onlineServers.sort((a, b) => a.priority - b.priority);

  return onlineServers[0];
};

export { findServer };

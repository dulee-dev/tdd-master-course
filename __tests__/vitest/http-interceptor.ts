import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@__tests__/mock-api';

const main = () => {
  if (process.env.MOCK === 'true') {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
  }
};

main();

import { mockInNode } from '@__tests__/mock-api/mock-in-node';
import { beforeAll, afterEach, afterAll } from 'vitest';

const main = () => {
  if (process.env.MOCK === 'true') {
    beforeAll(() => mockInNode.listen());
    afterEach(() => mockInNode.resetHandlers());
    afterAll(() => mockInNode.close());
  }
};

main();

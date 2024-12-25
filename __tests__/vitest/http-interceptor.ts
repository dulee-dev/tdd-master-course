import { mockInNode } from '@__tests__/mock-api/mock-in-node';
import { beforeAll, afterEach, afterAll } from 'vitest';

const main = () => {
  if (process.env.NEXT_PUBLIC_MOCK === 'true') {
    beforeAll(() => mockInNode.listen());
    afterEach(() => mockInNode.resetHandlers());
    afterAll(() => mockInNode.close());
  }
};

main();

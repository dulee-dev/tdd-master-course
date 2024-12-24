import { uuidReg } from '@/libs/string-sub';
import { expect } from 'vitest';

expect.extend({
  toBeUuid(received) {
    const { isNot } = this;

    const pass = uuidReg.test(received);
    return {
      pass,
      message: () => `${received} is${isNot ? ' not' : ''} uuid`,
    };
  },

  // toBeIsoDate() {},
});

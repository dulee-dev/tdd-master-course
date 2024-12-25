import { uuidReg } from '@/libs/string-sub';
import { isArray } from 'radashi';
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

  toBeArray(received) {
    const { isNot } = this;

    const pass = isArray(received);
    return {
      pass,
      message: () => `${received} is${isNot ? ' not' : ''} array`,
    };
  },

  // toBeIsoDate() {},
});

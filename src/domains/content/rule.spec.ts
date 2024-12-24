import { faker } from '@faker-js/faker';
import { test, describe, expect } from 'vitest';
import { validateTitle } from './rule';

describe('validateTitle', () => {
  test.each([
    {
      describe: 'len === 1',
      title: faker.string.sample(1),
      expected: false,
    },
    {
      describe: 'len === 81',
      title: faker.string.sample(81),
      expected: false,
    },
    {
      describe: 'len === 80',
      title: faker.string.sample(80),
      expected: true,
    },
  ])('$describe -> $expected', ({ title, expected }) => {
    const result = validateTitle(title);
    expect(result).toEqual(expected);
  });
});

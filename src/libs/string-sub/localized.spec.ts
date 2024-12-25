import { test, describe, expect } from 'vitest';
import { localizeDate } from './localized';

test('localizeDate', () => {
  const date = new Date('2024.12.12');
  const expected = '2024년 12월 12일';

  const result = localizeDate(date);

  expect(result).toEqual(expected);
});

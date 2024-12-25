import { faker } from '@faker-js/faker';
import { test, expect } from 'vitest';
import { uploadImage } from './cdn';

test('uploadImage', async () => {
  const fileName = faker.string.alphanumeric();
  const expected = '/file.svg';

  const result = await uploadImage(fileName);

  expect(result).toEqual(expected);
});

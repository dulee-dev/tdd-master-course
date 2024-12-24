import { test, describe, expect } from 'vitest';
import { contentApi } from './content-api';

describe('content-api', () => {
  test('create one', async () => {
    const body = {
      title: 'new title',
      thumbnail: 'new thumbnail',
      body: 'new body',
    };
    const data = await contentApi.createOne(body, 'aaa');

    expect(data).toHaveProperty('content.id', expect.toBeUuid());
    expect(data).toHaveProperty('content', expect.objectContaining(body));
    expect(data.status).toEqual(201);
  });
});

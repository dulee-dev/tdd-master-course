import { contentFixtures } from '@__tests__/fixtures/contents';
import { server } from '.';
import { test, describe, expect } from 'vitest';
import { gen } from '@__tests__/generator';
import { omit } from 'radashi';

server.listen();

describe('msw', () => {
  test('get', async () => {
    const response = await fetch(process.env.API_BASE_URL + '/contents');
    const data = await response.json();

    expect(data).toEqual({ contents: contentFixtures });
  });

  test('post', async () => {
    const reqBody = omit(gen.content(), ['id']);

    const response = await fetch(process.env.API_BASE_URL + '/contents', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'dulee',
      },
      body: JSON.stringify(reqBody),
    });
    const data = await response.json();

    expect(data.content.id).toBeUuid();
    expect(omit(data.content, ['id'])).toEqual(reqBody);
    expect(data.status).toEqual(201);
  });
});

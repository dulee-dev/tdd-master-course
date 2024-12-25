import { test, describe, expect } from 'vitest';
import { contentApi } from './content-api';
import { contentFixtures } from '@__tests__/fixtures/contents';
import { userFixtures } from '@__tests__/fixtures/users';

describe('content-api', () => {
  test('find all', async () => {
    const pageNum = 1;
    const pageTake = 12;
    const data = await contentApi.findAll({
      pageNum,
      pageTake,
      sort: 'createdAt-desc',
      // q: '00000',
    });

    expect(data).toHaveProperty('contents.length', 12);
    // expect(data).toHaveProperty('contents.length', 1);
    expect(data.status).toEqual(200);
  });

  test('find one', async () => {
    const content = contentFixtures[0];
    const data = await contentApi.findOne(content.id);

    expect(data).toHaveProperty('content.id', expect.toBeUuid());
    expect(data).not.toHaveProperty('content.authorId');
    expect(data).toHaveProperty('content.author');
    expect(data.status).toEqual(200);
  });

  test('find My one', async () => {
    const content = contentFixtures[0];
    const user = userFixtures[0];
    const data = await contentApi.findMyOne(content.id, user.nickname);

    expect(data).toHaveProperty('content.id', expect.toBeUuid());
    expect(data).not.toHaveProperty('content.authorId');
    expect(data).toHaveProperty('content.author');
    expect(data.status).toEqual(200);
  });

  test('countAll', async () => {
    const content = contentFixtures[0];
    const q = content.title.slice(0, 2);
    const data = await contentApi.countAll(q);

    expect(typeof data.count === 'number').toEqual(true);
    expect(data.status).toEqual(200);
  });

  test('create one', async () => {
    const body = {
      title: 'new title',
      thumbnail: 'new thumbnail',
      body: 'new body',
    };
    const data = await contentApi.createOne(body, 'aaa');
    // const data = await contentApi.createOne(body, 'dulee');

    // expect(data).toHaveProperty('content.id', expect.toBeUuid());
    // expect(data).toHaveProperty('content', expect.objectContaining(body));
    expect(data.status).toEqual(401);
  });

  test('update one', async () => {
    const content = contentFixtures[0];
    // const user = userFixtures[0].nickname;
    const auth = 'asdfasdfadsf';
    const body = {
      title: 'new title',
      thumbnail: '/file.svg',
      body: 'new body',
    };
    const data = await contentApi.updateOne(body, auth, content.id);

    // expect(data).toHaveProperty('content.id', content.id);
    // expect(data).toHaveProperty('content', expect.objectContaining(body));
    expect(data.status).toEqual(404);
  });

  test('delete one', async () => {
    const content = contentFixtures[0];
    const user = userFixtures[1];

    const data = await contentApi.removeOne(user.nickname, content.id);
    expect(data.status).toEqual(404);
  });
});

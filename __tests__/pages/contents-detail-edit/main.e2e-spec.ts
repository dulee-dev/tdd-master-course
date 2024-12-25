import { Helper } from './helper';
import { authTest } from '@__tests__/playwright/auth-test';
import { faker } from '@faker-js/faker';
import { uuidRegConcat } from '@/libs/string-sub';
import { test, expect } from '@playwright/test';
import { contentFixtures } from '@__tests__/fixtures/contents';
import { userFixtures } from '@__tests__/fixtures/users';

const calcUrl = (id: string): string => `/contents/${id}/edit`;

test.describe('auth', () => {
  const url = calcUrl(contentFixtures[0].id);
  authTest.private(url);
});

test('auth', async ({ page, context }) => {
  const helper = new Helper(page, context);
  const auth = userFixtures[1];
  const content = contentFixtures[0];

  await helper.initial(auth, content);

  await helper.assertStrictPage('/contents');
});

test('check initial load', async ({ page, context }) => {
  const helper = new Helper(page, context);
  const auth = userFixtures[0];
  const content = contentFixtures[0];

  await helper.initial(auth, content);
  await expect(page.getByText(content.title)).toBeVisible();
  await expect(page.getByText(content.body)).toBeVisible();
  await expect(page.getByText('2024년 12월 24일')).toBeVisible();
  await expect(
    helper.getForm.getByText(userFixtures[0].nickname)
  ).toBeVisible();
});

test.describe('content-edit', () => {
  test.beforeEach(async ({ page, context }) => {
    const helper = new Helper(page, context);
    const user = userFixtures[0];
    const content = contentFixtures[0];

    await helper.initial(user, content);
  });

  test.describe('form invalid', () => {
    test('if title lenght 1, submit disabled', async ({ page, context }) => {
      const helper = new Helper(page, context);
      await helper.getTitle.fill(faker.string.sample(1));
      await helper.setInputFixtureFile(helper.getInputThumbnail);
      await expect(helper.getSubmitBtn).toBeDisabled();
    });

    test('if title lenght 81, submit disabled', async ({ page, context }) => {
      const helper = new Helper(page, context);
      await helper.getTitle.fill(faker.string.sample(81));
      await helper.setInputFixtureFile(helper.getInputThumbnail);
      await expect(helper.getSubmitBtn).toBeDisabled();
    });
  });

  test('if image choosed, show', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const fileName = '/file.svg';

    await helper.setInputFixtureFile(helper.getInputThumbnail, fileName);
    await expect(helper.getThumbnail).toHaveAttribute('src', fileName);
  });

  test('if ok, show', async ({ page, context }) => {
    const helper = new Helper(page, context);

    await helper.getTitle.fill(faker.string.sample(2));
    await helper.setInputFixtureFile(helper.getInputThumbnail);

    // disabled면 클릭 안함
    await helper.getSubmitBtn.click();

    const regexp = new RegExp(
      `^${helper.baseUrl}/contents/${uuidRegConcat.source}$`,
      'i'
    );
    await expect(page).toHaveURL(regexp);
  });
});

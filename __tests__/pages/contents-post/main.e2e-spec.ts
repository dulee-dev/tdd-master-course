import { Helper } from './helper';
import { authTest } from '@__tests__/playwright/auth-test';
import { faker } from '@faker-js/faker';
import { uuidRegConcat } from '@/libs/string-sub';
import { test, expect } from '@playwright/test';
import { userFixtures } from '@__tests__/fixtures/users';
import { mockInNode } from '@__tests__/mock-api/mock-in-node';
import { http, HttpResponse } from 'msw';
import { contentFixtures } from '@__tests__/fixtures/contents';
import { convertContentToContentView } from '@__tests__/libs/convert';

const url = '/contents/post';

test.describe('auth', () => {
  authTest.private(url);
});

test.describe('content-post-main', () => {
  test('', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const user = userFixtures[0];
    await helper.signIn(user.nickname);
    await helper.gotoTargetPage();
  });

  test('if visit page, submit disabled', async ({ page, context }) => {
    const helper = new Helper(page, context);

    await helper.gotoTargetPage();
    await expect(helper.getSubmitBtn).toBeDisabled();
  });

  test.describe('form invalid', () => {
    test('if title lenght 81, submit disabled', async ({ page, context }) => {
      const helper = new Helper(page, context);
      await helper.getTitle.fill(faker.string.sample(81));
      await helper.setInputFixtureFile(helper.getInputThumbnail);

      await expect(helper.getSubmitBtn).toBeDisabled();
    });

    test('if no image, submit disabled', async ({ page, context }) => {
      const helper = new Helper(page, context);
      await helper.getTitle.fill(faker.string.sample(2));

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
    const title = faker.string.sample(2);

    const helper = new Helper(page, context);
    const fileName = '/file.svg';

    await helper.getTitle.fill(title);
    await helper.setInputFixtureFile(helper.getInputThumbnail, fileName);
    await expect(helper.getThumbnail).toHaveAttribute('src', fileName);

    // disabled면 클릭 안함
    await helper.getSubmitBtn.click();

    const regexp = new RegExp(
      `^${helper.baseUrl}/contents/${uuidRegConcat.source}$`,
      'i'
    );
    await expect(page).toHaveURL(regexp);
    await expect(page.getByText(title)).toBeVisible();
  });
});

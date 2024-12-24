import { test, expect } from '@playwright/test';
import { Helper } from './helper';
import { authTest } from '@__tests__/playwright/auth-test';
import { faker } from '@faker-js/faker';
import { uuidRegConcat } from '@/libs/string-sub';

const url = '/contents/post';

test.describe('auth', () => {
  authTest.private(url);
});

test.describe('content-post-main', () => {
  test.beforeEach(async ({ page, context }) => {
    const helper = new Helper(page, context);
    await helper.signIn('dulee');
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

    await helper.setInputFixtureFile(helper.getInputThumbnail);
    await expect(page.getByText('file.svg')).toBeVisible();
  });

  test('if ok, show', async ({ page, context }) => {
    const helper = new Helper(page, context);

    await helper.getTitle.fill(faker.string.sample(2));
    await helper.setInputFixtureFile(helper.getInputThumbnail);

    // disabled면 클릭 안함
    await helper.getSubmitBtn.click();

    const regexp = new RegExp(
      `^${helper.baseUrl}/contents/${uuidRegConcat}$`,
      'i'
    );
    await expect(page).toHaveURL(regexp);
  });
});

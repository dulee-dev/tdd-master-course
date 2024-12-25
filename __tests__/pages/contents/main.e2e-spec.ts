import { contentFixtures } from '@__tests__/fixtures/contents';
import { authTest } from '@__tests__/playwright/auth-test';
import { test, expect } from '@playwright/test';
import { Helper } from './helper';

const path = '/contents';

test.describe('auth guard', () => {
  authTest.both(path);
});

test.describe('contents page', () => {
  test.beforeEach(async ({ page, context }) => {
    const helper = new Helper(page, context);
    await helper.gotoTargetPage();
  });

  test.describe('pagination', () => {
    test('init', async ({ page, context }) => {
      const helper = new Helper(page, context);

      await expect(helper.getItems).toHaveCount(12);
      await expect(helper.getPagiBtn(2)).toBeVisible();
      await expect(helper.getPagiBtn(3)).toBeHidden();

      await helper.getPagiBtn(2).click();
      await expect(helper.getItems).toHaveCount(2);
    });
  });

  test.describe('sorting', () => {
    test('init', async ({ page, context }) => {
      const helper = new Helper(page, context);

      await expect(
        helper.getItems.first().getByText('2024년 12월 30일')
      ).toBeVisible();
    });

    test('select title-asc', async ({ page, context }) => {
      const helper = new Helper(page, context);
      await helper.getSort.selectOption('제목순');

      await expect(helper.getItems.first().getByText('00000')).toBeVisible();
    });
  });

  test('search', async ({ page, context }) => {
    const content = contentFixtures[2];
    const helper = new Helper(page, context);

    await helper.getSearch.fill(content.title.slice(0, 5));
    await helper.getSubmitSearch.click();
    await expect(helper.getItems).toHaveCount(1);
  });
});

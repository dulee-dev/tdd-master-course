import { contentFixtures } from '@__tests__/fixtures/contents';
import { userFixtures } from '@__tests__/fixtures/users';
import { authTest } from '@__tests__/playwright/auth-test';
import { test, expect } from '@playwright/test';
import { Helper } from './helper';
import { onlyMock } from '@__tests__/playwright/skip-if';

const getPath = (contentId: string): string => {
  return `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/contents/${contentId}`;
};

test.describe('auth guard', () => {
  const path = getPath(contentFixtures[0].id);
  authTest.both(path);
});

test('find redirect', async ({ page }) => {
  const path = getPath('asdf');
  await page.goto(path);

  await expect(page).toHaveURL(
    `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/contents`
  );
});

test.describe('contents detail main', () => {
  test('init status', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];

    const path = getPath(content.id);
    await page.goto(path);
    await expect(page.getByText(content.title)).toBeVisible();
    await expect(page.getByText(content.body)).toBeVisible();
    await expect(page.getByText('2024년 12월 24일')).toBeVisible();
    await expect(
      helper.getMain.getByText(userFixtures[0].nickname)
    ).toBeVisible();
  });

  test.describe('action btns', () => {
    test('if not same user, actions hidden', async ({ page, context }) => {
      const helper = new Helper(page, context);
      const content = contentFixtures[0];
      const auth = userFixtures[1].nickname;

      const path = getPath(content.id);
      await helper.signIn(auth);
      await page.goto(path);

      await expect(helper.getEditBtn).toBeHidden();
    });

    test('if same user, actions visible', async ({ page, context }) => {
      const helper = new Helper(page, context);
      const content = contentFixtures[0];
      const auth = userFixtures[0].nickname;

      const path = getPath(content.id);
      await helper.signIn(auth);
      await page.goto(path);

      await expect(helper.getEditBtn).toBeVisible();
    });
  });
});

test.describe('contents detail author aside', () => {
  test('init status', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];

    const path = getPath(content.id);
    await page.goto(path);
    await expect(
      helper.getAuthorAside.getByText(userFixtures[0].nickname)
    ).toBeVisible();
  });
});

test.describe('comment form', () => {
  test('if not sign-in user click textarea, goto sign-in page', async ({
    page,
    context,
  }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];

    const path = getPath(content.id);

    await page.goto(path);
    await helper.getCommentTextarea.click();
    await helper.assertStrictPage('/users/sign-in');
  });

  test('if sign-in user click textarea, nothing', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];
    const path = getPath(content.id);

    await helper.signIn(user.nickname);
    await page.goto(path);
    await helper.getCommentTextarea.click();
    await expect(page).not.toHaveURL('/users/sign-in');
  });
});

test.describe('delete', () => {
  test('success', async ({ page, context }) => {
    onlyMock();
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];
    const path = getPath(content.id);

    await helper.signIn(user.nickname);
    await page.goto(path);
    await helper.getDeleteBtn.click();

    await expect(page.getByText('삭제 성공')).toBeVisible();
  });
});

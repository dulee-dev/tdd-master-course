import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page, expect } from '@playwright/test';

export class Helper extends BaseHelper {
  readonly getMain: Locator;
  readonly getEditBtn: Locator;

  readonly getAuthorAside: Locator;

  readonly getCommentTextarea: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getMain = page.getByRole('main');
    this.getEditBtn = page.getByRole('link', { name: '수정', exact: true });
    this.getAuthorAside = page.getByRole('complementary', { name: 'author' });
    this.getCommentTextarea = page.getByPlaceholder('댓글을 작성하세요');
  }
}

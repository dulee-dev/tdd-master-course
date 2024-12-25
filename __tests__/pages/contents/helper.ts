import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page, expect } from '@playwright/test';

export class Helper extends BaseHelper {
  readonly getPagination: Locator;
  readonly getItems: Locator;
  readonly getSearch: Locator;
  readonly getSubmitSearch: Locator;
  readonly getSort: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getPagination = this.page.getByTestId('pagination');
    this.getItems = this.page.getByTestId('content-item');
    this.getSearch = this.page.getByLabel('search', { exact: true });
    this.getSubmitSearch = this.page.getByLabel('submit-search');
    this.getSort = this.page.getByLabel('sort');
  }

  async gotoTargetPage() {
    await this.page.goto('/contents');
    await this.assertStrictPage('/contents');
  }

  getPagiBtn(num: number) {
    return this.getPagination.getByRole('button', { name: num + '' });
  }
}

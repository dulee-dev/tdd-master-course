import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page, expect } from '@playwright/test';

export class Helper extends BaseHelper {
  url = '/contents/post';

  readonly getTitle: Locator;
  readonly getBody: Locator;
  readonly getInputThumbnail: Locator;
  readonly getThumbnail: Locator;
  readonly getSubmitBtn: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getTitle = page.getByLabel('제목');
    this.getBody = page.getByLabel('본문');
    this.getInputThumbnail = page.getByLabel('thumbnail');
    this.getThumbnail = page.getByAltText('thumbnail');
    this.getSubmitBtn = page.getByRole('button', {
      name: '생성하기',
    });
  }

  async gotoTargetPage() {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(this.baseUrl + this.url);
  }
}

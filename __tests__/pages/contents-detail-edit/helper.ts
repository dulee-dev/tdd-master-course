import { Content } from '@/domains/content/content.entity';
import { User } from '@/domains/user/user.entity';
import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page, expect } from '@playwright/test';

const calcUrl = (id: string): string => `/contents/${id}/edit`;

export class Helper extends BaseHelper {
  readonly getForm: Locator;
  readonly getTitle: Locator;
  readonly getBody: Locator;
  readonly getInputThumbnail: Locator;
  readonly getThumbnail: Locator;
  readonly getSubmitBtn: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getForm = page.getByRole('form');
    this.getTitle = page.getByLabel('제목');
    this.getBody = page.getByLabel('본문');
    this.getInputThumbnail = page.getByLabel('thumbnail');
    this.getThumbnail = page.getByAltText('thumbnail');
    this.getSubmitBtn = page.getByRole('button', { name: '수정하기' });
  }

  async initial(user: User, content: Content, assert?: boolean) {
    const url = calcUrl(content.id);

    await this.signIn(user.nickname);
    await this.page.goto(url);
    if (assert) await expect(this.page).toHaveURL(url);
  }
}

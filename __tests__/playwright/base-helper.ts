import { BrowserContext, Locator, type Page } from '@playwright/test';
import path from 'path';

export class BaseHelper {
  readonly baseUrl: string;
  readonly page: Page;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.baseUrl = process.env.WEB_BASE_URL;
  }

  async signIn(nickname: string): Promise<void> {
    await this.context.addCookies([
      {
        name: 'authorization',
        value: nickname,
        url: this.baseUrl,
      },
    ]);
  }

  async setInputFixtureFile(locator: Locator, fileName = 'file.svg') {
    await locator.setInputFiles(path.join('__tests__', 'fixtures', fileName));
  }
}
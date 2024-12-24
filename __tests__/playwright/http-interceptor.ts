import { handlers } from '@__tests__/mock-api';
import { test as base, expect } from '@playwright/test';
import { http } from 'msw';
import type { MockServiceWorker } from 'playwright-msw';
import { createWorkerFixture } from 'playwright-msw';

const test =
  process.env.MOCK === 'true'
    ? base.extend<{
        worker: MockServiceWorker;
        http: typeof http;
      }>({
        worker: createWorkerFixture(handlers),
        http,
      })
    : base;

export { expect, test };

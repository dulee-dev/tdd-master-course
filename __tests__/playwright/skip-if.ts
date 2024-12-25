import test from '@playwright/test';

export const onlyMock = () =>
  test.skip(process.env.NEXT_PUBLIC_MOCK !== 'true', 'only in Mock');

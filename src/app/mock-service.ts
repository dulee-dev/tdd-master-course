import { mockInNode } from '@__tests__/mock-api/mock-in-node';

if (process.env.MOCK === 'true') {
  // 원래는 필요 없는데말이지
  if (typeof window !== 'undefined') {
    import('@__tests__/mock-api/mock-in-browser').then(({ mockInBrowser }) =>
      mockInBrowser.start()
    );
  } else {
    mockInNode.listen();
  }
}

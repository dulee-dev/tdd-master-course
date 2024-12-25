import { mockInNode } from '@__tests__/mock-api/mock-in-node';

if (process.env.NEXT_PUBLIC_MOCK === 'true') {
  // 원래는 필요 없는데말이지 웬지 없으면 오류남
  if (typeof window !== 'undefined') {
    import('@__tests__/mock-api/mock-in-browser').then(({ mockInBrowser }) =>
      mockInBrowser.start()
    );
  } else {
    mockInNode.listen();
  }
}

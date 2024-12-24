import { mockInNode } from '@__tests__/mock-api/mock-in-node';

if (process.env.MOCK === 'true') {
  if (typeof window !== 'undefined') {
    // import('@__tests__/mock-api/mock-in-browser').then(({ mockInBrowser }) =>
    //   mockInBrowser.start()
    // );
  } else {
    mockInNode.listen();
  }
}

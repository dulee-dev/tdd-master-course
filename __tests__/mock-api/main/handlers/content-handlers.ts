import { http, HttpResponse } from 'msw';
import { Content } from '@/domains/content/content.entity';
import { contentFixtures } from '@__tests__/fixtures/contents';
import { faker } from '@faker-js/faker';

export const contentHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`, () => {
    return HttpResponse.json<{ contents: Content[] }>({
      contents: contentFixtures,
    });
  }),

  http.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`,
    async ({ request }) => {
      const auth = request.headers.get('authorization');
      if (!auth)
        return HttpResponse.json({
          status: 401,
        });

      const prototype = (await request.json()) as Omit<Content, 'id'>;

      return HttpResponse.json({
        content: {
          id: faker.string.uuid(),
          ...prototype,
        },
        status: 201,
      });
    }
  ),
];

import { http, HttpResponse } from 'msw';
import { Content } from '@/domains/content/content.entity';
import { contentFixtures } from '@__tests__/fixtures/contents';
import { userFixtures } from '@__tests__/fixtures/users';
import { convertContentToContentView } from '@__tests__/libs/convert';
import { ContentView } from '@/domains/content/type';

export const contentHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/count`,
    ({ request }) => {
      const url = new URL(request.url);
      const qRaw = url.searchParams.get('q');
      if (!qRaw)
        return HttpResponse.json<{ count: number; status: 200 }>({
          count: contentFixtures.length,
          status: 200,
        });

      return HttpResponse.json<{ count: number; status: 200 }>({
        count: contentFixtures.filter((c) => c.title.includes(qRaw)).length,
        status: 200,
      });
    }
  ),

  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/:id`,
    ({ params }) => {
      const id = params.id;
      const author = userFixtures[0];

      const found = contentFixtures.find((c) => c.id === id);
      if (!found)
        return HttpResponse.json({
          status: 404,
        });

      return HttpResponse.json({
        content: convertContentToContentView(found, author),
        status: 200,
      });
    }
  ),

  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/contents/:id`,
    ({ params, request }) => {
      const id = params.id;
      const content = contentFixtures[0];
      if (id !== content.id)
        return HttpResponse.json({
          status: 404,
        });

      const author = userFixtures[0];
      const auth = request.headers.get('authorization');
      if (auth !== author.nickname)
        return HttpResponse.json({
          status: 404,
        });

      return HttpResponse.json({
        content: convertContentToContentView(content, author),
        status: 200,
      });
    }
  ),

  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`,
    ({ request }) => {
      const url = new URL(request.url);
      const pageNumRaw = url.searchParams.get('pageNum');
      const pageTakeRaw = url.searchParams.get('pageTake');
      const sort = url.searchParams.get('sort');
      const q = url.searchParams.get('q');

      const pageNum = pageNumRaw === null ? 1 : +pageNumRaw;
      const pageTake = pageTakeRaw === null ? 12 : +pageTakeRaw;

      const startAt = (pageNum - 1) * pageTake;
      const endAt = pageNum * pageTake;
      return HttpResponse.json<{ contents: ContentView[]; status: 200 }>({
        contents: contentFixtures
          .filter((c) => (q === null ? true : c.title.includes(q)))
          .sort((a, b) => {
            if (sort === 'title-asc') {
              return a.title.localeCompare(b.title);
            }
            return b.createdAt.getTime() - a.createdAt.getTime();
          })
          .slice(startAt, endAt)
          .map((c) => convertContentToContentView(c, userFixtures[0])),
        status: 200,
      });
    }
  ),

  /**
   * only user[0] is authorized
   */
  http.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`,
    async ({ request }) => {
      const auth = request.headers.get('authorization');
      if (auth !== userFixtures[0].nickname)
        return HttpResponse.json({
          status: 401,
        });

      const prototype = (await request.json()) as Omit<
        Content,
        'id' | 'createdAt' | 'authorId'
      >;

      return HttpResponse.json({
        content: {
          id: contentFixtures[3].id,
          ...prototype,
        },
        status: 201,
      });
    }
  ),

  /**
   * only content[0] with user[0] success
   */
  http.patch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/:id`,
    async ({ params, request }) => {
      const id = params.id;
      const content = contentFixtures[0];
      const author = userFixtures[0];

      const auth = request.headers.get('authorization');

      const body = (await request.json()) as {};

      if (id !== content.id || auth !== author.nickname)
        return HttpResponse.json({
          status: 404,
        });

      return HttpResponse.json({
        content: convertContentToContentView({ ...content, ...body }, author),
        status: 200,
      });
    }
  ),

  /**
   * only content0 and user0 pass
   */
  http.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/:id`,
    async ({ params, request }) => {
      const id = params.id;
      const content = contentFixtures[0];
      const author = userFixtures[0];

      const auth = request.headers.get('authorization');

      if (id !== content.id || auth !== author.nickname)
        return HttpResponse.json({
          status: 404,
        });

      return HttpResponse.json({
        status: 200,
      });
    }
  ),
];

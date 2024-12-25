import { Content } from '@/domains/content/content.entity';
import { ContentView } from '@/domains/content/type';
import queryString from 'query-string';

export const contentApi = {
  async findAll(query: {
    pageNum: number;
    pageTake: number;
    sort?: 'createdAt-desc' | 'title-asc';
    q?: string;
  }): Promise<{ contents: ContentView[]; status: 200 }> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        '/contents?' +
        queryString.stringify(query)
    );
    const json = await res.json();
    return json;
  },

  async findOne(
    id: string
  ): Promise<{ content: ContentView; status: 200 } | { status: 404 }> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/contents/' + id
    );
    const json = await res.json();
    return json;
  },

  async findMyOne(
    id: string,
    authorization: string
  ): Promise<
    { content: ContentView; status: 200 } | { status: 404 } | { status: 401 }
  > {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/users/me/contents/' + id,
      {
        headers: {
          authorization,
        },
      }
    );
    const json = await res.json();
    return json;
  },

  async countAll(q?: string): Promise<{ count: number; status: 200 }> {
    let path = process.env.NEXT_PUBLIC_API_BASE_URL + '/contents/count';

    if (q) {
      path += '?' + queryString.stringify({ q });
    }
    const res = await fetch(path);
    const json = await res.json();
    return json;
  },

  async createOne(
    body: Omit<Content, 'id' | 'createdAt' | 'authorId'>,
    authorization: string
  ): Promise<{ content: Content; status: 201 } | { status: 401 }> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/contents',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
        body: JSON.stringify(body),
      }
    );
    const json = await res.json();
    return json;
  },
};

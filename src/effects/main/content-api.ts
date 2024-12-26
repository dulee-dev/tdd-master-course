import { Content } from '@/domains/content/content.entity';
import { ContentView } from '@/domains/content/type';
import superjson from 'superjson';
import queryString from 'query-string';
import { jsonDateParser } from 'json-date-parser';

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
    const text = await res.text();
    const json = JSON.parse(text, jsonDateParser);
    return json;
  },

  async findOne(
    id: string
  ): Promise<{ content: ContentView; status: 200 } | { status: 404 }> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/contents/' + id
    );
    const text = await res.text();
    const json = JSON.parse(text, jsonDateParser);
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
    const text = await res.text();
    const json = JSON.parse(text, jsonDateParser);
    return json;
  },

  async countAll(q?: string): Promise<{ count: number; status: 200 }> {
    let path = process.env.NEXT_PUBLIC_API_BASE_URL + '/contents/count';

    if (q) {
      path += '?' + queryString.stringify({ q });
    }
    const res = await fetch(path);
    const text = await res.text();
    const json = JSON.parse(text, jsonDateParser);
    return json;
  },

  async createOne(
    body: Omit<Content, 'id' | 'createdAt' | 'authorId'>,
    authorization: string
  ): Promise<{ content: Content; status: 201 } | { status: 401 }> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/contents',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
        body: JSON.stringify(body),
      }
    );
    const text = await res.text();
    const json = JSON.parse(text, jsonDateParser);
    return json;
  },

  async updateOne(
    body: Omit<Content, 'id' | 'createdAt' | 'authorId'>,
    authorization: string,
    id: string
  ): Promise<{ content: Content; status: 200 } | { status: 404 }> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/contents/' + id,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
        body: JSON.stringify(body),
      }
    );
    const text = await res.text();
    const json = JSON.parse(text, jsonDateParser);
    return json;
  },

  async removeOne(
    authorization: string,
    id: string
  ): Promise<{ status: 200 } | { status: 404 }> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/contents/' + id,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      }
    );
    const text = await res.text();
    const json = JSON.parse(text, jsonDateParser);
    return json;
  },
};

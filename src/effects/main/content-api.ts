import { Content } from '@/domains/content/content.entity';

export const contentApi = {
  async createOne(
    body: Omit<Content, 'id'>,
    authorization: string
  ): Promise<{ content: Content; status: 201 } | { status: 401 }> {
    const res = await fetch(process.env.API_BASE_URL + '/contents', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    return json;
  },
};

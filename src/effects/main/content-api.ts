import { Content } from '@/domains/content/content.entity';

export const contentApi = {
  async createOne(
    body: Omit<Content, 'id'>,
    authorization: string
  ): Promise<{ content: Content; status: 201 } | { status: 401 }> {
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL + '/contents');
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

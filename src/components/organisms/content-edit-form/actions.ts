'use server';

import { Content } from '@/domains/content/content.entity';
import { ContentPartial } from '@/domains/content/type';
import { getAuthCookie } from '@/effects/main/auth-cookie-handler';
import { contentApi } from '@/effects/main/content-api';

export const updateContent = async (
  proto: ContentPartial,
  id: string
): Promise<Content | undefined> => {
  const auth = await getAuthCookie();
  if (!auth) return undefined;

  const response = await contentApi.updateOne(proto, auth, id);

  if (response.status !== 200) return undefined;

  return response.content;
};

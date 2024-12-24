'use server';

import { Content } from '@/domains/content/content.entity';
import { ContentProto } from '@/domains/content/type';
import { getAuthCookie } from '@/effects/main/auth-cookie-handler';
import { contentApi } from '@/effects/main/content-api';

export const createContent = async (
  proto: ContentProto
): Promise<Content | undefined> => {
  const auth = await getAuthCookie();
  if (!auth) return undefined;

  const response = await contentApi.createOne(proto, auth);
  console.log(response);

  if (response.status !== 201) return undefined;

  return response.content;
};

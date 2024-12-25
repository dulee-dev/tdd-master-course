'use server';

import { getAuthCookie } from '@/effects/main/auth-cookie-handler';
import { contentApi } from '@/effects/main/content-api';

export const removeAction = async (id: string): Promise<boolean> => {
  const auth = await getAuthCookie();
  if (!auth) return false;

  const response = await contentApi.removeOne(auth, id);

  if (response.status !== 200) return false;
  return true;
};

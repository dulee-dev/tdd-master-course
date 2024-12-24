'use server';

import { cookies } from 'next/headers';

export const getAuthCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('authorization');

  return token?.value;
};

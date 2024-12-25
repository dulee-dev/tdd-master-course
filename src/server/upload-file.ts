'use server';

import { uploadImage } from '@/effects/cdn/cdn';

export const uploadImageAction = async (fileName: string): Promise<string> => {
  const result = await uploadImage(fileName);
  return result;
};

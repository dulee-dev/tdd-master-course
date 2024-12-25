'use server';

import { contentApi } from '@/effects/main/content-api';

export const loadCnt = async (q?: string) => {
  const response = await contentApi.countAll(q);
  if (response.status !== 200) return 0;
  return response.count;
};

export const loadContents = async ({
  pageNum,
  pageTake,
  sort,
  q,
}: {
  pageNum: number;
  pageTake: number;
  sort?: string;
  q?: string;
}) => {
  const _sort = sort === 'title-asc' ? sort : 'createdAt-desc';
  const response = await contentApi.findAll({
    pageNum,
    pageTake,
    sort: _sort,
    q,
  });

  if (response.status !== 200) return [];
  return response.contents;
};

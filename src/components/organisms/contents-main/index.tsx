'use client';

import { ContentGrid } from '@/components/molecules/contents-grid';
import { Pagination } from '@/components/molecules/pagination';
import { Search } from '@/components/molecules/search-input';
import { useInputText } from '@/hooks/use-input-text.hook';
import { useSelect } from '@/hooks/use-select.hook';
import { layoutMx } from '@/styles/layout.styles';
import clsx from 'clsx';
import { usePagination } from './hooks/use-pagination';
import { useContents } from './hooks/use-contents';

interface Props {
  className?: string;
}

export const ContentsMain = (props: Props) => {
  const { value: search, onChange: onChangeSearch } = useInputText('');
  const { value: sort, onChange: onChangeSort } = useSelect('createdAt-desc');
  const { pages, loc, onClickPage } = usePagination(
    search === '' ? undefined : search
  );

  const { contents, onSubmit } = useContents({
    loc,
    sort,
    q: search === '' ? undefined : search,
  });

  return (
    <div className={clsx(layoutMx, props.className)}>
      <div className={'flex items-center'}>
        <select
          aria-label="sort"
          name="sort"
          id="sort"
          className="bg-neutral-800 text-neutral-100 px-2 py-1 rounded mr-4"
          value={sort}
          onChange={onChangeSort}
        >
          <option value="createdAt-desc">최신순</option>
          <option value="title-asc">제목순</option>
        </select>

        <Search
          className={'max-w-96 mx-auto flex-1'}
          search={search}
          onChange={onChangeSearch}
          onSubmit={onSubmit}
        />
      </div>

      <ContentGrid contents={contents} className="mt-8" />
      <Pagination
        className="mt-4"
        pages={pages}
        loc={loc}
        onClickPage={onClickPage}
      />
    </div>
  );
};

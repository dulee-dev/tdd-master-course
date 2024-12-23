import { ContentGrid } from '@/components/molecules/contents-grid';
import { Pagination } from '@/components/molecules/pagination';
import { Search } from '@/components/molecules/search-input';
import { layoutMx } from '@/styles/layout.styles';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const ContentsMain = (props: Props) => {
  return (
    <div className={clsx(layoutMx, props.className)}>
      <div className={'flex items-center'}>
        <select
          name="sort"
          id="sort"
          className="bg-neutral-800 text-neutral-100 px-2 py-1 rounded mr-4"
        >
          <option value="createdAt-desc">최신순</option>
          <option value="title-asc">제목순</option>
        </select>

        <Search className={'max-w-96 mx-auto flex-1'} />
      </div>

      <ContentGrid />
      <Pagination className="mt-4" />
    </div>
  );
};

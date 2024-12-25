import { contentFixtures } from '@__tests__/fixtures/contents';
import clsx from 'clsx';

export const DevNav = () => {
  return (
    <div className={clsx('fixed right-8 bottom-8')}>
      <div>
        <a href="/contents">콘텐츠</a>
      </div>
      <div>
        <a href={`/contents/${contentFixtures[0].id}`}>콘텐츠 상세페이지 </a>
      </div>
      <div>
        <a href={`/contents/adsfadsf`}>콘텐츠 상세페이지 void</a>
      </div>
      <div>
        <a href="/contents/post">콘텐츠 생성</a>
      </div>
      <div>
        <a href={`/contents/${contentFixtures[0].id}/edit`}>콘텐츠 수정</a>
      </div>
    </div>
  );
};

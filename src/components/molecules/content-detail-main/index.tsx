import { layoutMx } from '@/styles/layout.styles';
import { middleDot } from '@/utils/string/constant';
import clsx from 'clsx';

interface Props {
  className?: string;
  user?: {
    nickname: string;
  };
}

export const ContentDetailMain = (props: Props) => {
  return (
    <main className={clsx(layoutMx, props.className)}>
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-normal">
          (번역) 자바스크립트의 Scheduler API 활용하기
        </h1>
        <div>
          <span>{'두리'}</span>
          {` `}
          {middleDot}
          {` `}
          <span>{'2024년 12월 12일'}</span>
        </div>
        {true && (
          <div className="flex justify-end">
            <button className="mr-4">수정</button>
            <button>삭제</button>
          </div>
        )}
      </header>
      <div>
        자바스크립트의 Scheduler API는 웹 앱에서 작업 우선순위를 관리할 수 있는
        표준화된 접근 방식을 도입했습니다. 자바스크립트 개발자들은 오래전부터
        메인 스레드에 작업을 양보하기 위해 setTimeout(0)에 의존해 왔지만, 새로운
        Scheduler API를 통해 작업을 언제 어떻게 실행할지 더 세밀하게 제어할 수
        있습니다. 메인 스레드에 위임하기 위해 사용했던 전통적인 setTimeout 접근
        방식은 세분화된 제어와 적절한 우선순위 관리 기능이 부족했습니다.
        Scheduler API는 보다 강력한 해결책을 제공함으로써 이러한 단점을
        해결합니다.
      </div>
    </main>
  );
};

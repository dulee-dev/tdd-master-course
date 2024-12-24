import { MswWrapper } from '@/components/msw-wrapper';
import { Test } from '@/components/msw-wrapper/test';

export default function Home() {
  return (
    <div>
      <MswWrapper>
        <Test />
      </MswWrapper>
      <h1 className={'mt-20 text-center text-4xl font-bold leading-snug'}>
        <div className="text-neutral-200">Nextjs와</div>
        <div className="text-neutral-200">Playwright, Vitest로</div>
        <div className="text-green-400">TDD 마스터하기</div>
      </h1>
    </div>
  );
}

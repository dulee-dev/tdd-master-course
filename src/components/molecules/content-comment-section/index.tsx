'use client';

import clsx from 'clsx';
import { layoutMx } from '@/styles/layout.styles';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  user?: { nickname: string };
}

export const ContentCommentSection = (props: Props) => {
  const router = useRouter();

  const onClick = () => {
    if (!props.user) router.push('/users/sign-in');
  };

  return (
    <section className={clsx(layoutMx, props.className)}>
      <form>
        <textarea
          name="comment"
          id="comment"
          placeholder="댓글을 작성하세요"
          className="w-full bg-neutral-800 p-4 rounded resize-none outline-none"
          onClick={onClick}
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            className="bg-green-300 text-black px-4 py-2 rounded"
            type="button"
          >
            댓글 작성
          </button>
        </div>
      </form>
    </section>
  );
};

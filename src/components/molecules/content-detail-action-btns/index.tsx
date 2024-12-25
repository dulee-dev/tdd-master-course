'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { removeAction } from './server';

interface Props {
  className?: string;
}

export const ContentDetailActionBtns = (props: Props) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const onClickDelete = async () => {
    const ok = await removeAction(params.id);

    if (!ok) {
      toast('삭제 실패');
      return;
    }

    router.push('/contents');
    toast('삭제 성공');
  };

  return (
    <div className={clsx('flex justify-end', props.className)}>
      <Link href={`/contents/${params.id}/edit`} className="mr-4">
        수정
      </Link>
      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
};

import { Header } from '@/components/organisms/header';
import { cookies } from 'next/headers';
import { ContentDetailMain } from '@/components/molecules/content-detail-main';
import { ContentAuthorAside } from '@/components/molecules/content-author-aside';
import { ContentCommentSection } from '@/components/molecules/content-comment-section';
import { Footer } from '@/components/organisms/footer';
import { contentApi } from '@/effects/main/content-api';
import { redirect } from 'next/navigation';

export default async function Contents({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await contentApi.findOne(id);
  if (response.status !== 200) {
    redirect('/contents');
  }

  const cookieStore = await cookies();
  const userNickname = cookieStore.get('authorization')?.value;

  return (
    <>
      <Header user={userNickname ? { nickname: userNickname } : undefined} />
      <ContentDetailMain
        className="mt-8"
        content={response.content}
        auth={
          userNickname !== undefined &&
          userNickname === response.content.author.nickname
        }
      />
      <ContentAuthorAside
        nickname={response.content.author.nickname}
        className="mt-8"
      />
      <ContentCommentSection
        className="mt-8"
        user={userNickname ? { nickname: userNickname } : undefined}
      />
      <Footer className="mt-12" />
    </>
  );
}

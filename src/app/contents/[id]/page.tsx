import { Header } from '@/components/organisms/header';
import { cookies } from 'next/headers';
import { ContentDetailMain } from '@/components/molecules/content-detail-main';
import { ContentAuthorAside } from '@/components/molecules/content-author-aside';
import { ContentCommentSection } from '@/components/molecules/content-comment-section';
import { Footer } from '@/components/organisms/footer';

export default async function Contents() {
  const cookieStore = await cookies();
  const userNickname = cookieStore.get('authorization')?.value;

  return (
    <>
      <Header userNickname={userNickname} />
      <ContentDetailMain className="mt-8" />
      <ContentAuthorAside className="mt-8" />
      <ContentCommentSection className="mt-8" />
      <Footer className="mt-12" />
    </>
  );
}

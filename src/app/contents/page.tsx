import { ContentsMain } from '@/components/organisms/contents-main';
import { Footer } from '@/components/organisms/footer';
import { Header } from '@/components/organisms/header';
import { cookies } from 'next/headers';

export default async function Contents() {
  const cookieStore = await cookies();
  const userNickname = cookieStore.get('authorization')?.value;

  return (
    <>
      <Header user={userNickname ? { nickname: userNickname } : undefined} />
      <ContentsMain className="mb-20" />
      <Footer />
    </>
  );
}

import { Header } from '@/components/organisms/header';
import { cookies } from 'next/headers';
import { Footer } from '@/components/organisms/footer';
import { ContentForm } from '@/components/molecules/content-form';

export default async function ContentsPost() {
  const cookieStore = await cookies();
  const userNickname = cookieStore.get('authorization')?.value;

  return (
    <>
      <Header userNickname={userNickname} />
      <ContentForm className="mb-20" />
      <Footer />
    </>
  );
}

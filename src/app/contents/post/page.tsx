import { Header } from '@/components/organisms/header';
import { cookies } from 'next/headers';
import { Footer } from '@/components/organisms/footer';
import { ContentForm } from '@/components/organisms/content-form';
import { redirect } from 'next/navigation';

export default async function ContentsPost() {
  const cookieStore = await cookies();
  const userNickname = cookieStore.get('authorization')?.value;
  if (!userNickname) redirect('/users/sign-in');

  return (
    <>
      <Header user={{ nickname: userNickname }} />
      <ContentForm className="mb-20" user={{ nickname: userNickname }} />
      <Footer />
    </>
  );
}

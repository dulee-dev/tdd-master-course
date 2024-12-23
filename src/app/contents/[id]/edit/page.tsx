import { Header } from '@/components/organisms/header';
import { cookies } from 'next/headers';
import { Footer } from '@/components/organisms/footer';
import { ContentEditForm } from '@/components/molecules/content-edit-form';

export default async function ContentsEdit() {
  const cookieStore = await cookies();
  const userNickname = cookieStore.get('authorization')?.value;

  return (
    <>
      <Header userNickname={userNickname} />
      <ContentEditForm className="mb-20" />
      <Footer />
    </>
  );
}

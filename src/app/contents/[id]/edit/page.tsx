import { Header } from '@/components/organisms/header';
import { cookies } from 'next/headers';
import { Footer } from '@/components/organisms/footer';
import { ContentEditForm } from '@/components/organisms/content-edit-form';
import { contentApi } from '@/effects/main/content-api';
import { redirect } from 'next/navigation';

export default async function ContentsEdit({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = await cookies();
  const userNickname = cookieStore.get('authorization')?.value;
  if (!userNickname) redirect('/users/sign-in');

  const { id } = params;
  const response = await contentApi.findMyOne(id, userNickname);
  if (response.status !== 200) {
    redirect('/contents');
  }

  return (
    <>
      <Header user={userNickname ? { nickname: userNickname } : undefined} />
      <ContentEditForm className="mb-20" content={response.content} />
      <Footer />
    </>
  );
}

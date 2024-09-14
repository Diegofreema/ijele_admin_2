import { NextPage } from 'next';
import { SideNav } from './_component/SideNav';
import { MainApp } from './_component/MainApp';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const layout: NextPage<Props> = ({ children }): JSX.Element => {
  const userId = cookies().get('userId').value;
  if (!userId) return redirect('/auth/sign-in');
  return (
    <div className="min-h-screen">
      <SideNav />
      <MainApp>{children}</MainApp>
    </div>
  );
};

export default layout;

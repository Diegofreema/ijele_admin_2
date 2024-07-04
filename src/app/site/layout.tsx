import { NextPage } from 'next';
import { SideNav } from './_component/SideNav';
import { MainApp } from './_component/MainApp';

interface Props {
  children: React.ReactNode;
}

const layout: NextPage<Props> = ({ children }): JSX.Element => {
  return (
    <div className="min-h-screen">
      <SideNav />
      <MainApp>{children}</MainApp>
    </div>
  );
};

export default layout;

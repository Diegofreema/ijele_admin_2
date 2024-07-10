import { getMembers, getTotalMembers } from '../../../../actions/data.actions';
import { Members } from './_component/Members';

interface Props {}

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const currentPage = Number(searchParams.page) || 1;
  const memberData = getMembers(currentPage);
  const countData = getTotalMembers();

  const [count, members] = await Promise.all([countData, memberData]);

  return <Members members={members} count={count} />;
};

export default page;

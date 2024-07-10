import { NextPage } from 'next';
import { Members } from '../_component/Members';
import { getSearch } from '../../../../../actions/data.actions';
import { SearchMembers } from '../_component/SearchMember';

interface Props {}

const page = async () => {
  const memberData = getSearch();

  const [member] = await Promise.all([memberData]);
  const { data } = member;
  return <SearchMembers members={data} />;
};

export default page;

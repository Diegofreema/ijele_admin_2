import {
  getAllMatches,
  getTotalMatches,
} from '../../../../actions/data.actions';
import { Matches } from './_component/Matches';

const page = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const currentPage = Number(searchParams.page) || 1;

  const matchesCount = getTotalMatches();
  const matchesData = getAllMatches(currentPage);
  const [count, matches] = await Promise.all([matchesCount, matchesData]);

  return <Matches count={count} matches={matches} />;
};

export default page;

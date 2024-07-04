import { getPlayers, getTotalPlayers } from '../../../../actions/data.actions';
import { Players } from './_component/Players';

const page = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const currentPage = Number(searchParams?.page) || 1;
  const playerCountData = getTotalPlayers();
  const playersData = getPlayers(currentPage);
  const [count, players] = await Promise.all([playerCountData, playersData]);
  return <Players count={count?.numberOfPlayers} players={players} />;
};

export default page;

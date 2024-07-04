import { notFound } from 'next/navigation';
import { getSinglePlayer } from '../../../../../actions/data.actions';
import { SinglePlayer } from '../_component/SinglePlayer';

const page = async ({ params }: { params: { id: string } }) => {
  if (!params?.id) return notFound();
  const player: any = await getSinglePlayer(+params.id);

  if (!player) return notFound();
  return <SinglePlayer player={player} />;
};

export default page;

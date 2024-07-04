import { notFound } from 'next/navigation';
import { SingleMatch } from '../_component/SingleMatch';
import { getSingleMatch } from '../../../../../actions/data.actions';

const page = async ({ params }: { params: { id: string } }) => {
  console.log(params?.id);
  if (!params?.id) return notFound();
  const match = await getSingleMatch(+params.id);
  return <SingleMatch match={match} />;
};

export default page;

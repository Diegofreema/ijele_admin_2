import { notFound } from 'next/navigation';
import { SingleMatch } from '../_component/SingleMatch';
import { getSingleMatch, getTicket } from '../../../../../actions/data.actions';

const page = async ({ params }: { params: { id: string } }) => {
  if (!params?.id) return notFound();
  const matchData = getSingleMatch(+params.id);
  const ticketData = getTicket(+params?.id);

  const [match, ticket] = await Promise.all([matchData, ticketData]);
  return <SingleMatch match={match} tickets={ticket} />;
};

export default page;

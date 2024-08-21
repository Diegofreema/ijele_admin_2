import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getPaginatedTickets } from '../../../../../actions/data.actions';
import { TicketComponent } from './_component/TicketComponent';

interface Props {
  searchParams: {
    id: string;
    page: string;
  };
}

const page = async ({ searchParams }: Props) => {
  if (!searchParams.id) {
    return notFound();
  }
  const currentPage = Number(searchParams.page) || 1;
  const tickets = await getPaginatedTickets(currentPage, +searchParams.id);

  return <TicketComponent tickets={tickets} />;
};

export default page;

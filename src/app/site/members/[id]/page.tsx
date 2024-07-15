import { SingleMember } from '../_component/SingleMember';
import { notFound } from 'next/navigation';
import { getSingleUser } from '../../../../../actions/data.actions';

interface Props {}

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    return notFound();
  }
  const user = await getSingleUser(params?.id);

  return <SingleMember user={user} />;
};

export default page;

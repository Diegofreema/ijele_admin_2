import { getSingleOrder } from '../../../../../actions/data.actions';
import { notFound } from 'next/navigation';
import { Order } from '../_component/Order';

interface Props {
  params: { singleOrder: string };
}

const page = async ({ params }: Props) => {
  console.log(params);
  if (!params.singleOrder) {
    return notFound();
  }
  const orderItem = await getSingleOrder(+params.singleOrder);
  console.log(orderItem);

  return <Order order={orderItem} id={params.singleOrder} />;
};

export default page;

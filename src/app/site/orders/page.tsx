import { getOrderCount, getOrders } from '../../../../actions/data.actions';
import { SingleOrder } from './_component/SingleOrder';

interface Props {}

const page = async ({ searchParams }: { searchParams: { page: string } }) => {
  const currentPage = Number(searchParams?.page) || 1;
  const countData = getOrderCount();
  const ordersData = getOrders(currentPage);

  const [count, orders] = await Promise.all([countData, ordersData]);
  return <SingleOrder orders={orders} count={count} />;
};

export default page;

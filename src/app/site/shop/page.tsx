import { NextPage } from 'next';
import { Goods } from './_component/Goods';
import {
  getProducts,
  getTotalProducts,
} from '../../../../actions/data.actions';

interface Props {}

const page = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const productsData = getProducts(currentPage);
  const countData = getTotalProducts();

  const [products, count] = await Promise.all([productsData, countData]);
  return <Goods products={products} count={count} />;
};

export default page;

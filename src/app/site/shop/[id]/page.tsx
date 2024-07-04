import { NextPage } from 'next';

import {
  getSingleNews,
  getSingleProduct,
} from '../../../../../actions/data.actions';
import { notFound } from 'next/navigation';
import { NewsType } from '../../../../../types';
import { SingleProduct } from '../_component/SingleProduct';

interface Props {}

const page = async ({ params }: { params: { id: string } }) => {
  console.log(params?.id);
  if (!params.id) {
    return notFound();
  }
  const singleProduct: any = await getSingleProduct(+params.id);
  if (!singleProduct) {
    return notFound();
  }
  return <SingleProduct singleProduct={singleProduct} />;
};

export default page;

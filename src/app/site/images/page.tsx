import { NextPage } from 'next';
import { ImageComponent, ImageSkeleton } from './_component/ImagComponent';
import { getImages, getTotalImages } from '../../../../actions/data.actions';
import { Suspense } from 'react';

interface Props {}

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const imageCount = getTotalImages();
  const imagesData = getImages(currentPage);
  const [count, images] = await Promise.all([imageCount, imagesData]);

  return <ImageComponent images={images?.data} count={count.numberOfImages} />;
};

export default Page;

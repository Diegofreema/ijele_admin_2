import { Suspense } from 'react';
import {
  getImages,
  getTotalImages,
  getTotalVideos,
  getVideos,
} from '../../../../actions/data.actions';
import { ImageSkeleton, VideoComponent } from './_component/VideoComponent';

interface Props {}

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const videoCount = getTotalVideos();
  const videoData = getVideos(currentPage);
  const [count, videos] = await Promise.all([videoCount, videoData]);

  return <VideoComponent videos={videos?.data} count={count?.numberOfVideos} />;
};

export default Page;

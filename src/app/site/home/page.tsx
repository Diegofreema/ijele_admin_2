import { NextPage } from 'next';
import { createClient } from '../../../../util/supabase/server';
import {
  getMatches,
  getTotalImages,
  getTotalMembers,
  getTotalNews,
  getTotalPlayers,
  getTotalProducts,
  getTotalVideos,
} from '../../../../actions/data.actions';
import { Home } from './_component/Home';

interface Props {}

const page = async ({}) => {
  const newsData = getTotalNews();
  const playersData = getTotalPlayers();
  const imagesData = getTotalImages();
  const videosData = getTotalVideos();
  const productData = getTotalProducts();
  const upcomingMatches = getMatches();
  const memberCount = getTotalMembers();

  const [news, players, images, videos, matches, products, member] =
    await Promise.all([
      newsData,
      playersData,
      imagesData,
      videosData,
      upcomingMatches,
      productData,
      memberCount,
    ]);

  const data = {
    numberOfPlayers: players?.numberOfPlayers,
    numberOFArticles: news?.numberOfArticles,
    numberOfImages: images?.numberOfImages,
    numberOfVideos: videos?.numberOfVideos,
    matches: matches?.matches,
    productsCount: products,
    memberCount: member,
  };
  return <Home data={data} />;
};

export default page;

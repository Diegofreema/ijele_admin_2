import { NextPage } from 'next';
import { createClient } from '../../../../util/supabase/server';
import {
  getMatches,
  getTotalImages,
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

  const [news, players, images, videos, matches, products] = await Promise.all([
    newsData,
    playersData,
    imagesData,
    videosData,
    upcomingMatches,
    productData,
  ]);

  const data = {
    numberOfPlayers: players?.numberOfPlayers,
    numberOFArticles: news?.numberOfArticles,
    numberOfImages: images?.numberOfImages,
    numberOfVideos: videos?.numberOfVideos,
    matches: matches?.matches,
    productsCount: products,
  };
  return <Home data={data} />;
};

export default page;

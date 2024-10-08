import { getNews, getTotalNews } from '../../../../actions/data.actions';
import { NewsComponent } from './_component/NewComponent';

interface Props {}

const page = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const newsData = getNews(currentPage);
  const countData = getTotalNews();

  const [news, count] = await Promise.all([newsData, countData]);

  return <NewsComponent news={news} count={count.numberOfArticles} />;
};

export default page;

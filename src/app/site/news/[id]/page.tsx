import { SingleArticles } from '../_component/SingleArticles';
import { getSingleNews } from '../../../../../actions/data.actions';
import { notFound } from 'next/navigation';

interface Props {}

const page = async ({ params }: { params: { id: string } }) => {
  console.log(params?.id);
  if (!params.id) {
    return notFound();
  }
  const singleArticle: any = await getSingleNews(params.id);
  if (!singleArticle) {
    return notFound();
  }
  return <SingleArticles singleArticle={singleArticle} />;
};

export default page;

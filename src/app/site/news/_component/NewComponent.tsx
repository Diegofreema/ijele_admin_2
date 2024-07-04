'use client';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { NewsType } from '../../../../../types';
import { format } from 'date-fns';
import { CustomButton } from 'components/ui/CustomButton';
import { Title } from 'components/ui/Title';
import { NewsModal } from 'components/modals/NewsModal';
import { useCallback, useState } from 'react';
import { createClient } from '../../../../../util/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { FileRejection } from 'react-dropzone';
import { deleteNews } from '../../../../../actions/data.actions';

interface Props {
  news: NewsType[];
  count: number;
}

export const NewsComponent = ({ count, news }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [image, setImage] = useState('');
  const supabase = createClient();
  const searchParams = useSearchParams();
  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [values, setValues] = useState({
    title: '',
    author: '',
    articles: '',
    category: '',
  });
  const currentPage = Number(searchParams.get('page')) || 1;
  const newsHasNextPage = count > 10 * currentPage;
  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles[0].name);
      setUploading(true);
      try {
        const file = acceptedFiles[0];
        const filePath = `/news/${file?.name}`;
        const { data, error } = await supabase.storage
          .from('files')
          .upload(filePath, file);
        if (error) {
          console.log(error);
          setUploading(false);
          toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          return;
        }

        console.log(data);

        setImage(
          `https://eqywbgkagvejgblbjpwm.supabase.co/storage/v1/object/public/files/${data?.path}`,
        );
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong, please try again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setUploading(false);
      }
    },
    [supabase.storage, toast],
  );
  const onDropRejected = useCallback(
    (rejectedFiles: FileRejection[]) => {
      toast({
        title: 'Error',
        description: `${rejectedFiles[0]?.file?.type} is not a valid file`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
    [toast],
  );
  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('news').insert({
        image_url: image,
        author_name: values.author,
        news: values.articles,
        title: values.title,
        category: values.category,
      });
      if (error) {
        setIsSubmitting(false);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          isClosable: true,
        });
      }

      if (!error) {
        onClose();
        toast({
          title: 'Success',
          description: 'Article uploaded successfully',
          status: 'success',
          isClosable: true,
        });
        setImage('');
        setValues({ title: '', author: '', articles: '', category: '' });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [image, toast, onClose, supabase, router, values]);
  return (
    <>
      <NewsModal
        uploading={uploading}
        accepted={{
          'image/png': ['.png'],
          'image/jpeg': ['.jpeg'],
          'image/jpg': ['.jpg'],
        }}
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        isOpen={isOpen}
        onClose={onClose}
        setImage={setImage}
        onSubmit={onSubmit}
        imgUrl={image}
        submitting={isSubmitting}
        values={values}
        setValues={setValues}
      />
      <Box>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Title title="News" />
          <CustomButton title="Add Article" onClick={onOpen} />
        </Flex>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 5, md: 10 }}
          mt={{ base: 5, md: 10 }}
        >
          {news.length > 0 &&
            news.map((item) => <NewsCard key={item.id} {...item} />)}
        </SimpleGrid>
        <Flex
          justifyContent={'center'}
          mt={5}
          height={'100%'}
          alignItems={'center'}
        >
          {news?.length === 0 && <Title title="No articles yet" />}
        </Flex>
        {newsHasNextPage && (
          <Flex justifyContent={'center'} mt={5}>
            <Link href={`/site/news?page=${currentPage + 1}`} passHref>
              <CustomButton title="Load more" onClick={() => {}} />
            </Link>
          </Flex>
        )}
      </Box>
    </>
  );
};

const NewsCard = ({
  author_name,
  created_at,
  image_url,
  news,
  title,
  id,
}: NewsType) => {
  const [deleting, setDeleting] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const toast = useToast();
  const onDelete = async () => {
    setDeleting(true);
    try {
      const { message } = await deleteNews(id);
      if (message === 'failed to delete') {
        toast({
          title: 'Error',
          description: 'Something went wrong, please try again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }

      if (message === 'success') {
        toast({
          title: 'Success',
          description: 'Article deleted successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Card minHeight={500}>
      <Link href={`/site/news/${id}`} passHref>
        <Image
          alt="image"
          src={image_url}
          width={'100%'}
          height={250}
          objectFit={'cover'}
        />
        <CardBody>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text>{author_name}</Text>
            <Text fontWeight="bold" fontSize={'sm'} fontStyle={'italic'}>
              {format(created_at, 'eee MMM Y')}
            </Text>
          </Flex>

          <Text fontWeight={'bold'} fontSize={'lg'}>
            {title}
          </Text>
        </CardBody>
      </Link>
      <CardFooter mt="auto">
        {!toDelete ? (
          <CustomButton
            title="Delete Article"
            onClick={() => setToDelete(true)}
            flex={1}
          />
        ) : (
          <Flex gap={5} width={'100%'}>
            <CustomButton
              title="Cancel"
              onClick={() => setToDelete(false)}
              flex={1}
            />
            <CustomButton
              loading={deleting}
              title="Delete"
              onClick={onDelete}
              flex={1}
            />
          </Flex>
        )}
      </CardFooter>
    </Card>
  );
};

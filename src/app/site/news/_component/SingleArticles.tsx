'use client';
import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { NewsType } from '../../../../../types';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '../../../../../util/supabase/client';
import { FileRejection } from 'react-dropzone';
import { Title } from 'components/ui/Title';
import { CustomButton } from 'components/ui/CustomButton';
import { NewsModal } from 'components/modals/NewsModal';
import { formatDate } from 'date-fns';
import { useRouter } from 'next/navigation';

interface Props {
  singleArticle: NewsType;
}

export const SingleArticles = ({ singleArticle }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [image, setImage] = useState('');
  const supabase = createClient();
  const router = useRouter();
  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAt, setCreatedAt] = useState(singleArticle.created_at);
  const [values, setValues] = useState({
    title: '',
    author: '',
    articles: '',
    category: '',
  });
  useEffect(() => {
    setValues({
      title: singleArticle.title,
      author: singleArticle.author_name,
      articles: singleArticle.news,
      category: '',
    });
    setImage(singleArticle.image_url);
  }, [singleArticle]);
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
      const { error } = await supabase
        .from('news')
        .update({
          image_url: image,
          author_name: values.author,
          news: values.articles,
          title: values.title,
        })
        .eq('id', singleArticle.id);
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
          description: 'Article edited successfully',
          status: 'success',
          isClosable: true,
        });
        setImage('');
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
  }, [image, toast, onClose, supabase, values, singleArticle, router]);

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
      <SimpleGrid pb={{ base: 5, md: 10 }}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Title title={singleArticle.title} small />
          <CustomButton title="Edit Article" onClick={onOpen} />
        </Flex>
        <Box
          width={{ base: '100%', md: '70%' }}
          mx={'auto'}
          mt={{ base: 5, md: 10 }}
        >
          <Image
            alt="Image"
            src={singleArticle?.image_url}
            width={'100%'}
            height={'auto'}
            objectFit={'cover'}
            fallbackSrc="https://via.placeholder.com/150"
          />
          <Flex alignItems={'center'} justifyContent={'space-between'} mt={5}>
            <Text>{singleArticle?.author_name}</Text>
            <Text fontWeight="bold" fontSize={'base'} fontStyle={'italic'}>
              {formatDate(singleArticle?.created_at, 'eee MMM Y')}
            </Text>
          </Flex>
          <Text mt={5} fontSize={'base'} fontStyle={'oblique'}>
            {singleArticle?.news}
          </Text>
        </Box>
      </SimpleGrid>
    </>
  );
};

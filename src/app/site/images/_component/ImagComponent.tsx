'use client';
import {
  Box,
  Card,
  CardFooter,
  Flex,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { CustomButton } from 'components/ui/CustomButton';
import { Title } from 'components/ui/Title';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { ImageType } from '../../../../../types';
import { UploadModal } from 'components/modals/ImageModal';
import { useOpenImage } from '../../../../../hooks/useOpenImage';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { createClient } from '../../../../../util/supabase/client';
import { deleteImage } from '../../../../../actions/data.actions';

interface Props {
  images: ImageType[];
  count: number;
}

export const ImageComponent = ({ images, count }: Props) => {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const toast = useToast();
  const router = useRouter();
  const { onOpen, onClose } = useOpenImage();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentPage = Number(searchParams.get('page')) || 1;
  const imageHasNextPage = count > 10 * currentPage;

  useEffect(() => {
    if (count <= 10) {
      router.push('/site/images');
    }
  }, [count, router]);
  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles[0].name);
      setUploading(true);
      try {
        const file = acceptedFiles[0];
        const filePath = `/images/${file?.name}`;
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
      const { error } = await supabase.from('images').insert({
        image_url: image,
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
          description: 'Image uploaded successfully',
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
  }, [image, toast, onClose, supabase, router]);
  return (
    <>
      <UploadModal
        setImage={setImage}
        uploading={uploading}
        accepted={{
          'image/png': ['.png'],
          'image/jpeg': ['.jpeg'],
          'image/jpg': ['.jpg'],
        }}
        onSubmit={onSubmit}
        submitting={isSubmitting}
        title="Upload Image"
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        imgUrl={image}
      />

      <Box pb={10}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Title title="Images" />
          <CustomButton title="Add Image" onClick={onOpen} />
        </Flex>
        <SimpleGrid
          mt={{ base: 5, md: 10 }}
          columns={{ base: 1, md: 3 }}
          gap={5}
        >
          {images?.length > 0 &&
            images?.map((img, i) => (
              <Suspense key={i} fallback={<ImageSkeleton />}>
                <ImageCard {...img} />
              </Suspense>
            ))}
        </SimpleGrid>
        <Flex
          justifyContent={'center'}
          mt={5}
          height={'100%'}
          alignItems={'center'}
        >
          {images?.length === 0 && <Title title="No images yet" />}
        </Flex>
        {imageHasNextPage && (
          <Flex justifyContent={'center'} mt={5}>
            <Link href={`/site/images?page=${currentPage + 1}`} passHref>
              <CustomButton title="Load more" onClick={() => {}} />
            </Link>
          </Flex>
        )}
      </Box>
    </>
  );
};

const ImageCard = ({ created_at, id, image_url }: ImageType) => {
  const [deleting, setDeleting] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const toast = useToast();
  const onDelete = async () => {
    setDeleting(true);
    try {
      const { message } = await deleteImage(id);
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
          description: 'Image deleted successfully',
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
    <Card borderTopRadius={4} overflow={'hidden'}>
      <Image
        alt="image"
        width={'100%'}
        height={300}
        src={image_url}
        objectFit={'fill'}
      />
      <CardFooter>
        {!toDelete ? (
          <CustomButton
            title="Delete Image"
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

export const ImageSkeleton = () => {
  return (
    <Stack>
      <Skeleton height="300px" borderRadius={5} />
    </Stack>
  );
};

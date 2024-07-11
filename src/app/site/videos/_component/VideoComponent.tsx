'use client';
import {
  Box,
  Button,
  Card,
  CardFooter,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useToast,
  Input,
} from '@chakra-ui/react';
import { CustomButton } from 'components/ui/CustomButton';
import { Title } from 'components/ui/Title';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { CatType, VideoType } from '../../../../../types';
import { UploadModal } from 'components/modals/ImageModal';
import { useOpenImage } from '../../../../../hooks/useOpenImage';
import { ChangeEvent, Suspense, useCallback, useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { createClient } from '../../../../../util/supabase/client';
import { deleteVideo } from '../../../../../actions/data.actions';
import ReactPlayer from 'react-player';
import { Pause, Play } from 'lucide-react';

interface Props {
  videos: VideoType[];
  count: number;
}

export const VideoComponent = ({ videos, count }: Props) => {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { onOpen, onClose } = useOpenImage();
  const [videoUrl, setVideoUrl] = useState('');
  const [link, setLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caption, setCaption] = useState('');
  const [cat, setCat] = useState<CatType>('first team');

  const currentPage = Number(searchParams.get('page')) || 1;
  const videoHasNextPage = count > 10 * currentPage;

  useEffect(() => {
    if (count <= 10) {
      router.push('/site/videos');
    }
  }, [count, router]);
  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles[0].name);
      setUploading(true);
      try {
        const file = acceptedFiles[0];
        const filePath = `/videos/${file?.name}`;
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

        setVideoUrl(
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
    if ((!videoUrl && !link) || !caption) {
      toast({
        title: 'Error',
        description: 'Please provide a video url and caption',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('videos').insert({
        caption: caption,
        video_url: videoUrl || link,
        VIDEO_TYPE: cat,
        id: Math.floor(Math.random() * 10),
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
          description: 'Video uploaded successfully',
          status: 'success',
          isClosable: true,
        });
        setVideoUrl('');
        setLink('');
        setCaption('');
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
  }, [videoUrl, toast, onClose, supabase, router, caption, link, cat]);

  const handleLink = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  }, []);

  const handleCaption = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  }, []);
  const handleCat = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCat(e.target.value as CatType);
  }, []);
  return (
    <>
      <UploadModal
        setImage={setVideoUrl}
        uploading={uploading}
        accepted={{ 'video/mp4': ['.mp4'] }}
        onSubmit={onSubmit}
        submitting={isSubmitting}
        title="Upload Video"
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        imgUrl={videoUrl}
        video={true}
        caption={caption}
        cat={cat}
        setCat={handleCat}
        link={link}
        setCaption={handleCaption}
        setLink={handleLink}
      />
      <Box pb={10}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Title title="Videos" />
          <CustomButton title="Add Video" onClick={onOpen} />
        </Flex>
        <SimpleGrid
          mt={{ base: 5, md: 10 }}
          columns={{ base: 1, md: 3 }}
          gap={5}
        >
          {videos?.length > 0 &&
            videos?.map((vid, i) => <VideoCard {...vid} key={i} />)}
        </SimpleGrid>
        <Flex
          justifyContent={'center'}
          mt={5}
          height={'100%'}
          alignItems={'center'}
        >
          {videos?.length === 0 && <Title title="No videos yet" />}
        </Flex>
        {videoHasNextPage && (
          <Flex justifyContent={'center'} mt={5}>
            <Link href={`/site/videos?page=${currentPage + 1}`} passHref>
              <CustomButton title="Load more" onClick={() => {}} />
            </Link>
          </Flex>
        )}
      </Box>
    </>
  );
};

const VideoCard = ({ id, caption, video_url }: VideoType) => {
  const [deleting, setDeleting] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const toast = useToast();
  const onDelete = async () => {
    setDeleting(true);
    try {
      const { message } = await deleteVideo(id);
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
          description: 'Video deleted successfully',
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

  const onTogglePlay = () => {
    setPlaying((prev) => !prev);
  };
  return (
    <Card borderTopRadius={4} height={400} overflow={'hidden'}>
      <Box position={'relative'} height={'80%'}>
        <ReactPlayer
          playing={playing}
          url={video_url}
          width={'100%'}
          height={'100%'}
        />
        <Box zIndex={2} position={'absolute'} bottom={5} left={5}>
          <Button
            onClick={onTogglePlay}
            borderRadius={100}
            bg={'orange'}
            width={50}
            height={50}
            zIndex={3}
          >
            {playing ? (
              <Pause color="white" size={25} className="ml-2" />
            ) : (
              <Play color="white" size={25} className="ml-2" />
            )}
          </Button>
          <Text
            textColor={'white'}
            fontSize={15}
            fontFamily={'var(--font-rubik)'}
            fontWeight={'bold'}
            mt={5}
            maxWidth={'80%'}
            zIndex={3}
          >
            {caption}
          </Text>
        </Box>
        <Box
          position="absolute"
          top={0}
          right={0}
          left={0}
          bottom={0}
          zIndex={1}
          bg="black"
          opacity={0.3}
        />
      </Box>
      <CardFooter>
        {!toDelete ? (
          <CustomButton
            title="Delete Video"
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

type VideoProp = {};

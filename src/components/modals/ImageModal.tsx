'use client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Progress,
  Flex,
  Image,
  Box,
  IconButton,
  Icon,
  Spinner,
  Text,
  Input,
  Button,
  Card,
  Select,
} from '@chakra-ui/react';
import { useOpenImage } from '../../../hooks/useOpenImage';
import Dropzone, { Accept, FileRejection } from 'react-dropzone';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  ImageIcon,
  MousePointerSquareDashed,
  Pause,
  Play,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomButton } from 'components/ui/CustomButton';
import { createClient } from '../../../util/supabase/client';
import ReactPlayer from 'react-player';
import { CatType } from '../../../types';

type Props = {
  title: string;
  onDropRejected: (rejectedFiles: FileRejection[]) => void;
  onDropAccepted: (acceptedFiles: File[]) => void;
  accepted: Accept;
  imgUrl?: string;
  videoUrl?: string;
  onSubmit: () => void;
  setImage: Dispatch<SetStateAction<string>>;
  uploading: boolean;
  submitting: boolean;
  video?: boolean;
  caption?: string;
  link?: string;
  setCaption?: (e: ChangeEvent<HTMLInputElement>) => void;
  setLink?: (e: ChangeEvent<HTMLInputElement>) => void;
  setCat?: (e: ChangeEvent<HTMLSelectElement>) => void;
  cat?: CatType;
};
const data: CatType[] = ['academy', 'first team', 'press conference'];
const supabase = createClient();

export function UploadModal({
  title,
  onDropAccepted,
  onDropRejected,
  accepted,
  imgUrl,
  videoUrl,
  onSubmit,
  setImage,
  uploading,
  submitting,
  video,
  setLink,
  setCaption,
  link,
  caption,
  cat,
  setCat,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const { isOpen, onClose } = useOpenImage();
  const [isDragOver, setIsDragOver] = useState(false);
  const folderPath = imgUrl.split('files/')[1];
  const [playing, setPlaying] = useState(false);
  const onTogglePlay = () => {
    setPlaying((prev) => !prev);
  };

  const handleClose = async () => {
    setImage('');
    const { data, error } = await supabase.storage
      .from('avatars')
      .remove([folderPath]);
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  const isVideo = video && cat;
  if (!mounted) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          gap={4}
          flexDirection={'column'}
          alignItems={'center'}
        >
          {imgUrl === '' ? (
            !link && (
              <Dropzone
                onDropRejected={onDropRejected}
                multiple={true}
                onDropAccepted={onDropAccepted}
                onDragEnter={() => setIsDragOver(true)}
                onDragLeave={() => setIsDragOver(false)}
                accept={accepted}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="w-full min-h-[180px]  flex items-center justify-center flex-wrap gap-4 bg-black/30 cursor-pointer">
                    <div
                      className={cn(
                        'flex flex-col w-full  items-center justify-center',
                      )}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <Flex
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={'column'}
                        width={'100%'}
                      >
                        {isDragOver ? (
                          <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
                        ) : uploading ? (
                          <Spinner color="black" />
                        ) : (
                          <div className="w-full flex justify-center text-center">
                            {' '}
                            <ImageIcon className="h-6 w-6 text-zinc-500 mb-2" />
                          </div>
                        )}
                      </Flex>

                      <div className="flex flex-col items-center justify-center mb-2 text-small text-zinc-700">
                        {uploading ? (
                          <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            flexDirection={'column'}
                            width={'100%'}
                          >
                            <p className="text-black text-center">
                              Uploading...
                            </p>
                            <Progress hasStripe isIndeterminate width={300} />
                          </Flex>
                        ) : isDragOver ? (
                          <p className="text-black text-center">
                            <span className="font-semibold">
                              Drop files here{' '}
                            </span>
                            to upload
                          </p>
                        ) : (
                          <p className="text-black text-center">
                            <span className="font-semibold">
                              Click to upload{' '}
                            </span>
                            or drag and drop
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            )
          ) : (
            <Box width={'100%'} position="relative">
              {!video ? (
                <Image
                  alt="image"
                  width={'100%'}
                  fallbackSrc="https://via.placeholder.com/150"
                  height={300}
                  src={imgUrl}
                />
              ) : (
                <Card
                  borderTopRadius={4}
                  height={300}
                  overflow={'hidden'}
                  position={'relative'}
                >
                  <ReactPlayer
                    playing={playing}
                    url={imgUrl}
                    width={'100%'}
                    height={'100%'}
                  />
                  <Box zIndex={2} position={'absolute'} bottom={-5} left={5}>
                    <Button
                      onClick={onTogglePlay}
                      borderRadius={100}
                      bg={'orange'}
                      width={50}
                      height={50}
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
                    >
                      {caption}
                    </Text>
                  </Box>
                  <Box className="absolute inset-0 bg-black/40" />
                </Card>
              )}
              <IconButton
                isRound
                bg={'black'}
                color="white"
                aria-label="button"
                icon={<Icon as={X} />}
                position="absolute"
                top={2}
                right={2}
                onClick={handleClose}
              />
            </Box>
          )}

          {video && (
            <Flex flexDirection="column" gap={4} mt={10}>
              {!link && (
                <Text textColor="black" fontWeight="bold" textAlign="center">
                  or drop a link here
                </Text>
              )}

              <Flex flexDirection={'column'} gap={3}>
                {!imgUrl && (
                  <Input
                    placeholder="Link to video"
                    width={300}
                    onChange={setLink}
                    value={link}
                  />
                )}
                <Input
                  placeholder="Caption"
                  width={300}
                  onChange={setCaption}
                  value={caption}
                />
              </Flex>
              <Select
                placeholder="Select type"
                width={'100%'}
                value={cat}
                onChange={setCat}
              >
                {data.map((val) => (
                  <option key={val} value={val.toLowerCase()}>
                    {val}
                  </option>
                ))}
              </Select>
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <CustomButton
            loading={submitting}
            title="Upload"
            onClick={onSubmit}
            flex={1}
            mx={5}
            isDisabled={!imgUrl && !link}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

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
} from '@chakra-ui/react';
import { useOpenVideo } from '../../../hooks/useOpenVideo';
import Dropzone, { Accept, FileRejection } from 'react-dropzone';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ImageIcon, MousePointerSquareDashed, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomButton } from 'components/ui/CustomButton';
import { createClient } from '../../../util/supabase/client';

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
};

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
}: Props) {
  const [mounted, setMounted] = useState(false);
  const { isOpen, onClose } = useOpenVideo();
  const [isDragOver, setIsDragOver] = useState(false);
  const folderPath = imgUrl.split('files/')[1];

  console.log(folderPath);

  const handleClose = async () => {
    setImage('');
    const { data, error } = await supabase.storage
      .from('avatars')
      .remove([folderPath]);
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody width={'100%'} display={'flex'} justifyContent={'center'}>
          {imgUrl === '' ? (
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
                          <p className="text-black text-center">Uploading...</p>
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
          ) : (
            <Box width={'100%'} position="relative">
              <Image
                alt="image"
                width={'100%'}
                fallbackSrc="https://via.placeholder.com/150"
                height={300}
                src={imgUrl}
              />
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
        </ModalBody>

        <ModalFooter>
          {imgUrl && (
            <CustomButton
              loading={submitting}
              title="Upload"
              onClick={onSubmit}
              flex={1}
              mx={5}
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

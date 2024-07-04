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
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/react';
import Dropzone, { Accept, FileRejection } from 'react-dropzone';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ImageIcon, MousePointerSquareDashed, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomButton } from 'components/ui/CustomButton';
import { createClient } from '../../../util/supabase/client';
const data = ['Men', 'Women', 'Children'];
type Props = {
  onDropRejected: (rejectedFiles: FileRejection[]) => void;
  onDropAccepted: (acceptedFiles: File[]) => void;
  accepted: Accept;
  imgUrl?: string;
  onSubmit: () => void;
  setImage: Dispatch<SetStateAction<string>>;
  uploading: boolean;
  submitting: boolean;
  isOpen: boolean;
  onClose: () => void;
  values: {
    productName: string;
    price: any;
    inStock: any;
    description: string;
    category: string;
  };
  setValues: Dispatch<
    SetStateAction<{
      productName: string;
      price: any;
      inStock: any;
      category: string;
      description: string;
    }>
  >;
};

const supabase = createClient();

export function ProductModal({
  onDropAccepted,
  onDropRejected,
  accepted,
  imgUrl,
  onSubmit,
  setImage,
  uploading,
  submitting,
  isOpen,
  onClose,
  setValues,
  values,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const allFields = values.description && values.inStock && values.price;
  const [isDragOver, setIsDragOver] = useState(false);
  const folderPath = imgUrl.split('files/')[1];
  const format = (val: string) => `N` + val;
  const parse = (val: string) => val.replace(/^\$/, '');
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
        <ModalHeader>{'Create Product'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
        >
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
          <Flex flexDirection={'column'} width={'100%'} mt={5} gap={5}>
            <Input
              placeholder="Product Name"
              onChange={(e) =>
                setValues({ ...values, productName: e.target.value })
              }
              value={values.productName}
            />
            <>
              <label>Category</label>
              <Select
                placeholder="Select Category"
                width={'100%'}
                value={values.category}
                onChange={(e) =>
                  setValues({ ...values, category: e.target.value })
                }
              >
                {data.map((val) => (
                  <option key={val} value={val.toLowerCase()}>
                    {val}
                  </option>
                ))}
              </Select>
            </>
            <>
              <label>Price in naira</label>
              <NumberInput
                min={0}
                value={values.price}
                onChange={(value) => setValues({ ...values, price: value })}
              >
                <NumberInputField placeholder="Price in naira" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </>
            <>
              <label>Number In Stock</label>
              <NumberInput
                min={0}
                placeholder="In Stock"
                value={values.inStock}
                onChange={(value) => setValues({ ...values, inStock: value })}
              >
                <NumberInputField placeholder="In Stock" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </>
            <Textarea
              resize={'none'}
              placeholder="Product description"
              rows={6}
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          {imgUrl && allFields && (
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

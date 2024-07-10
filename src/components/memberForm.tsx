import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import { MemberType } from '../../types';
import {
  Box,
  IconButton,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Icon,
  Progress,
  Flex,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { CustomInput } from './CustomInput';
import { ImageIcon, MousePointerSquareDashed, X } from 'lucide-react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { createClient } from '../../util/supabase/client';
import { CustomButton } from './ui/CustomButton';
import { format } from 'date-fns';

type Props = {
  user?: MemberType;
  isReadOnly?: boolean;
  onSubmit: (member: MemberType) => void;
  setReadOnly?: () => void;
  loading: boolean;
  btn?: string;
};

export const MemberForm = ({
  user,
  isReadOnly,
  onSubmit: onSend,
  setReadOnly,
  loading,
  btn = 'Update',
}: Props): JSX.Element => {
  const [member, setMember] = useState<MemberType | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const toast = useToast();
  const supabase = createClient();
  const [img, setImage] = useState('');
  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles[0].name);
      setUploading(true);
      try {
        const file = acceptedFiles[0];
        const filePath = `/products/${file?.name}`;
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
  useEffect(() => {
    if (user) {
      setMember(user);
      setImage(user.img_url);
    }
  }, [user]);
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImg = () => {
    if (isReadOnly) return;
    setImage('');
  };

  const onSubmit = () => {
    setReadOnly();
    onSend({
      ...member,
      dateOfBirth: format(member.dateOfBirth, 'dd/MM/yyyy'),
    });
  };
  // gender: string;
  // img_url: string | null;
  // phoneNumber: string | null;
  // title: string | null;
  // type: Database['public']['Enums']['memberType'] | null;
  return (
    <Box
      display={'flex'}
      flexDir={'column'}
      gap={5}
      mt={20}
      pb={50}
      maxWidth={500}
      mx="auto"
    >
      {img === '' ? (
        <Dropzone
          onDropRejected={onDropRejected}
          multiple={true}
          onDropAccepted={onDropAccepted}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          accept={{}}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="w-full max-w-[500px] min-h-[180px]  flex items-center justify-center flex-wrap gap-4 bg-black/30 cursor-pointer mx-auto">
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
                      <span className="font-semibold">Drop files here </span>
                      to upload
                    </p>
                  ) : (
                    <p className="text-black text-center">
                      <span className="font-semibold">Click to upload </span>
                      or drag and drop
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      ) : (
        <Box width={'100%'} position="relative" maxW={500} mx="auto">
          <Image
            alt="image"
            width={'100%'}
            fallbackSrc="https://via.placeholder.com/150"
            height={300}
            src={img}
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
            onClick={handleImg}
          />
        </Box>
      )}
      <CustomInput
        label="First name"
        placeholder="First name"
        onChange={handleChange}
        value={member?.first_name}
        name="first_name"
        isReadOnly={isReadOnly}
      />
      <CustomInput
        label="Last name"
        placeholder="Last name"
        onChange={handleChange}
        value={member?.last_name}
        name="last_name"
        isReadOnly={isReadOnly}
      />
      <CustomInput
        label="Email"
        placeholder="Email"
        onChange={handleChange}
        value={member?.email}
        name="email"
        isReadOnly={isReadOnly}
      />
      <CustomInput
        label="Date of birth"
        placeholder="Date of birth"
        onChange={handleChange}
        value={member?.dateOfBirth}
        name="dateOfBirth"
        isReadOnly={isReadOnly}
        type="date"
      />
      <CustomInput
        label="Phone"
        placeholder="Phone"
        onChange={handleChange}
        value={member?.phoneNumber}
        name="phoneNumber"
        isReadOnly={isReadOnly}
      />
      <CustomInput
        label="Salutation"
        placeholder="Salutation"
        onChange={handleChange}
        value={member?.salutation}
        name="salutation"
        isReadOnly={isReadOnly}
      />
      <Stack>
        <Text textColor={'black'} fontWeight={700}>
          Gender
        </Text>
        <Select
          placeholder="Select a gender"
          value={member?.gender}
          onChange={handleChange}
          name="gender"
          maxW={500}
          isDisabled={isReadOnly}
          defaultValue={member?.gender}
        >
          <option value={'male'}>Male</option>
          <option value={'female'}>Female</option>
        </Select>
      </Stack>
      <Stack>
        <Text textColor={'black'} fontWeight={700}>
          Member Type
        </Text>
        <Select
          placeholder="Select a type"
          value={member?.type}
          onChange={handleChange}
          name="type"
          maxW={500}
          isDisabled={isReadOnly}
          defaultValue={member?.type}
        >
          <option value={'regular'}>Regular</option>
          <option value={'annual'}>Annual</option>
          <option value={'life'}>Life</option>
          <option value={'honorary-board-membership'}>
            Honorary board membership
          </option>
          <option value={'honorary-president'}>Honorary president</option>
        </Select>
      </Stack>
      {!isReadOnly && (
        <Flex justifyContent={'end'}>
          <CustomButton title={btn} onClick={onSubmit} loading={loading} />
        </Flex>
      )}
    </Box>
  );
};

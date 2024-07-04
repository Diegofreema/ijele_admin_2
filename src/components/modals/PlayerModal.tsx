'use client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Input,
  Avatar,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  useToast,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { CustomButton } from 'components/ui/CustomButton';
import { createClient } from '../../../util/supabase/client';
import { Title } from 'components/ui/Title';
import { DUTY, MenType, PositionEnum, TypeMen } from '../../../types';
const data = ['Forward', 'Defender', 'Midfielder', 'Goalkeeper', 'Coach'];
const roles = [
  'Regular',
  'Captain',
  'Assistant captain',
  'Head coach',
  'Assistant coach',
  'Goalkeeper coach',
  'Set piece coach',
  'Technical coach',
];

const type = ['Permanent', 'Loan'];
const option = ['true', 'false'];
const supabase = createClient();
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TypeMen) => void;
  submitting: boolean;
  values?: MenType;
  edit?: boolean;
};
export function PlayerModal({
  isOpen,
  onClose,
  onSubmit,
  submitting,
  values: playerValues,
  edit,
}: Props) {
  const supabase = createClient();
  const [mounted, setMounted] = useState(false);

  const [uploadingHome, setUploadingHome] = useState(false);
  const [uploadingAway, setUploadingAway] = useState(false);

  const [values, setValues] = useState<TypeMen>({
    age: '',
    bio: '',
    contract_end_date: '',
    contract_start_date: '',
    contract_type: '',
    first_name: '',
    height: '',
    image_url: '',
    injured: false,
    last_name: '',
    leave: false,
    jersey_number: 0,
    lga: '',
    nationality: '',
    ROLE: 'forward',
    middle_name: '',
    wage_per_week: 0,
    suspended: false,
    loan_away: false,
    loan_home: false,
    weight: '',
    DUTY: 'regular',
    skill_descriptions: '',
    state_of_origin: '',
  });

  useEffect(() => {
    if (playerValues) {
      setValues({ ...playerValues });
    }
  }, [playerValues]);
  const homeRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const awayRef = useRef<HTMLInputElement>(null);
  const onOpenHomeImagePicker = () => {
    if (!homeRef.current) return;
    homeRef.current.click();
  };
  const onOpenAwayImagePicker = () => {
    if (!awayRef.current) return;
    awayRef.current.click();
  };

  const onHandleHomeChange: ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHome(true);
    try {
      const filePath = `/matches/${file?.name}`;
      const { data, error } = await supabase.storage
        .from('files')
        .upload(filePath, file);
      if (error) {
        console.log(error);
        setUploadingHome(false);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      setValues({
        ...values,
        image_url: `https://eqywbgkagvejgblbjpwm.supabase.co/storage/v1/object/public/files/${data?.path}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setUploadingHome(false);
    }
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  const handleClose = async () => {
    // setImage('');
    // const { data, error } = await supabase.storage
    //   .from('avatars')
    //   .remove([folderPath]);
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  const isValid = Object.values(values).every((val) => val !== '');
  if (!mounted) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <Flex flexDirection={'column'} gap={2} mb={5}>
            <Select
              placeholder="Select a position"
              width={'100%'}
              value={values.ROLE}
              onChange={(e) =>
                setValues({
                  ...values,
                  ROLE: e.target.value as PositionEnum,
                })
              }
            >
              {data.map((val) => (
                <option key={val} value={val.toLowerCase()}>
                  {val}
                </option>
              ))}
            </Select>

            <Select
              placeholder="Select a role"
              width={'100%'}
              value={values.DUTY}
              onChange={(e) =>
                setValues({
                  ...values,
                  DUTY: e.target.value as DUTY,
                })
              }
            >
              {roles.map((val) => (
                <option key={val} value={val.toLowerCase()}>
                  {val}
                </option>
              ))}
            </Select>
            <Input
              width={'100%'}
              placeholder="First name"
              value={values.first_name}
              onChange={(e) =>
                setValues({ ...values, first_name: e.target.value })
              }
            />
            <Input
              width={'100%'}
              placeholder="Last name"
              value={values.last_name}
              onChange={(e) =>
                setValues({ ...values, last_name: e.target.value })
              }
            />
            <Input
              width={'100%'}
              placeholder="Middle name"
              value={values.middle_name}
              onChange={(e) =>
                setValues({ ...values, middle_name: e.target.value })
              }
            />
            <Input
              width={'100%'}
              placeholder="Height in feet"
              value={values.height}
              onChange={(e) => setValues({ ...values, height: e.target.value })}
            />
            <Textarea
              width={'100%'}
              placeholder="Bio"
              value={values.bio}
              onChange={(e) => setValues({ ...values, bio: e.target.value })}
            />
            <Textarea
              width={'100%'}
              placeholder="Skill info"
              value={values.skill_descriptions}
              onChange={(e) =>
                setValues({ ...values, skill_descriptions: e.target.value })
              }
            />
            <Box>
              <label>Contract start date</label>
              <Input
                width={'100%'}
                value={values.contract_start_date}
                type="date"
                onChange={(e) =>
                  setValues({ ...values, contract_start_date: e.target.value })
                }
              />
            </Box>
            <Box>
              <label>Contract end date</label>
              <Input
                width={'100%'}
                value={values.contract_end_date}
                type="date"
                onChange={(e) =>
                  setValues({ ...values, contract_end_date: e.target.value })
                }
              />
            </Box>
            <label>Wage per week</label>
            <Input
              width={'100%'}
              value={values.wage_per_week}
              placeholder="Wage per week"
              type="number"
              onChange={(e) =>
                setValues({ ...values, wage_per_week: +e.target.value })
              }
            />
            <Input
              width={'100%'}
              value={values.age}
              placeholder="Age"
              type="number"
              onChange={(e) => setValues({ ...values, age: e.target.value })}
            />
            <Select
              placeholder="Select a contract type"
              width={'100%'}
              value={values.contract_type}
              onChange={(e) =>
                setValues({
                  ...values,
                  contract_type: e.target.value as PositionEnum,
                })
              }
            >
              {type.map((val) => (
                <option key={val} value={val.toLowerCase()}>
                  {val}
                </option>
              ))}
            </Select>
            <label>Injured</label>

            <Select
              placeholder="Injured"
              width={'100%'}
              value={values.injured ? 'true' : 'false'}
              onChange={(e) =>
                setValues({
                  ...values,
                  injured: !!e.target.value,
                })
              }
            >
              {option.map((val) => (
                <option key={val} value={val.toLowerCase()}>
                  {val}
                </option>
              ))}
            </Select>
            <label>Suspended</label>

            <Select
              placeholder="Suspended"
              width={'100%'}
              value={values.suspended ? 'true' : 'false'}
              onChange={(e) =>
                setValues({
                  ...values,
                  suspended: !!e.target.value,
                })
              }
            >
              {option.map((val) => (
                <option key={val} value={val.toLowerCase()}>
                  {val}
                </option>
              ))}
            </Select>
            <label>Loaned in</label>

            <Select
              placeholder="Loaned in"
              width={'100%'}
              value={values.loan_home ? 'true' : 'false'}
              onChange={(e) =>
                setValues({
                  ...values,
                  loan_home: !!e.target.value,
                })
              }
            >
              {option.map((val) => (
                <option key={val} value={val.toLowerCase()}>
                  {val}
                </option>
              ))}
            </Select>
            <label>Loaned out</label>

            <Select
              placeholder="Loaned out"
              width={'100%'}
              value={values.loan_home ? 'true' : 'false'}
              onChange={(e) =>
                setValues({
                  ...values,
                  loan_home: !!e.target.value,
                })
              }
            >
              {option.map((val) => (
                <option key={val} value={val.toLowerCase()}>
                  {val}
                </option>
              ))}
            </Select>
            <label>On leave</label>

            <Select
              placeholder="Leave"
              width={'100%'}
              value={values.leave ? 'true' : 'false'}
              onChange={(e) =>
                setValues({
                  ...values,
                  leave: !!e.target.value,
                })
              }
            >
              {option.map((val) => (
                <option key={val} value={val.toLowerCase()}>
                  {val}
                </option>
              ))}
            </Select>
            <label>Jersey number</label>

            <Input
              width={'100%'}
              value={values.jersey_number}
              placeholder="Jersey Number"
              type="number"
              onChange={(e) =>
                setValues({ ...values, jersey_number: Number(e.target.value) })
              }
            />
            <Input
              width={'100%'}
              value={values.lga}
              placeholder="LGA"
              onChange={(e) => setValues({ ...values, lga: e.target.value })}
            />
            <Input
              width={'100%'}
              value={values.state_of_origin}
              placeholder="State of origin"
              onChange={(e) =>
                setValues({ ...values, state_of_origin: e.target.value })
              }
            />
            <Input
              width={'100%'}
              value={values.nationality}
              placeholder="Nationality"
              onChange={(e) =>
                setValues({ ...values, nationality: e.target.value })
              }
            />
            {/* <Input
              width={'100%'}
              value={values.nationality}
              placeholder="Nationality"
              type="number"
              onChange={(e) =>
                setValues({ ...values, nationality: e.target.value })
              }
            /> */}
            <label>Weight in kg</label>

            <Input
              width={'100%'}
              value={values.weight}
              placeholder="Weight"
              type="number"
              onChange={(e) => setValues({ ...values, weight: e.target.value })}
            />
          </Flex>

          <Box
            flexBasis={'50%'}
            display={'flex'}
            flexDirection={'column'}
            gap={3}
          >
            <Flex alignItems={'center'} gap={2}>
              {!values.image_url && !uploadingHome && (
                <>
                  <label>Select an image</label>
                  <Box
                    onClick={onOpenHomeImagePicker}
                    height={50}
                    width={50}
                    bg={'yellow.500'}
                    borderRadius={50}
                    cursor="pointer"
                  />
                </>
              )}{' '}
              {values?.image_url && !uploadingHome && (
                <Avatar
                  src={values.image_url}
                  size={'md'}
                  onClick={onOpenHomeImagePicker}
                />
              )}
              {uploadingHome && <Spinner color="green" />}
              <Input
                ref={homeRef}
                width={'fit-content'}
                cursor={'pointer'}
                hidden
                type="file"
                accept="image/*"
                onChange={onHandleHomeChange}
              />
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter>
          {isValid && (
            <CustomButton
              loading={submitting}
              title={edit ? 'Update' : 'Upload'}
              onClick={handleSubmit}
              flex={1}
              mx={5}
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

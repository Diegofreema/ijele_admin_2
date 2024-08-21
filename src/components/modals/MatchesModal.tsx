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
  Button,
} from '@chakra-ui/react';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { CustomButton } from 'components/ui/CustomButton';
import { createClient } from '../../../util/supabase/client';
import { Title } from 'components/ui/Title';
import { MatchResult, MatchType, MatchesType } from '../../../types';
const data = [
  'Upcoming',
  'Won',
  'Lost',
  'Drawn',
  'Abandoned',
  'Postponed',
  'Live',
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: MatchType) => void;
  submitting: boolean;
  values?: MatchesType;
  edit?: boolean;
};
export function MatchModal({
  isOpen,
  onClose,
  onSubmit,
  submitting,
  values: matchValues,
  edit,
}: Props) {
  const supabase = createClient();
  const [mounted, setMounted] = useState(false);

  const [awayImage, setAwayImage] = useState('');
  const [uploadingHome, setUploadingHome] = useState(false);
  const [uploadingAway, setUploadingAway] = useState(false);

  const [values, setValues] = useState<MatchType>({
    attendance: 0,
    away_score: 0,
    away_team: '',
    away_team_img: '',
    date_of_match: '',
    venue: '',
    home_score: 0,
    home_team_img: '',
    home_team: '',
    kick_off: '',
    match_result: 'upcoming',
    ref_name: 'Not yet known',
    league: '',
    ticket_available: 0,
    ticket_price: 0,
    vip_price: 0,
    vvip_price: 0,
  });

  useEffect(() => {
    if (matchValues) {
      setValues({
        attendance: matchValues.attendance,
        away_score: matchValues.away_score,
        away_team: matchValues.away_team,
        away_team_img: matchValues.away_team_image,
        date_of_match: matchValues.date_of_match,
        home_score: matchValues.home_score,
        home_team: matchValues.home_team,
        home_team_img: matchValues.home_team_img,
        kick_off: matchValues.kick_off,
        match_result: matchValues.RESULT,
        ref_name: matchValues.ref_name,
        venue: matchValues.venue,
        league: matchValues?.league,
        ticket_available: matchValues?.ticket_available,
        ticket_price: matchValues?.ticket_price,
        vip_price: matchValues?.vip_price,
        vvip_price: matchValues?.vvip_price,
      });
    }
  }, [matchValues]);
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
      const filePath = `/matches/${file?.name}/${Math.random() * 1000}`;
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
        home_team_img: `https://eqywbgkagvejgblbjpwm.supabase.co/storage/v1/object/public/files/${data?.path}`,
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
  const onHandleAwayChange: ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAway(true);
    try {
      const filePath = `/matches/${file?.name}/${Math.random() * 1000}`;
      const { data, error } = await supabase.storage
        .from('files')
        .upload(filePath, file);
      if (error) {
        console.log(error);
        setUploadingAway(false);
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
        away_team_img: `https://eqywbgkagvejgblbjpwm.supabase.co/storage/v1/object/public/files/${data?.path}`,
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
      setUploadingAway(false);
    }
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const clearImage = (type: 'H' | 'A') => {
    if (type === 'H') setValues({ ...values, home_team_img: '' });
    if (type === 'A') setValues({ ...values, away_team_img: '' });
  };
  const isValid = Object.values(values).every((val) => val !== '');
  if (!mounted) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Fixtures</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <Flex flexDirection={'column'} gap={2} mb={5}>
            <>
              <label htmlFor="">Select outcome of the match</label>
              <Select
                placeholder="Select Outcome of the match"
                width={'100%'}
                value={values.match_result}
                onChange={(e) =>
                  setValues({
                    ...values,
                    match_result: e.target.value as MatchResult,
                  })
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
              <label>Venue</label>
              <Input
                width={'100%'}
                placeholder="Venue"
                value={values.venue}
                onChange={(e) =>
                  setValues({ ...values, venue: e.target.value })
                }
              />
            </>
            <>
              <label>Referee name</label>
              <Input
                width={'100%'}
                placeholder="Referee name"
                value={values.ref_name}
                onChange={(e) =>
                  setValues({ ...values, ref_name: e.target.value })
                }
              />
            </>
            <>
              <label>Tournament</label>
              <Input
                width={'100%'}
                placeholder="League"
                value={values.league}
                onChange={(e) =>
                  setValues({ ...values, league: e.target.value })
                }
              />
            </>
            <>
              <label>Date of match</label>
              <Input
                width={'100%'}
                placeholder="Date of match"
                value={values.date_of_match}
                type="date"
                onChange={(e) =>
                  setValues({ ...values, date_of_match: e.target.value })
                }
              />
            </>
            <>
              <label>Kickoff</label>
              <Input
                width={'100%'}
                placeholder="Kick off"
                type="time"
                value={values.kick_off}
                onChange={(e) =>
                  setValues({ ...values, kick_off: e.target.value })
                }
              />
            </>
            <>
              <label>Regular ticket price</label>
              <Input
                width={'100%'}
                placeholder="Ticket price in naira"
                value={values.ticket_price}
                onChange={(e) =>
                  setValues({ ...values, ticket_price: Number(e.target.value) })
                }
              />
            </>
            <>
              <label>VIP ticket price</label>
              <Input
                width={'100%'}
                placeholder="Ticket price in naira"
                value={values.vip_price}
                onChange={(e) =>
                  setValues({ ...values, vip_price: Number(e.target.value) })
                }
              />
            </>
            <>
              <label>VVIP ticket price</label>
              <Input
                width={'100%'}
                placeholder="Ticket price in naira"
                value={values.vvip_price}
                onChange={(e) =>
                  setValues({ ...values, vvip_price: Number(e.target.value) })
                }
              />
            </>
            <>
              <label>Ticket in stock</label>
              <Input
                width={'100%'}
                placeholder="Ticket in stock"
                value={values.ticket_available}
                onChange={(e) =>
                  setValues({
                    ...values,
                    ticket_available: Number(e.target.value),
                  })
                }
              />
            </>
          </Flex>

          <Flex gap={4} width={'100%'}>
            <Box
              flexBasis={'50%'}
              display={'flex'}
              flexDirection={'column'}
              gap={3}
            >
              <Title small title="Home" />
              {values?.home_team_img && (
                <Button onClick={() => clearImage('H')}>Clear</Button>
              )}
              <Flex alignItems={'center'} gap={2}>
                {!values.home_team_img && !uploadingHome && (
                  <Box
                    onClick={onOpenHomeImagePicker}
                    height={50}
                    width={50}
                    bg={'yellow.500'}
                    borderRadius={50}
                    cursor="pointer"
                  />
                )}{' '}
                {values?.home_team_img && !uploadingHome && (
                  <div className="flex flex-col">
                    <Avatar
                      src={values.home_team_img}
                      size={'md'}
                      onClick={onOpenHomeImagePicker}
                    />
                  </div>
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
                <Input
                  flex={1}
                  placeholder="Name of team"
                  value={values.home_team}
                  onChange={(e) =>
                    setValues({ ...values, home_team: e.target.value })
                  }
                />
              </Flex>
              <Flex alignItems={'center'} gap={2}>
                <Text>Scores</Text>
                <NumberInput
                  min={0}
                  value={values.home_score}
                  onChange={(value) =>
                    setValues({ ...values, home_score: +value })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </Box>
            <Box
              flexBasis={'50%'}
              display={'flex'}
              flexDirection={'column'}
              gap={3}
            >
              <Title small title="Away" />
              {values?.away_team_img && (
                <Button onClick={() => clearImage('A')}>Clear</Button>
              )}
              <Flex alignItems={'center'} gap={2}>
                {!values.away_team_img && !uploadingAway && (
                  <Box
                    onClick={onOpenAwayImagePicker}
                    height={50}
                    width={50}
                    bg={'green.500'}
                    borderRadius={50}
                    cursor="pointer"
                  />
                )}{' '}
                {values.away_team_img && !uploadingAway && (
                  <div className="flex flex-col">
                    <Avatar
                      src={values.away_team_img}
                      size={'md'}
                      onClick={onOpenHomeImagePicker}
                    />
                  </div>
                )}
                {uploadingAway && <Spinner color="green" />}
                <Input
                  ref={awayRef}
                  width={'fit-content'}
                  cursor={'pointer'}
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={onHandleAwayChange}
                />
                <Input
                  flex={1}
                  placeholder="Name of team"
                  value={values.away_team}
                  onChange={(e) =>
                    setValues({ ...values, away_team: e.target.value })
                  }
                />
              </Flex>
              <Flex alignItems={'center'} gap={2}>
                <Text>Scores</Text>
                <NumberInput
                  min={0}
                  value={values.away_score}
                  onChange={(value) =>
                    setValues({ ...values, away_score: +value })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </Box>
          </Flex>
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

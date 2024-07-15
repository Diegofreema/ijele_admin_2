'use client';
import {
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { MenType, TypeMen } from '../../../../../types';
import { useState } from 'react';
import { PlayerModal } from 'components/modals/PlayerModal';
import { Title } from 'components/ui/Title';
import { CustomButton } from 'components/ui/CustomButton';
import { format } from 'date-fns';
import { editPlayer } from '../../../../../actions/data.actions';

interface Props {
  player: MenType;
}

export const SinglePlayer = ({ player }: Props) => {
  console.log(player);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [image, setImage] = useState('');

  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (value: TypeMen) => {
    setIsSubmitting(true);
    try {
      const { message, error } = await editPlayer(value, player.id);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      if (!error) {
        toast({
          title: 'Success',
          description: message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <PlayerModal
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={onSubmit}
        submitting={isSubmitting}
        edit
        values={player}
      />
      <Box width={{ base: '90%', md: '70%' }} mx={'auto'}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Title title={player?.first_name} />
          <CustomButton title="Edit Player Data" onClick={onOpen} />
        </Flex>
        <Box
          mt={{ base: 5, md: 10 }}
          flexDirection={'column'}
          display="flex"
          gap={4}
          fontWeight={'bold'}
          pb={10}
        >
          <Image
            alt="image"
            src={player?.image_url}
            width={'100%'}
            height={'auto'}
          />
          <Flex justifyContent={'space-between'}>
            <Text>Name</Text>
            <Text>
              {player.last_name} {player.first_name} {player?.middle_name}
            </Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>LGA</Text>
            <Text>{player?.lga}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>State of origin</Text>
            <Text>{player?.state_of_origin}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Nationality</Text>
            <Text>{player?.nationality}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Bio</Text>
            <Text>{player?.bio}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Position(s)</Text>
            <Box>
              <Text>{player?.ROLE}</Text>
            </Box>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Age</Text>
            <Text>{player?.age}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>LGA</Text>
            <Text>{player?.lga}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Weight</Text>
            <Text>{player?.weight}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Height</Text>
            <Text>{player?.height}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Wages per week</Text>
            <Text>₦{player?.wage_per_week}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Contract start date</Text>
            <Text>{format(player?.contract_start_date, 'dd/MM/yyyy')}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Contract end date</Text>
            <Text>{format(player?.contract_end_date, 'dd/MM/yyyy')}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Contract type</Text>
            <Text>{player?.contract_type}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Injured</Text>
            <Text>{player?.injured ? 'Yes' : 'No'}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>Suspended</Text>
            <Text>{player?.suspended ? 'Yes' : 'No'}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text>On Leave</Text>
            <Text>{player?.leave ? 'Yes' : 'No'}</Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

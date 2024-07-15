'use client';
import {
  Avatar,
  Box,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { CustomButton } from 'components/ui/CustomButton';
import { Title } from 'components/ui/Title';
import { MatchType, MatchesType } from '../../../../../types';
import { MatchModal } from 'components/modals/MatchesModal';
import { useState } from 'react';
import { format } from 'date-fns';
import { editMatch } from '../../../../../actions/data.actions';

export const SingleMatch = ({ match }: { match: MatchesType }): JSX.Element => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const onSubmit = async (values: MatchType) => {
    setSubmitting(true);
    try {
      const { error, message } = await editMatch(values, match.id);
      if (error) {
        toast({
          title: 'Error',
          description: error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      if (message === 'success') {
        onClose();
        toast({
          title: 'Success',
          description: 'Created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <MatchModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        submitting={submitting}
        values={match}
        edit
      />
      <Box>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Title title={format(match?.date_of_match, 'dd/MM/yyyy')} />
          <CustomButton title="Edit fixture" onClick={onOpen} />
        </Flex>

        <Box mt={{ base: 5, md: 10 }} display="flex" flexDir={'column'} gap={5}>
          <Text
            fontSize={{ base: 14, md: 16 }}
            fontWeight={'bold'}
            textAlign={'center'}
          >
            Venue: {match?.venue}
          </Text>
          <Text
            fontSize={{ base: 14, md: 16 }}
            fontWeight={'bold'}
            textAlign={'center'}
          >
            Referee: {match?.ref_name}
          </Text>
          <Text
            fontSize={{ base: 14, md: 16 }}
            fontWeight={'bold'}
            textAlign={'center'}
          >
            Date: {format(match?.date_of_match, 'dd/MM/yyyy')}
          </Text>
          <Text
            fontSize={{ base: 14, md: 16 }}
            fontWeight={'bold'}
            textAlign={'center'}
          >
            Kickoff: {match?.kick_off}
          </Text>
          <Flex alignItems={'center'} justifyContent={'center'} gap={5}>
            <Flex alignItems={'center'} gap={2}>
              <Avatar size={'xl'} src={match?.home_team_img} />
              <Text fontWeight={'bold'} fontSize={15}>
                {match?.home_team}
              </Text>
            </Flex>
            <Text fontSize={20} fontWeight={'bold'}>
              VS
            </Text>
            <Flex alignItems={'center'} gap={2}>
              <Avatar size={'xl'} src={match?.away_team_image} />
              <Text fontWeight={'bold'} fontSize={15}>
                {match?.away_team}
              </Text>
            </Flex>
          </Flex>
          <Flex
            alignItems={'center'}
            color="black"
            mt={2}
            gap={2}
            justifyContent={'center'}
          >
            <Text fontWeight={'bold'} fontSize={20}>
              {match?.home_score}
            </Text>
            :
            <Text fontWeight={'bold'} fontSize={20}>
              {match?.away_score}
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

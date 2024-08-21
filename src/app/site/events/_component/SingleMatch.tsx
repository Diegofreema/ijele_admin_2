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
import { MatchType, MatchesType, TicketType } from '../../../../../types';
import { MatchModal } from 'components/modals/MatchesModal';
import { useState } from 'react';
import { format } from 'date-fns';
import { editMatch } from '../../../../../actions/data.actions';
import { Link } from 'next-view-transitions';

export const SingleMatch = ({
  match,
  tickets,
}: {
  match: MatchesType;
  tickets: TicketType[];
}): JSX.Element => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  console.log(tickets);

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

        <Flex
          mt={{ base: 5, md: 10 }}
          justifyContent={'center'}
          alignItems={'center'}
          gap={20}
          width={'100%'}
          minHeight={400}
        >
          <Box>
            <Text fontSize={{ base: 14, md: 16 }} fontWeight={'bold'}>
              Venue: {match?.venue}
            </Text>
            <Text fontSize={{ base: 14, md: 16 }} fontWeight={'bold'}>
              Referee: {match?.ref_name}
            </Text>
            <Text fontSize={{ base: 14, md: 16 }} fontWeight={'bold'}>
              Date: {format(match?.date_of_match, 'dd/MM/yyyy')}
            </Text>
            <Text fontSize={{ base: 14, md: 16 }} fontWeight={'bold'}>
              Kickoff: {match?.kick_off}
            </Text>
          </Box>
          <Box>
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
              <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
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
        </Flex>
        <Flex gap={5} alignItems={'center'} justifyContent={'center'}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Number of tickets sold for this match
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {tickets?.length}
          </Text>
        </Flex>
        {!!tickets.length && (
          <Flex gap={5} alignItems={'center'} justifyContent={'center'}>
            <Link href={`/site/events/tickets?id=${match.id}`}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'blue' }}>
                View
              </Text>
            </Link>
          </Flex>
        )}
      </Box>
    </>
  );
};

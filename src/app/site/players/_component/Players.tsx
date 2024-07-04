'use client';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { MenType, TypeMen } from '../../../../../types';
import { Title } from 'components/ui/Title';
import { CustomButton } from 'components/ui/CustomButton';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { PlayerModal } from 'components/modals/PlayerModal';
import { createPlayer } from '../../../../../actions/data.actions';

interface Props {
  players: MenType[];
  count: number;
}

export const Players = ({ count, players }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const searchParams = useSearchParams();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentPage = Number(searchParams.get('page')) || 1;
  const hasNextPage = count > 10 * currentPage;
  const onSubmit = async (values: TypeMen) => {
    setIsSubmitting(true);
    try {
      const { message, error } = await createPlayer(values);

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
      />
      <Box>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Title title="Men's team" />
          <CustomButton title="Add +" onClick={onOpen} />
        </Flex>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 5, md: 10 }}
          mt={{ base: 5, md: 10 }}
        >
          {players.length > 0 &&
            players.map((item) => <PlayersCard key={item.id} player={item} />)}
        </SimpleGrid>
        <Flex
          justifyContent={'center'}
          mt={5}
          height={'100%'}
          alignItems={'center'}
        >
          {players?.length === 0 && <Title title="No data yet" />}
        </Flex>
        {hasNextPage && (
          <Flex justifyContent={'center'} mt={5}>
            <Link href={`/site/players?page=${currentPage + 1}`} passHref>
              <CustomButton title="Load more" onClick={() => {}} />
            </Link>
          </Flex>
        )}
      </Box>
    </>
  );
};

const PlayersCard = ({ player }: { player: MenType }) => {
  return (
    <Link href={`/site/players/${player?.id}`} passHref className="w-full">
      <Card>
        <CardBody>
          <Flex alignItems="center" gap={5}>
            <Avatar src={player?.image_url} />
            <Box>
              <Text>{player?.first_name}</Text>
              <Text>{player?.last_name}</Text>
            </Box>
          </Flex>
          <Box>
            <Text>Position: {player?.ROLE}</Text>
            <Text>Age: {player?.age}</Text>
            <Text>Country: {player?.nationality}</Text>
          </Box>
        </CardBody>
        <CardFooter width={'100%'}>
          <CustomButton
            title="View Details"
            onClick={() => {}}
            width={'100%'}
          />
        </CardFooter>
      </Card>
    </Link>
  );
};

'use client';
import {
  Box,
  Flex,
  SimpleGrid,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { CustomButton } from 'components/ui/CustomButton';
import { Title } from 'components/ui/Title';
import { MatchType, MatchesType } from '../../../../../types';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { MatchModal } from 'components/modals/MatchesModal';
import { createMatch } from '../../../../../actions/data.actions';
import { MatchItem } from 'app/site/home/_component/Home';
import { createClient } from '../../../../../util/supabase/client';

interface Props {
  count: number;
  matches: MatchesType[];
}

export const Matches = ({ count, matches }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const supabase = createClient();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const isNextPage = count > 10 * currentPage;
  const toast = useToast();
  useEffect(() => {
    const channel = supabase
      .channel('matches-change')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'matches',
        },
        () => {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);
  useEffect(() => {
    if (count <= 10) {
      router.push('/site/events');
    }
  }, [count, router]);
  const onSubmit = async (values: MatchType) => {
    setSubmitting(true);
    try {
      const { error, message } = await createMatch(values);
      console.log({ error, message });

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
  console.log(matches);

  return (
    <>
      <MatchModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        submitting={submitting}
      />
      <Box mt={{ base: 5, md: 10 }}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Title title="Matches & Fixtures" />
          <CustomButton title="Add a match" onClick={onOpen} />
        </Flex>
        <SimpleGrid
          mt={{ base: 5, md: 10 }}
          columns={{ base: 1, md: 2 }}
          gap={5}
        >
          {matches?.length > 0 &&
            matches?.map((match, i) => <MatchItem match={match} key={i} />)}
        </SimpleGrid>
        <Flex
          justifyContent={'center'}
          mt={5}
          height={'100%'}
          alignItems={'center'}
        >
          {matches?.length === 0 && <Title title="No Matches yet" />}
        </Flex>
        {isNextPage && (
          <Flex justifyContent={'center'} mt={5}>
            <Link href={`/site/events?page=${currentPage + 1}`} passHref>
              <CustomButton title="Load more" onClick={() => {}} />
            </Link>
          </Flex>
        )}
      </Box>
    </>
  );
};

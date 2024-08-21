'use client';
import React, { useState } from 'react';
import { TicketType } from '../../../../../../types';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FlexText } from 'components/ui/FlexText';
import { CustomButton } from 'components/ui/CustomButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { updateTicketStatus } from '../../../../../../actions/data.actions';

type Props = {
  tickets: TicketType[];
};

export const TicketComponent = ({ tickets }: Props) => {
  console.log(tickets);
  const searchParams = useSearchParams();
  const count = tickets?.length;
  const currentPage = Number(searchParams.get('page')) || 1;
  const id = searchParams.get('id');
  const newsHasNextPage = count > 20 * currentPage;
  return (
    <Box mt={20}>
      <SimpleGrid columns={2} gap={10} pb={30}>
        {tickets?.map((ticket) => (
          <TicketCard key={ticket.id} {...ticket} />
        ))}
      </SimpleGrid>
      {newsHasNextPage && (
        <Flex justifyContent={'center'} mt={5}>
          <Link
            href={`/site/events/tickets?id=${id}&page=${currentPage + 1}`}
            passHref
          >
            <CustomButton title="Load more" onClick={() => {}} />
          </Link>
        </Flex>
      )}
    </Box>
  );
};

const TicketCard = ({
  email,
  match_id,
  id,
  name,
  phone,
  redeemed,
  ticketId,
}: TicketType) => {
  const [redeemTicket, setRedeemTicket] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const handleRedeem = async () => {
    setLoading(true);
    try {
      const { message } = await updateTicketStatus(id, match_id.toString());
      if (message === 'failed') {
        toast({
          title: 'Error',
          description: 'Failed to update ticket',
          status: 'error',
          position: 'top-right',
          duration: 4000,
        });
      }
      if (message === 'success') {
        toast({
          title: 'Success',
          description: 'Ticket has been updated',
          status: 'success',
          position: 'top-right',
          duration: 4000,
        });
        router.refresh();
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Error',
        description: 'Failed to update ticket',
        status: 'error',
        position: 'top-right',
        duration: 4000,
      });
    } finally {
      setLoading(false);
      setRedeemTicket(false);
    }
  };
  return (
    <Card>
      <CardBody gap={5}>
        <FlexText text1="Name:" text2={name} />
        <FlexText text1="Email:" text2={email} />
        <FlexText text1="Used:" text2={redeemed ? 'Yes' : 'No'} />
        <FlexText text1="Phone Number:" text2={phone} />
        <FlexText text1="Ticket ID:" text2={ticketId} />
      </CardBody>
      <CardFooter>
        {!redeemTicket && !redeemed && (
          <CustomButton
            onClick={() => setRedeemTicket(true)}
            title="Redeem Ticket"
          />
        )}
        {redeemTicket && (
          <Flex gap={5}>
            <CustomButton
              onClick={() => setRedeemTicket(false)}
              title="Cancel"
              bg="red"
            />
            <CustomButton
              onClick={handleRedeem}
              title="Redeem"
              loading={loading}
              loadingText="Redeeming"
            />
          </Flex>
        )}
      </CardFooter>
    </Card>
  );
};

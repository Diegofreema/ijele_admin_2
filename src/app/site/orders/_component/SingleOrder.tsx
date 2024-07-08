'use client';
import {
  Box,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { OrderType } from '../../../../../types';
import { Title } from 'components/ui/Title';
import { CustomButton } from 'components/ui/CustomButton';
import { Link } from 'next-view-transitions';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '../../../../../util/supabase/client';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';

interface Props {
  orders: OrderType[];
  count: number;
}

export const SingleOrder = ({ orders, count }: Props) => {
  const supabase = createClient();
  const searchParams = useSearchParams();

  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;
  const newsHasNextPage = count > 20 * currentPage;
  const showModal = (val: number) => {
    router.push(`/site/orders/${val}`);
  };
  return (
    <Box>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Title title="Orders" />
      </Flex>
      {orders?.length > 0 && (
        <Box mt={50}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Order date</Th>
                <Th>Status</Th>
                <Th>id</Th>
                <Th isNumeric>Total cost</Th>

                <Th>View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders?.map((order) => {
                const textColor =
                  order?.status === 'pending'
                    ? 'yellow'
                    : order?.status === 'canceled'
                    ? 'red'
                    : 'green';
                return (
                  <Tr key={order.id}>
                    <Td>{format(order.order_date!, 'dd/MM/yyyy')}</Td>
                    <Td
                      textColor={textColor}
                      fontWeight={'bold'}
                      textTransform={'capitalize'}
                    >
                      {order?.status?.toLowerCase()}
                    </Td>
                    <Td>{order?.order_id}...</Td>
                    <Td isNumeric>₦{+order.total_amount}</Td>
                    <Td>
                      <IconButton
                        aria-label="icon"
                        icon={<Eye />}
                        onClick={() => showModal(order?.id)}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      )}
      <Flex
        justifyContent={'center'}
        mt={5}
        height={'100%'}
        alignItems={'center'}
      >
        {orders?.length === 0 && <Title title="No order yet" />}
      </Flex>
      {newsHasNextPage && (
        <Flex justifyContent={'center'} mt={5}>
          <Link href={`/site/orders?page=${currentPage + 1}`} passHref>
            <CustomButton title="Load more" onClick={() => {}} />
          </Link>
        </Flex>
      )}
    </Box>
  );
};

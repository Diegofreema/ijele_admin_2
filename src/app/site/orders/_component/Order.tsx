'use client';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ORDER } from '../../../../../types';
import { CustomButton } from 'components/ui/CustomButton';
import { updateOrder } from '../../../../../actions/data.actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  order: ORDER[];
  id: string;
}

export const Order = ({ order, id }: Props) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (
    status: 'pending' | 'completed' | 'canceled',
  ) => {
    setLoading(true);
    try {
      const { message } = await updateOrder(+id, status);
      if (message === 'failed') {
        return toast({
          status: 'error',
          title: 'error',
          description: 'Error updating order',
          position: 'top-right',
          duration: 5000,
        });
      }
      if (message === 'success') {
        return toast({
          status: 'success',
          title: 'Success',
          description: 'Order updated successfully',
          position: 'top-right',
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        status: 'error',
        title: 'error',
        description: 'Error updating order',
        position: 'top-right',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Category</Th>
            <Th>Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          {order.map((r) => (
            <Tr key={r.id}>
              <Td>{r.productId?.product_name}</Td>
              <Td>{r.quantity}</Td>
              <Td>{r.productId?.category}</Td>
              <Td>N{r.quantity * r.productId?.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text
        textColor="black"
        fontSize={20}
        fontWeight={700}
        my={3}
        textAlign={'center'}
      >
        Select a status
      </Text>
      <Flex justifyContent={'center'} gap={5} display={'flex'} width="100%">
        <CustomButton
          loading={loading}
          title="Pending"
          onClick={() => handleUpdateStatus('pending')}
          bg="yellow"
        />
        <CustomButton
          loading={loading}
          title="Canceled"
          onClick={() => handleUpdateStatus('canceled')}
          bg="red"
        />
        <CustomButton
          loading={loading}
          title="Completed"
          onClick={() => handleUpdateStatus('completed')}
          bg="green"
        />
      </Flex>
    </>
  );
};

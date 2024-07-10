'use client';

import { Box, Flex, useToast } from '@chakra-ui/react';
import { MemberForm } from 'components/memberForm';
import { Title } from 'components/ui/Title';
import { useState } from 'react';
import { MemberType } from '../../../../../types';
import { addNewMember } from '../../../../../actions/data.actions';
import { useRouter } from 'next/navigation';

export const AddNewMember = ({}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const onSubmit = async (member: MemberType) => {
    setLoading(true);
    try {
      const { message } = await addNewMember(member);
      if (message === 'failed') {
        toast({
          title: 'Error',
          description: 'Something went wrong, please try again',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }

      if (message === 'success') {
        toast({
          title: 'Success',
          description: 'Member has been created successfully',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
        router.push('/site/members');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Title title="Add new member" />
      </Flex>
      <MemberForm
        loading={loading}
        onSubmit={onSubmit}
        isReadOnly={false}
        btn="Add"
      />
    </Box>
  );
};

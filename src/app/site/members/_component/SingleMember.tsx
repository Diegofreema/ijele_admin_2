'use client';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { MemberType } from '../../../../../types';
import { Title } from 'components/ui/Title';
import { CustomButton } from 'components/ui/CustomButton';
import { MemberForm } from 'components/memberForm';
import { useState } from 'react';
import { updateMember } from '../../../../../actions/data.actions';

interface Props {
  user: MemberType;
}

export const SingleMember = ({ user }: Props) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const onSubmit = async (member: MemberType) => {
    setSubmitting(true);
    try {
      const { message } = await updateMember(member);
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
        setIsReadOnly(true);
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
      setSubmitting(false);
    }
  };
  const setReadOnly = () => {
    setIsReadOnly(true);
  };
  return (
    <Box>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Title title={user?.first_name + ' ' + user?.last_name} />
        <CustomButton
          onClick={() => setIsReadOnly(false)}
          title="Edit Member"
        />
      </Flex>

      <Box>
        <MemberForm
          user={user}
          setReadOnly={setReadOnly}
          isReadOnly={isReadOnly}
          onSubmit={onSubmit}
          loading={submitting}
        />
      </Box>
    </Box>
  );
};

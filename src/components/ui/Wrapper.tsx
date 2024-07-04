'use client';
import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: Props) => {
  return (
    <Box width={{ base: '90%', md: '80%' }} mx="auto">
      {children}
    </Box>
  );
};

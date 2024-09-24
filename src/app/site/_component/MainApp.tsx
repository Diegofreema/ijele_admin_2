'use client';
import { Box } from '@chakra-ui/react';
import { Wrapper } from 'components/ui/Wrapper';

interface Props {
  children: React.ReactNode;
}

export const MainApp = ({ children }: Props) => {
  return (
    <Box minH="100dvh" ml={200} px={4} pt={10}>
      <Wrapper>{children}</Wrapper>
    </Box>
  );
};

'use client';
import { Box, Spinner } from '@chakra-ui/react';

interface Props {}

export const Loading = ({}: Props) => {
  return (
    <Box
      minH={'100dvh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Spinner color="black" size="2xl" />
    </Box>
  );
};

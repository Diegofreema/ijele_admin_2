'use client'; // Error components must be Client Components

import { Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Flex
      h="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection={'column'}
      gap={5}
    >
      <h2>Something went wrong!</h2>
      <Button
        bg="black"
        color="white"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </Flex>
  );
}

'use client';
import { Heading } from '@chakra-ui/react';

type Props = {
  title: string;
  small?: boolean;
};

export const Title = ({ title, small }: Props): JSX.Element => {
  return (
    <Heading textColor={'black'} fontSize={small ? 'xl' : '3xl'} maxW={'70%'}>
      {title}
    </Heading>
  );
};

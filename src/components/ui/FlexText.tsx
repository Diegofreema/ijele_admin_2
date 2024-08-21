'use client';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  text1: string;
  text2: string;
};

export const FlexText = ({ text1, text2 }: Props) => {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Text>{text1}</Text>
      <Text fontWeight={'bold'}>{text2}</Text>
    </Flex>
  );
};

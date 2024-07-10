import { Input, Stack, Text } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';

type Props = {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  name: string;
  type?: 'text' | 'date';
  isReadOnly: boolean;
};

export const CustomInput = ({
  label,
  onChange,
  value,
  placeholder,
  name,
  type,
  isReadOnly,
}: Props): JSX.Element => {
  return (
    <Stack>
      <Text textColor={'black'} fontWeight={700}>
        {label}
      </Text>
      <Input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        name={name}
        type={type}
        maxW={500}
        isReadOnly={isReadOnly}
      />
    </Stack>
  );
};

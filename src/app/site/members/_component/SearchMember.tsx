'use client';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Title } from 'components/ui/Title';
import { Search, X } from 'lucide-react';
import { MemberType } from '../../../../../types';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface Props {
  members: MemberType[];
}

export const SearchMembers = ({ members }: Props) => {
  const [val, setVal] = useState('');
  const [value] = useDebounce(val, 1000);
  const router = useRouter();
  const memoizedMembers = useMemo(() => {
    if (!value) return members;
    const lowercaseValue = value.toLowerCase().trim();
    return members.filter(
      (member) =>
        member.first_name.toLowerCase().includes(lowercaseValue) ||
        member.last_name.toLowerCase().includes(lowercaseValue) ||
        member.email.toLowerCase().includes(lowercaseValue) ||
        member.type.toLowerCase().includes(lowercaseValue),
    );
  }, [value, members]);

  const handleClearUrl = () => {
    setVal('');
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setVal(e.target.value);
  };

  return (
    <Box>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Title title="Search members" />
      </Flex>
      <Flex mt={10} justifyContent={'space-between'} alignItems={'center'}>
        <InputGroup maxWidth={400}>
          <InputLeftElement>
            <Search />
          </InputLeftElement>
          <Input
            placeholder="First name, Last name, email or member type"
            onChange={handleChange}
            value={val}
          />
          {val && (
            <InputRightElement onClick={handleClearUrl} cursor={'pointer'}>
              <X />
            </InputRightElement>
          )}
        </InputGroup>
      </Flex>
      <Box mt={20}>
        {memoizedMembers?.length > 0 && (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Dob</Th>
                <Th>Email</Th>
                <Th>Gender</Th>
                <Th>Phone number</Th>
                <Th>Member type</Th>
              </Tr>
            </Thead>
            <Tbody>
              {memoizedMembers?.map((m) => (
                <Tr
                  key={m.id}
                  cursor={'pointer'}
                  onClick={() => router.push(`/site/members/${m.user_id}`)}
                >
                  <Td>{m.first_name}</Td>
                  <Td>{m.last_name}</Td>
                  <Td>{m.dateOfBirth}</Td>
                  <Td>{m.email.slice(0, 10)}...</Td>
                  <Td>{m.gender}</Td>
                  <Td>{m.phoneNumber}</Td>
                  <Td>{m.type}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        <Flex width="100%" justifyContent={'center'}>
          {memoizedMembers?.length === 0 && <Title title="No members found" />}
        </Flex>
      </Box>
    </Box>
  );
};

'use client';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { CustomButton } from 'components/ui/CustomButton';
import { Title } from 'components/ui/Title';
import { Search } from 'lucide-react';
import { MemberType } from '../../../../../types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Link } from 'next-view-transitions';

interface Props {
  members: MemberType[];
  count: number;
}

export const Members = ({ members, count }: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const newsHasNextPage = count > 20 * currentPage;
  const handleClick = () => {
    router.push(`/site/members/search`);
  };
  return (
    <Box>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Title title="Members" />
        <CustomButton
          title="Add member"
          onClick={() => router.push('/site/members/new-member')}
        />
      </Flex>
      <Flex mt={10} justifyContent={'space-between'} alignItems={'center'}>
        <InputGroup maxWidth={400} onClick={handleClick}>
          <InputLeftElement>
            <Search />
          </InputLeftElement>
          <Input placeholder="Search member" isReadOnly cursor="pointer" />
        </InputGroup>
        {/* <Select placeholder="Filter by member type" maxWidth={300}>
          <option value="regular">Regular</option>
          <option value="annual">Annual</option>
          <option value="life">Life</option>
          <option value="honorary-board-membership">
            Honorary board membership
          </option>
          <option value="honorary-president">Honorary president</option>
        </Select> */}
      </Flex>
      <Box mt={20}>
        {members?.length > 0 && (
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
              {members?.map((m) => (
                <Tr
                  key={m.id}
                  cursor={'pointer'}
                  onClick={() => router.push(`/site/members/${m.user_id}`)}
                >
                  <Td>{m?.first_name}</Td>
                  <Td>{m?.last_name}</Td>
                  <Td>{m?.dateOfBirth}</Td>
                  <Td>{m?.email.slice(0, 10)}...</Td>
                  <Td>{m?.gender}</Td>
                  <Td>{m?.phoneNumber}</Td>
                  <Td>{m?.type}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        {members?.length === 0 && <Title title="No members yet" />}
      </Box>
      {newsHasNextPage && (
        <Flex justifyContent={'center'} mt={5}>
          <Link href={`/site/news?page=${currentPage + 1}`} passHref>
            <CustomButton title="Load more" onClick={() => {}} />
          </Link>
        </Flex>
      )}
    </Box>
  );
};

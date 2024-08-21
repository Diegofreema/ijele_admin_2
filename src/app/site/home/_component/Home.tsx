'use client';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { MatchesType } from '../../../../../types';
import { format } from 'date-fns';
import { Suspense } from 'react';
import { ImageSkeleton } from 'app/site/images/_component/ImagComponent';
import { Title } from 'components/ui/Title';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';

interface Props {
  data: {
    numberOfPlayers: number;
    numberOFArticles: number;
    numberOfImages: number;
    numberOfVideos: number;
    productsCount: number;
    matches: MatchesType[];
    memberCount: number;
  };
}

export const Home = ({ data }: Props) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
      <Suspense fallback={<ImageSkeleton />}>
        <HomeCard
          title="Total Players"
          subTitle="The total number of players in the team."
          count={data.numberOfPlayers}
        />
      </Suspense>
      <Suspense fallback={<ImageSkeleton />}>
        <HomeCard
          title="Total News Articles"
          subTitle="The total number of news articles published for the team."
          count={data.numberOFArticles}
        />
      </Suspense>
      <Suspense fallback={<ImageSkeleton />}>
        <HomeCard
          title="Total Images"
          subTitle="The total number of images uploaded for the team."
          count={data.numberOfImages}
        />
      </Suspense>
      <GridItem colSpan={2}>
        <HomeCard
          title="Upcoming Fixtures"
          subTitle="The next 3 upcoming fixtures for the team."
          matches={data.matches}
        />
      </GridItem>
      <Suspense fallback={<ImageSkeleton />}>
        <HomeCard
          title="Total Videos"
          subTitle="The total number of videos uploaded for the team."
          count={data.numberOfVideos}
        />
      </Suspense>
      <Suspense fallback={<ImageSkeleton />}>
        <HomeCard
          title="Total Products"
          subTitle="The total number of products available."
          count={data.productsCount}
        />
      </Suspense>
      <Suspense fallback={<ImageSkeleton />}>
        <HomeCard
          title="Total Members"
          subTitle="The total number of registers members."
          count={data.memberCount}
        />
      </Suspense>
    </SimpleGrid>
  );
};

const HomeCard = ({
  title,
  subTitle,
  count,
  matches,
}: {
  title: string;
  subTitle: string;
  count?: number;
  matches?: MatchesType[];
}) => {
  return (
    <Card>
      <CardBody>
        <Text textColor="black" fontSize={20} fontWeight={'bold'}>
          {title}
        </Text>
        <Text textColor="black" fontSize={15}>
          {subTitle}
        </Text>
      </CardBody>
      <CardFooter>
        <Heading color="black" fontSize={35} fontWeight={'bold'}>
          {count}
        </Heading>
        <SimpleGrid gap={4} columns={{ base: 1, md: 3 }}>
          {matches &&
            (matches?.length > 0 ? (
              matches.map((match, i) => <MatchItem key={i} match={match} />)
            ) : (
              <Heading color="black" fontSize={20} fontWeight={'bold'}>
                No upcoming matches yet.
              </Heading>
            ))}
        </SimpleGrid>
      </CardFooter>
    </Card>
  );
};

export const MatchItem = ({ match }: { match: MatchesType }) => {
  const pathname = usePathname();
  const notHome = !pathname.includes('/home');
  const pathToGo = pathname.includes('/home')
    ? '/site/home'
    : `/site/events/${match?.id}`;
  return (
    <Link href={pathToGo} className="cursor-pointer">
      <Card flexDir={'column'} width={'fit-content'}>
        <CardBody>
          <Flex alignItems={'center'} justifyContent="space-between">
            {notHome && (
              <Box>
                <Text textColor="grey" fontSize={12}>
                  Date: {format(match?.date_of_match, 'dd/MM/yyyy')}
                </Text>
                <Text textColor="grey" fontSize={12}>
                  Kick off: {match?.kick_off}
                </Text>
              </Box>
            )}
            {notHome && (
              <Box>
                <Text textColor="grey" fontSize={12}>
                  Venue: {match?.venue}
                </Text>
                <Text textColor="grey" fontSize={12}>
                  Referee: {match?.ref_name}
                </Text>
              </Box>
            )}
          </Flex>
          <Flex gap={3} alignItems={'center'} mt={3}>
            <Flex alignItems={'center'} gap={2}>
              {notHome && <Avatar src={match?.home_team_img} />}
              <Text fontSize={13} fontWeight={'bold'} textColor="black">
                {match?.home_team}
              </Text>
            </Flex>
            <Text>vs</Text>
            <Flex alignItems={'center'} gap={2}>
              {notHome && <Avatar src={match?.away_team_image} />}
              <Text fontSize={13} fontWeight={'bold'} textColor="black">
                {match?.away_team}
              </Text>
            </Flex>
          </Flex>
        </CardBody>
        {notHome && (
          <CardFooter display={'flex'} flexDir={'column'}>
            <Box width="100%">
              <Title small title="Result" />
              <Text fontWeight={'bold'}> {match?.RESULT}</Text>

              <Flex>
                <Text fontWeight={'bold'}>{match?.home_score}</Text>:{' '}
                <Text fontWeight={'bold'}>{match?.away_score}</Text>
              </Flex>
            </Box>
            <Box>
              <Text fontWeight={'bold'}>Regular ticket price</Text>
              <Text fontWeight={'bold'}>₦{match?.ticket_price}</Text>
            </Box>
            <Box>
              <Text fontWeight={'bold'}>VIP ticket price</Text>
              <Text fontWeight={'bold'}>₦{match?.vip_price}</Text>
            </Box>
            <Box>
              <Text fontWeight={'bold'}>VVIP ticket price</Text>
              <Text fontWeight={'bold'}>₦{match?.vvip_price}</Text>
            </Box>
            <Box>
              <Text fontWeight={'bold'}>Ticket available</Text>
              <Text fontWeight={'bold'}>{match?.ticket_available}</Text>
            </Box>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};

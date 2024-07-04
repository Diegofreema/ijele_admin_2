'use client';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import {
  Home,
  Users,
  Newspaper,
  Video,
  ImageIcon,
  Store,
  Calendar,
} from 'lucide-react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

interface Props {}

const links = [
  {
    href: '/site/home',
    label: 'Home',
    icon: (
      <Icon
        as={Home}
        _groupHover={{
          color: 'white',
          transform: 'translateX(10px)',
          transition: 'all 0.3s ease',
        }}
        color={'black'}
        boxSize={6}
      />
    ),
  },
  {
    href: '/site/players',
    label: 'First team',
    icon: (
      <Icon
        as={Users}
        _groupHover={{
          color: 'white',
          transform: 'translateX(10px)',
          transition: 'all 0.3s ease',
        }}
        color={'black'}
        boxSize={6}
      />
    ),
  },
  {
    href: '/site/news',
    label: 'News',
    icon: (
      <Icon
        as={Newspaper}
        _groupHover={{
          color: 'white',
          transform: 'translateX(10px)',
          transition: 'all 0.3s ease',
        }}
        color={'black'}
        boxSize={6}
      />
    ),
  },
  {
    href: '/site/videos',
    label: 'Videos',
    icon: (
      <Icon
        as={Video}
        _groupHover={{
          color: 'white',
          transform: 'translateX(10px)',
          transition: 'all 0.3s ease',
        }}
        color={'black'}
        boxSize={6}
      />
    ),
  },
  {
    href: '/site/images',
    label: 'Images',
    icon: (
      <Icon
        as={ImageIcon}
        _groupHover={{
          color: 'white',
          transform: 'translateX(10px)',
          transition: 'all 0.3s ease',
        }}
        color={'black'}
        boxSize={6}
      />
    ),
  },
  {
    href: '/site/shop',
    label: 'Shop',
    icon: (
      <Icon
        as={Store}
        _groupHover={{
          color: 'white',
          transform: 'translateX(10px)',
          transition: 'all 0.3s ease',
        }}
        color={'black'}
        boxSize={6}
      />
    ),
  },
  {
    href: '/site/events',
    label: 'Events',
    icon: (
      <Icon
        as={Calendar}
        _groupHover={{
          color: 'white',
          transform: 'translateX(10px)',
          transition: 'all 0.3s ease',
        }}
        color={'black'}
        boxSize={6}
      />
    ),
  },
];

export const SideNav = ({}: Props) => {
  return (
    <Box
      minH={'100vh'}
      width={200}
      position={'fixed'}
      left={0}
      top={0}
      bottom={0}
      borderRightWidth={1}
      borderColor={'#ccc'}
      display="flex"
      flexDirection="column"
      gap={5}
      pt={5}
    >
      {links.map((link, i) => (
        <LinkItem link={link} key={i} />
      ))}
    </Box>
  );
};

const LinkItem = ({ link }: { link: (typeof links)[0] }) => {
  const pathname = usePathname();
  const isActive = pathname.includes(link.href);
  return (
    <Link href={link.href}>
      <Flex
        _hover={{ bg: 'black' }}
        role="group"
        transition={'background 0.2s ease'}
        gap={3}
        p={3}
        align="center"
        borderRightColor={isActive ? 'black' : 'transparent'}
        borderRightWidth={2}
      >
        {link.icon}
        <Text
          _groupHover={{
            color: 'white',
            transform: 'translateX(10px)',
            transition: 'all 0.3s ease',
          }}
          textColor={'black'}
        >
          {link.label}
        </Text>
      </Flex>
    </Link>
  );
};

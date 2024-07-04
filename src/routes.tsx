import { Icon } from '@chakra-ui/react';
import { FaNewspaper } from 'react-icons/fa';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdImage,
  MdVideoCameraBack,
  Md1KPlus,
} from 'react-icons/md';

// Admin Imports
// import MainDashboard from './pages/admin/default';
// import NFTMarketplace from './pages/admin/nft-marketplace';
// import Profile from './pages/admin/profile';
// import DataTables from './pages/admin/data-tables';
// import RTL from './pages/rtl/rtl-default';

// Auth Imports
// import SignInCentered from './pages/auth/sign-in';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    secondary: true,
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
];

export default routes;

export const links: IRoute[] = [
  {
    name: 'Shop',
    layout: '/site',
    path: '/shop',
    icon: <Icon as={FaNewspaper} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'News',
    layout: '/site',
    path: '/news',
    icon: <Icon as={FaNewspaper} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Images',
    layout: '/site',
    path: '/images',
    icon: <Icon as={MdImage} width="20px" height="20px" color="inherit" />,
    secondary: true,
  },
  {
    name: 'Videos',
    layout: '/site',
    icon: (
      <Icon as={MdVideoCameraBack} width="20px" height="20px" color="inherit" />
    ),
    path: '/videos',
  },
  {
    name: 'Players',
    layout: '/site',
    path: '/players',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Events',
    layout: '/site',
    path: '/events',
    icon: <Icon as={Md1KPlus} width="20px" height="20px" color="inherit" />,
  },
];

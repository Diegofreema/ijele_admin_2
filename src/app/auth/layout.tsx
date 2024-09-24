'use client';
import { PropsWithChildren, useState } from 'react';

// Chakra imports
import { Box, useColorModeValue } from '@chakra-ui/react';
import Cookies from 'js-cookie';
// Layout components
import { SidebarContext } from 'contexts/SidebarContext';
import { isWindowAvailable } from 'utils/navigation';
import { redirect } from 'next/navigation';

// Custom Chakra theme

interface AuthProps extends PropsWithChildren {}

export default function AuthLayout({ children }: AuthProps) {
  const userId = Cookies.get('userId');
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const authBg = useColorModeValue('white', 'navy.900');
  if (userId) {
    return redirect('/site/home');
  }
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Box
          bg={authBg}
          float="right"
          minHeight="100dvh"
          height="100%"
          position="relative"
          w="100%"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Box mx="auto" minH="100dvh">
            {children}
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}

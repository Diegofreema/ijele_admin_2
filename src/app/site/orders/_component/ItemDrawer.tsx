import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ItemDrawer = ({ isOpen, onClose }: Props): JSX.Element => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'lg'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Order item</DrawerHeader>

        <DrawerBody></DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

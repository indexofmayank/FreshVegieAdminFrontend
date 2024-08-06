import React from "react";
import {
  SidebarWithHeader,
  CreateNewBannerModal
} from '../components';
import { HStack, Button, VStack, Spinner, Heading } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';


function BannerPage() {
  return (
    <SidebarWithHeader>
      <HStack mb={5}>
        <CreateNewBannerModal />
        <Button
          colorScheme="brown"
          variant="outline"
          leftIcon={<MdOutlineRefresh />}
        >
          Refresh
        </Button>
      </HStack>
    </SidebarWithHeader>
  )
}

export default BannerPage;
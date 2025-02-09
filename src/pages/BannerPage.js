import React,{ useEffect } from "react";
import {
  SidebarWithHeader,
  CreateNewBannerModal,
  BannerTable
} from '../components';
import { HStack, Button, VStack, Spinner, Heading } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useBannerContext } from "../context/banner_context";
import { useNotificationContext } from '../context/notification_context';

function BannerPage() {

  const {
    banners,
    banner_loading: loading,
    banner_error: error,
    fetchBanner,
  } = useBannerContext();

  const {
    notificationProductName,
    fetchProductNameForNotification,
    notificationcategorieName,
    fetchCategoryNameForNotification,
} = useNotificationContext();

  const handleRefresh = async () => {
    await fetchBanner();
  }

  useEffect(() => {
    fetchProductNameForNotification();
    fetchCategoryNameForNotification();
    fetchBanner();
   
}, []);

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewBannerModal />
          <Button
            colorScheme="brown"
            variant="outline"
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>

      </SidebarWithHeader>

    )
  }

  if (error) {
    return (
      <SidebarWithHeader>
      <HStack mb={5}>
        <CreateNewBannerModal />
        <Button
          colorScheme="brown"
          variant="outline"
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </HStack>
      <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>

    </SidebarWithHeader>

    )
  }

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
      <BannerTable banners={banners} notificationcategorieName={notificationcategorieName} notificationProductName={notificationProductName}/>
    </SidebarWithHeader>
  )
}

export default BannerPage;
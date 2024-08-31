import React from 'react';
import { SidebarWithHeader, OrdersTable } from '../components';
import { useOrderContext } from '../context/order_context';
import { Heading, VStack, HStack, Button, Spinner, Tooltip } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { FaDownload } from "react-icons/fa";
import axios from 'axios';
import { getCsvDownload_url } from '../utils/constants';

function OrdersPage() {
  const {
    orders,
    orders_loading: loading,
    orders_error: error,
    fetchOrders,
  } = useOrderContext();

  const handleRefresh = async () => {
    await fetchOrders();
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(getCsvDownload_url, {
        responseType: 'blob', // Ensure the response is treated as a file
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Orders.csv'); // Specify the download file name
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up and remove the link
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <Button
            colorScheme='brown'
            variant='outline'
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
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <Button
            colorScheme='brown'
            variant='outline'
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
    );
  }

  return (
    <SidebarWithHeader>
      <HStack mb={5} spacing={4}>
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
        <Tooltip label="Download Orders CSV" aria-label="Download Orders CSV Tooltip">
          <FaDownload 
            size={30}
            style={{ cursor: 'pointer' }}
            onClick={handleDownload}
          />
        </Tooltip>
      </HStack>
      <OrdersTable orders={orders} />
    </SidebarWithHeader>
  );
}

export default OrdersPage;

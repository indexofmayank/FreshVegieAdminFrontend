import React, { useEffect, useState } from 'react';
import { SidebarWithHeader, OrdersTable, OrderStatus } from '../components';
import { useOrderContext } from '../context/order_context';
import { Heading, VStack, HStack, Button, Spinner, Tooltip } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { getCsvDownload_url } from '../utils/constants';
import { useOrderStatusContext } from '../context/orderStatus_context';
import { useHistory } from 'react-router-dom'; // Import useHistory

function OrdersPage() {
  const history = useHistory(); // Initialize history object

  const {
    orderStatus_loading: loading,
    orderStatus_error: error,
    orderStatus,
    fetchOrderStatus,
    totalOrder_loading,
    totalOrder_error,
    totalOrder,
    fetchOrderTotalCount,
    totalAvg_error,
    totalAvg,
    fetchOrderAvgCount,
    totalSales_loading,
    totalSales_error,
    totalSales,
    fetchOrderTotalStats,
  } = useOrderStatusContext();

  const {
    orderForTable_loading,
    orderForTable_error,
    orderForTable,
    fetchOrdersForTable
  } = useOrderContext();

  useEffect(() => {
    const loadData = async () => {
      await fetchOrderStatus();
      await fetchOrderTotalCount();
      await fetchOrderAvgCount();
      await fetchOrderTotalStats();  
    };
    loadData();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await axios.get(getCsvDownload_url, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Orders.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const [tabelLabel, setTableLabel] = useState(null);
  const handleCardClick = async (label) => {
    setTableLabel(label);
    await fetchOrdersForTable(label);
  };

  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
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
          onClick={() => history.push('/create-order')} // Use history.push for navigation
        >
          Create New Orders
        </Button>
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
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
      {tabelLabel === null ? (
        <OrderStatus
          orderStatus={orderStatus}
          totalOrder={totalOrder}
          totalAvg={totalAvg}
          totalSales={totalSales}
          handleCardClick={handleCardClick}
        />
      ) : (
        <OrdersTable orders={orderForTable} />
      )}
    </SidebarWithHeader>
  );
}

export default OrdersPage;

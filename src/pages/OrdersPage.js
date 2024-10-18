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
  
  const [selectedDate, setSelectedDate] = useState([new Date(), new Date()])


  useEffect(() => {
    const loadData = async () => {
      await fetchOrderStatus();
      await fetchOrderTotalCount();
      await fetchOrderAvgCount();
      await fetchOrderTotalStats();  
    };
    loadData();
  }, []);

  const [tabelLabel, setTableLabel] = useState(null);
  const [filter, setFilter] = useState('All');
  const handleCardClick = async (label) => {
    setTableLabel(label);
    await fetchOrdersForTable('', '', '', label);
  };
  console.log(filter);
  const handleDownload = async () => {
    console.log(selectedDate);
   
    if(filter=='Custom') {
      try {
        const response = await axios.get(`${getCsvDownload_url}?period='custom'&startDate=${selectedDate[0]}&endDate=${selectedDate[1]}`, {
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
  
    } else {
      try {
        const response = await axios.get(`${getCsvDownload_url}?filter=${filter}`, {
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

  const resultedOrders = orderForTable?.data || [];

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
        {tabelLabel === null ? (
        <Tooltip label="Download Orders CSV" aria-label="Download Orders CSV Tooltip">
        <FaDownload 
          size={30}
          style={{ cursor: 'pointer' }}
          onClick={handleDownload}
        />
      </Tooltip>
        ):<></>}
      </HStack>
      {tabelLabel === null ? (
        <OrderStatus
          orderStatus={orderStatus}
          totalOrder={totalOrder}
          totalAvg={totalAvg}
          totalSales={totalSales}
          handleCardClick={handleCardClick}
          filter={filter}
          setFilter = {setFilter}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ) : (
        <OrdersTable 
        orders={resultedOrders} 
        totalItem={orderForTable?.totalOrders || null}
        page={orderForTable?.page || null}
        totalPage={orderForTable?.totalPages || null}
        limit = {orderForTable?.limit || null}
        itemFetchFunction={fetchOrdersForTable}
        label={tabelLabel}
        />
      )}
    </SidebarWithHeader>
  );
}

export default OrdersPage;

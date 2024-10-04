import React, { useEffect } from 'react';
import { useOrderContext } from '../context/order_context';
import { FaShoppingCart, FaRupeeSign } from 'react-icons/fa';
import { MdPendingActions, MdDeliveryDining } from 'react-icons/md';
import { formatPrice } from '../utils/helpers';
import {
  Flex,
  Icon,
  Square,
  Spacer,
  Text,
  Heading,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import { useOrderStatusContext } from '../context/orderStatus_context';
import {useDashboardContext} from '../context/dashboard_context';

function DashboardCards() {

  const {
    totalOrder_loading,
    totalOrder_error,
    totalOrder,
    totalSales_loading,
    totalSales_error,
    totalSales,
    fetchOrderTotalStats,
    fetchOrderTotalCount,
  }  = useOrderStatusContext();

  const {
    totalDeliveredOrder_loading,
    totalDeliveredOrder_error,
    totalDeliveredOrder,
    fetchTotalDeliveredOrder,
    totalPendingOrder_loading,
    totalPendingOrder_error,
    totalPendingOrder,
    fetchTotalPendingOrder,
    fetchOrderDashboardTable,
    allOrdersForDashboardTable_loading,
    allOrdersForDashboardTable_error,
    allOrdersForDashbaordTable
  } = useDashboardContext();



  useEffect(() => {
    const loadData = async () => {
      await fetchOrderTotalCount();
      await fetchOrderTotalStats();  
      await fetchTotalDeliveredOrder();
      await fetchTotalPendingOrder();
    }
    loadData();
  }, []);



  const numberOfTotalOrders = totalOrder?.[0]?.totalOrders || 'N/a'
  const numberOfTotalSales = totalSales || 'N/a'
  const numberOfDeliveredOrder = totalDeliveredOrder?.[0]?.count || 'N/a'
  const numberOfPendingOrder = totalPendingOrder?.[0]?.count || 'N/a'
  const cardList = [
    {
      title: 'Total Orders',
      value:  numberOfTotalOrders,
      icon: FaShoppingCart,
      color: 'brown.500',
    },
    {
      title: 'Pending Orders',
      value: numberOfPendingOrder,
      icon: MdPendingActions,
      color: 'red.500',
    },
    {
      title: 'Delivered Orders',
      value: numberOfDeliveredOrder,
      icon: MdDeliveryDining,
      color: 'blue.500',
    },
    {
      title: 'Total Revenue',
      value: numberOfTotalSales,
      icon: FaRupeeSign,
      color: 'green.500',
    },
  ];

  return (
    <SimpleGrid minChildWidth='250px' spacing={5} mb={5}>
      {cardList.map((card, index) => {
        const { title, value, icon, color } = card;
        return (
          <Flex
            key={index}
            shadow='lg'
            bg='white'
            p='5'
            borderRadius='lg'
            justifyContent='center'
            onClick={ async() => {
              if(parseInt(index) === 0) {
                await fetchOrderDashboardTable('', '', 'total_order');
              }
              if(parseInt(index) === 1) {
                await fetchOrderDashboardTable('', '', 'pending');
              }
              if(parseInt(index) === 2) {
                await fetchOrderDashboardTable('', '', 'delivered');
              }
            }}
          >
            <Box>
              <Text fontSize='1xl' color='gray.500'>
                {title}
              </Text>
              <Heading size='lg' color={color}>
                {value}
              </Heading>
            </Box>
            <Spacer />
            <Square size='60px' bg='brown.400' borderRadius='lg'>
              <Icon as={icon} color='white' />
            </Square>
          </Flex>
        );
      })}
    </SimpleGrid>
  );
}

export default DashboardCards;

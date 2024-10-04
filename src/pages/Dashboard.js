
import React, { useEffect } from 'react';
import { SidebarWithHeader, DashboardCards, OrdersTable } from '../components';
import { useDashboardContext } from '../context/dashboard_context'
import { useOrderContext } from '../context/order_context';
import { HStack, VStack, Spinner, Heading } from '@chakra-ui/react';
export default function Dashboard() {

  const {
    recentOrder_loading,
    recentOrder_error,
    recentOrder,
    fetchRecentOrderForTable
  } = useOrderContext();

  const {
    fetchOrderDashboardTable,
    allOrdersForDashboardTable_loading: loading,
    allOrdersForDashboardTable_error: error,
    allOrdersForDashbaordTable
  } = useDashboardContext();

  useEffect(() => {
    fetchOrderDashboardTable('', '', 'total_order');
  }, []);


  const resultedOrderes = allOrdersForDashbaordTable?.data || [];
  console.log(resultedOrderes)


  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <VStack alignItems='center' justifyContent='center'>
            <Spinner size='lg' color='brown.500' />
          </VStack>
        </HStack>
      </SidebarWithHeader>
    )
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <VStack alignItems='center' justifyContent='center'>
            <Heading color='red.500'>There was an error</Heading>
          </VStack>
        </HStack>

      </SidebarWithHeader>
    );
  }


  console.log(allOrdersForDashbaordTable);
  return (
    <SidebarWithHeader>
      <DashboardCards />
      <OrdersTable
        orders={resultedOrderes}
        totalItem={allOrdersForDashbaordTable?.totalOrders || null}
        page={allOrdersForDashbaordTable?.page || null}
        totalPage={allOrdersForDashbaordTable?.totalPages || null}
        limit={allOrdersForDashbaordTable?.limit || null}
        itemFetchFunction={fetchOrderDashboardTable}
      />
    </SidebarWithHeader>
  );
}

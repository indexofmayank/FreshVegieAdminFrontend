
import React, {useEffect} from 'react';
import { SidebarWithHeader, DashboardCards, OrdersTable } from '../components';
// import {useDashboardContext} from '../context/dashboard_context'
import { useOrderContext } from '../context/order_context';
export default function Dashboard() {

  const { 
    recentOrder_loading,
    recentOrder_error,
    recentOrder,
    fetchRecentOrderForTable
   } = useOrderContext();

  return (
    <SidebarWithHeader>
      <DashboardCards />
      <OrdersTable orders={recentOrder} />
    </SidebarWithHeader>
  );
}

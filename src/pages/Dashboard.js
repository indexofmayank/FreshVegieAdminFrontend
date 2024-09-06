import React, {useEffect} from 'react';
import { SidebarWithHeader, DashboardCards, OrdersTable } from '../components';
import { useOrderContext } from '../context/order_context';

export default function Dashboard() {
  const { 
    recentOrder_loading,
    recentOrder_error,
    recentOrder,
    fetchRecentOrderForTable
   } = useOrderContext();

   useEffect(() => {
    const loadData = async () => {
      await fetchRecentOrderForTable();
    }
    loadData();
   }, []);

  return (
    <SidebarWithHeader>
      <DashboardCards />
      <OrdersTable orders={recentOrder} />
    </SidebarWithHeader>
  );
}

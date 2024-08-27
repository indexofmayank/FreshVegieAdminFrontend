import {
  Heading,
  HStack,
  Spinner,
  VStack,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import {
  SidebarWithHeader,
  OrderTableWithItem
} from '../components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderContext } from '../context/order_context';
import { orderStatusList } from '../utils/constants';

function SingleOrderPage() {
  const { id } = useParams();
  const [statusList, setStatusList] = useState([...orderStatusList]);
  const toast = useToast();
  const {
    order_withItem_loading: loading,
    order_withItem_error: error,
    order_withItems,
    single_order_status,
    updateOrderStatus,
    fetchOrderWithItems,
    userBillingInfo,
    fetchUserOrderBillingInfo,
    userPaymentInfo_loading,
    userPaymentInfo_error,
    userPaymentInfo,
    fetchUserOrderPaymentInfo,
    userDeliveryInfo_loading,
    userDeliveryInfo_error,
    userDeliveryInfo,
    fetchUserOrderDeliveryInfo,
    customOrderId_loading,
    customOrderId_error,
    customOrderId,
    fetchCustomOrderId,
    quantityWiseOrder_laoding,
    quantityWiseOrder_error,
    quantityWiseOrder,
    fetchQuantityWiseOrder,
    singleOrderStatus_loading,
    singleOrderStatus_error,
    singleOrderStatus,
    fetchSingleOrderStatus
  } = useOrderContext();

  const handleChange = async (e) => {
    const status = e.target.value;
    const response = await updateOrderStatus(status, id);
    fetchSingleOrderStatus(id);
    if(response.success) {
      return toast({
        position: 'top',
        description: `Order ${response.status}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      return toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    fetchOrderWithItems(id);
    fetchUserOrderBillingInfo(id);
    fetchUserOrderPaymentInfo(id);
    fetchUserOrderDeliveryInfo(id);
    fetchCustomOrderId(id);
    fetchQuantityWiseOrder(id);
    fetchSingleOrderStatus(id);
  }, [id]);
  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <VStack alignItems='center' justifyContent='center' >
            <Spinner size='lg' color='brown.500' />
          </VStack>
        </HStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <VStack alignItems='center' justifyContent='center' >
            <Heading color='red.500'>There was an error</Heading>
          </VStack>
        </HStack>
      </SidebarWithHeader>
    );
  }
  return (
    <SidebarWithHeader>
      <HStack bg='white' p={5} mb={5} shadow='sm' borderRadius='lg'>
        <Text>STATUS: </Text>
        <Select
          variant='filled'
          focusBorderColor='brown.500'
          value={single_order_status}
          onChange={handleChange}
        >
          {statusList.map((status, index) => {
            const { name, value } = status;
            return (
              <option key={index} value={value}>
                {name}
              </option>
            );
          })}

        </Select>
      </HStack>
      <VStack>
        <OrderTableWithItem
        id={id}
         orderWithItems={order_withItems[0]}
         userBillingInfo={userBillingInfo}
         userPaymentInfo={userPaymentInfo}
         userDeliveryInfo={userDeliveryInfo}
         customOrderId={customOrderId}
         quantityWiseOrder={quantityWiseOrder}
         singleOrderStatus={singleOrderStatus}
         />

      </VStack>
    </SidebarWithHeader>
  );
}

export default SingleOrderPage;

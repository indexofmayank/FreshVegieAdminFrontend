import {
  Heading,
  HStack,
  Spinner,
  VStack,
  Select,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import {
  SidebarWithHeader,
  OrderTableWithItem
} from '../components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderContext } from '../context/order_context';
import { orderStatusList,getNextStatusOptions } from '../utils/constants';

function SingleOrderPage() {
  const { id } = useParams();
  const [statusList, setStatusList] = useState([...orderStatusList]);
  const toast = useToast();
  const [deliveryType, setDeliveryType] = useState(null);
  const [isThirdPartyDeliveryDetailOpen, setThirdPartyDeliveryDetailOpen] = useState(false);
  const [isAssignDeliveryDetailOpen, setAssignDeliveryDetailOpen] = useState(false);
  const [deliveryPartnerInfoLoading, setDeliveryPartnerInfoLoading] = useState(false);
  const [delivieryPartnerName, setDeliveryPartnerName] = useState();
  const [deliveryPartnerPhone, setDeliveryPartnerPhone] = useState();
  const [deliveryPartnerEmail, setDeliveryPartnerEmail] = useState();
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [cleandOrderStatus, setCleanedOrderStatus] = useState('');
  // const [currentStatus, setCurrentStatus] = useState(null);
  const availableStatuses = getNextStatusOptions(cleandOrderStatus);
  
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
    fetchSingleOrderStatus,
    deliveryPartner_loading,
    deliveryPartner_error,
    deliveryPartner,
    fetchDeliveryPartnersName,
    updateDeliveryInfo,
    deliveryPartnerDetailById,
    fetchOrderDateByOrderId,
    orderDate_loading,
    orderDate_error,
    orderDate
  } = useOrderContext();

  const handleChange = async (e) => {
    const status = e.target.value;
    const response = await updateOrderStatus(status, id);
    fetchSingleOrderStatus(id);
    if (response.success) {
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
    fetchDeliveryPartnersName();
    fetchOrderDateByOrderId(id);
  }, [id]);

  useEffect(() => {
    const loadData = () => {
      const status = singleOrderStatus?.data?.status || '';
      const cleanedStr = status.replace(/[^a-zA-Z0-9\s]/g, ' ');
      // console.log(status);  
      // setCurrentStatus(status)
      // Capitalize the first letter of each word
      const capitalizedStr = cleanedStr
        .toLowerCase()
        .split(' ')
        .filter(word => word) // To avoid empty strings
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      setCleanedOrderStatus(status);
      return;
    }

    loadData();

  }, [id, singleOrderStatus]);


  useEffect(() => {
    if (singleOrderStatus?.data?.status === 'assign_delivery') {
      setAssignDeliveryDetailOpen(true);
    }
    if (userDeliveryInfo?.userDeliveryDetail?.deliveryType !== 'N/A') {
      setAssignDeliveryDetailOpen(false);
    }
  }, [id, singleOrderStatus, setAssignDeliveryDetailOpen, userDeliveryInfo]);

  useEffect(() => {
    // console.log(cleandOrderStatus);
    if (cleandOrderStatus !='') {
      const availableStatuses = getNextStatusOptions(cleandOrderStatus);
      // console.log(availableStatuses)
    }
  }, [cleandOrderStatus]);
  


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

  console.log(customOrderId);

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
        {/* <Select
          variant='filled'
          focusBorderColor='brown.500'
          value={cleandOrderStatus}
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
        </Select> */}
        <Select
        variant='filled'
        focusBorderColor='brown.500'
        value={cleandOrderStatus}
        onChange={handleChange}
        >
      {availableStatuses.map((status, index) => {
        const { name, value } = status;
        return (
          <option key={index} value={value}>
            {name}
          </option>
        );
      })}
    </Select>
      </HStack>
      {isAssignDeliveryDetailOpen && singleOrderStatus?.data?.status === 'assign_delivery' && (
        <VStack bg='white' p={5} mb={5} shadow='sm' borderRadius='lg'>
          <Select
            variant='filled'
            focusBorderColor='brown.500'
            placeholder='Select delivery partner type'
            onChange={(e) => {
              setDeliveryType(e.target.value);
              if (e.target.value === '1') {
                setThirdPartyDeliveryDetailOpen(true);
              }
            }}
          >
            <option key='1' value='1'>Third party delivery partner</option>
            <option key='2' value='2'>In house delivery partner</option>
          </Select>
          {isThirdPartyDeliveryDetailOpen && deliveryType === '1' && (
            <>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder='Delivery Partner Name'
                  name='deliveryPartnerName'
                  focusBorderColor='brown.500'
                  onChange={(e) => setDeliveryPartnerName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  placeholder='Delivery Partner Phone'
                  name='deliveryPartnerName'
                  focusBorderColor='brown.500'
                  onChange={(e) => setDeliveryPartnerPhone(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder='Delivery Partner Email'
                  name='deliveryPartnerEmail'
                  focusBorderColor='brown.500'
                  onChange={(e) => setDeliveryPartnerEmail(e.target.value)}
                />
              </FormControl>

              <Button
                isLoading={deliveryPartnerInfoLoading}
                colorScheme='brown'
                loadingText='updating'
                onClick={async () => {
                  setDeliveryPartnerInfoLoading(true)
                  const response = await updateDeliveryInfo(id, deliveryType, delivieryPartnerName, deliveryPartnerEmail, deliveryPartnerPhone);
                  setDeliveryPartnerInfoLoading(false)
                  setThirdPartyDeliveryDetailOpen(!isThirdPartyDeliveryDetailOpen);
                  setAssignDeliveryDetailOpen(!isAssignDeliveryDetailOpen);
                  if (response.success) {
                    return toast({
                      position: 'top',
                      description: `Delivery partner details updated`,
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
                    })
                  }
                }}
              >
                Save
              </Button>

            </>
          )}
          {deliveryType === '2' && (
            <Select
              variant='filled'
              focusBorderColor='brown.500'
              placeholder='Select delivery Partner'
              onChange={async (e) => {
                setAssignDeliveryDetailOpen(!isAssignDeliveryDetailOpen);
                setShowLoadingSpinner(true)
                const response = await deliveryPartnerDetailById(e.target.value);
                console.log(response);
                const type = '2'
                const { name } = response;
                const { phone } = response;
                const { email } = response;
                const {_id} = response;
                const secondResponse = await updateDeliveryInfo(id, type, name, email, phone, _id);
                setShowLoadingSpinner(false);
                if (secondResponse.success) {
                  return toast({
                    position: 'top',
                    description: 'Delivery partner details updated',
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                  });
                } else {
                  return toast({
                    position: 'top',
                    description: response.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                  });
                }
              }}
            >
              {deliveryPartner.map((partner, index) => {
                const { name, _id } = partner;
                return (
                  <option key={index} value={_id}>{name}</option>
                );
              })}
            </Select>

          )}

        </VStack>
      )}
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
          orderDate={orderDate}
        />

      </VStack>
    </SidebarWithHeader>
  );
}

export default SingleOrderPage;

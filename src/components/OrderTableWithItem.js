import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Image,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {OrderWeightPopover} from '../components/';

const OrderTableWithItem = ({ orderWithItems, userBillingInfo, userPaymentInfo, userDeliveryInfo, customOrderId, quantityWiseOrder }) => {
  // Safely access orderItems using optional chaining
  const userBillingdata = userBillingInfo?.userBillingInfo?.[0] || [];
  const orderItems = orderWithItems?.orderItems || [];
  const paymentInfo = userPaymentInfo?.userPaymentDetail || {};
  const deliveryInfo = userDeliveryInfo?.userDeliveryDetail || {};
  const orderId = customOrderId?.data?.orderId || 'N/A';
  const weightWiseOrder = quantityWiseOrder?.data?.orderItems || [];
  const totalWeight = quantityWiseOrder?.data?.total_quantity || null;

  return (
    <Grid templateColumns="2fr 1fr" gap={6} p={4}>
      {/* Left Side: Order Table */}
      <GridItem>
        <Box bg="white" shadow="md" p={4} borderRadius="md">
          <Heading size="md" mb={4}>
            Order Details of {orderId}
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Item Name</Th>
                <Th>Item Price</Th>
                <Th>Disc. Price</Th>
                <Th>Quantity</Th>
                <Th>Tax</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderItems.length > 0 ? (
                orderItems.map((item, index) => {
                  const { name, image, item_price, item_total, item_total_discount, item_total_tax, quantity } = item;
                  return (
                    <Tr key={index}>
                      <Td>
                        <Box display="flex" alignItems="center">
                          <Image
                            src={image}
                            alt={name}
                            boxSize="50px"
                            mr={3}
                          />
                          <Box>
                            <Text>{name}</Text>
                          </Box>
                        </Box>
                      </Td>
                      <Td>₹{item_price}</Td>
                      <Td>₹{item_total_discount}</Td>
                      <Td>{quantity}</Td>
                      <Td>₹{item_total_tax}</Td>
                      <Td>₹{item_total}</Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan={6} textAlign="center">
                    No items found.
                  </Td>
                </Tr>
              )}
              <Td>Total</Td>
              <Td></Td>
              <Td>{orderWithItems?.total_discount}</Td>
              <Td>{orderWithItems?.total_item_count}</Td>
              <Td>{orderWithItems?.total_tax}</Td>
              <Td>{orderWithItems?.items_grand_total}</Td>
            </Tbody>
          </Table>
          {/* Additional Order Summary */}
          <Box mt={4}>
            <SimpleGrid columns={2} spacing={4}>
              <Text>Delivery Fee</Text>
              <Text textAlign="right">Free</Text>
              <Text>Additional Charges</Text>
              <Text textAlign="right">₹0.00</Text>
              <Text>Service Charges</Text>
              <Text textAlign="right">₹0.00</Text>
              <Text>Discounts</Text>
              <Text textAlign="right">₹0.00</Text>
              <Heading size="sm" mt={2}>
                Grand Total
              </Heading>
              <Heading size="sm" mt={2} textAlign="right">
                {orderWithItems?.grand_total}
              </Heading>
            </SimpleGrid>
          </Box>
        </Box>
      </GridItem>

      {/* Right Side: Customer and Payment Details */}
      <GridItem>
        <SimpleGrid spacing={4}>
          <Box bg="white" shadow="md" p={4} borderRadius="md">
            <Heading size="sm" mb={2}>
              Customer Details
            </Heading>
            <Text>{userBillingdata.name}</Text>
            <Text>{userBillingdata.phone}</Text>
            <Text>{userBillingdata.email}</Text>
            <Text>{userBillingdata.address}</Text>
            <Text>{userBillingdata.locality}</Text>
            <Text>{userBillingdata.landmark}</Text>
            <Text>{userBillingdata.city}</Text>
            <Text>{userBillingdata.pin_code}</Text>
            <Text>{userBillingdata.state}</Text>
            <Text>{userBillingdata.city}</Text>

          </Box>

          <Box bg="white" shadow="md" p={4} borderRadius="md">
            <Heading size="sm" mb={2}>
              Payment Details
            </Heading>
            <Text>Payment Mode: {paymentInfo.paymentType}</Text>
            <Text>Amount: ₹{paymentInfo.amount}</Text>
            <Text>Status: {paymentInfo.status}</Text>
            <HStack justifyContent="space-between" mt={4}>
              <Button colorScheme="red" isDisabled={paymentInfo.status === 'completed' ? true : false}>Mark as Paid</Button>
              <Button colorScheme="red">Change status</Button>
            </HStack>
          </Box>

          <Box bg="white" shadow="md" p={4} borderRadius="md" >
              <OrderWeightPopover totalWeight={totalWeight} weightWiseOrder={weightWiseOrder}/>
          </Box>


          <Box bg="white" shadow="md" p={4} borderRadius="md">
            <Heading size="sm" mb={2}>
              Delivery Details
            </Heading>
            <Text>Delivery Type: {deliveryInfo.deliveryType}</Text>
            <Text>Delivery cost: ₹{paymentInfo.totalPrice}</Text>
            <Text>Name: {deliveryInfo.name}</Text>
            <Text>Phone: {deliveryInfo.phone}</Text>
            <Text>Email: {deliveryInfo.email}</Text>
            <Button colorScheme="red" mt={4}>
              Cancel order
            </Button>
          </Box>

        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default OrderTableWithItem;

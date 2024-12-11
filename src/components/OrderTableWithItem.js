import React, { useState, useEffect } from "react";
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
  Input,
  Button,
  VStack,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Select,
  useToast,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import { OrderWeightPopover } from "../components/";
import {
  formatPrice,
  getOrderStatusColor,
  FormattedDate,
} from "../utils/helpers";
import { paymentStatusList } from "../utils/constants";
import { useOrderContext } from "../context/order_context";
import { useHistory } from "react-router-dom"; // Import useHistory

const OrderTableWithItem = ({
  id,
  orderWithItems,
  userBillingInfo,
  userPaymentInfo,
  userDeliveryInfo,
  customOrderId,
  quantityWiseOrder,
  singleOrderStatus,
  orderDate,
}) => {
  const history = useHistory();
  const userBillingdata = userBillingInfo?.userBillingInfo?.[0] || [];
  const orderItems = orderWithItems?.orderItems || [];
  const paymentInfo = userPaymentInfo?.userPaymentDetail || {};
  const deliveryInfo = userDeliveryInfo?.userDeliveryDetail || {};
  const orderId = customOrderId?.data?.orderId || "N/A";
  const weightWiseOrder = quantityWiseOrder?.data?.orderItems || [];
  const totalWeight = quantityWiseOrder?.data?.total_quantity || null;
  const orderStatus = singleOrderStatus?.data?.status || null;
  const [amount, setAmount] = useState(orderWithItems?.items_grand_total || 0);
  const [paymentStatus, setPaymentStatus] = useState(paymentInfo?.status || "");
  const [paidLoading, setPaidLoading] = useState(false);
  const [cancelButtonLoading, setCancelButtonLoading] = useState(false);
  const [deliverButtonLoading, setDeliverButtonLoading] = useState(false);
  const [orderItemsarr, setOrderItemsarr] = useState([]);
  const [showOrderStatusDisableButton, setOrderStatusDisableButton] =
    useState(false);
  const [showOrderStatusActiveButton, setOrderStatusActiveButton] =
    useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [itemsGrandTotal, setItemsGrandTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const toast = useToast();
  const firstPopover = useDisclosure();
  const secondPopover = useDisclosure();
  const {
    updateOrderPaymentStatus,
    markOrderPaymentToPaid,
    updateOrderStatusToCancelled,
    fetchSingleOrderStatus,
    udpateOrderStatusAsDelivered,
    fetchUserOrderDeliveryInfo,
    orderForCustomise,
    orderForCustomise_loading,
    orderForCustomise_error,
    fetchOrderForCustomise,
  } = useOrderContext();

  useEffect(() => {
    fetchOrderForCustomise(id);
  }, []);

  useEffect(() => {
    if (orderForCustomise.orderItems !== undefined) {
      setOrderItemsarr(orderForCustomise.orderItems);
    }
  }, [orderForCustomise]);

  useEffect(() => {
    if (orderItemsarr.length > 0) {
      let itemCount = 0;
      let totalTaxAmount = 0;
      let grandTotal = 0;
      let totalDiscountAmount = 0;

      orderItemsarr.forEach((item) => {
        // Calculate total item count
        itemCount += item.quantity;

        // Calculate total tax for each item
        totalTaxAmount += item.tax * item.quantity;

        // Calculate grand total
        grandTotal += item.offer_price * item.quantity;
        totalDiscountAmount +=
          (item.item_price - item.offer_price) * item.quantity;
      });

      setTotalItemCount(itemCount);
      setTotalTax(totalTaxAmount);
      setItemsGrandTotal(grandTotal);
      setTotalDiscount(totalDiscountAmount);
    }
  }, [orderItemsarr]);

  const handlePaymentStatus = async (e) => {
    const status = e.target.value;
    if (!status) {
      return toast({
        position: "top",
        description: `Please provide all detail`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const response = await updateOrderPaymentStatus(id, status);
    if (response.success) {
      secondPopover.onClose();
      return toast({
        position: "top",
        description: `Order Id ${orderId} updated to ${status}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      secondPopover.onClose();
      return toast({
        position: "top",
        description: response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleMarkAsPaidInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleMarkAsPaid = async () => {
    if (!amount) {
      return toast({
        position: "top",
        descirption: "Provide all the details",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      firstPopover.onClose();
    }
    setPaidLoading(true);
    const responseUpdate = await markOrderPaymentToPaid(id, amount);
    setPaidLoading(false);
    if (responseUpdate.success) {
      firstPopover.onClose();
      return toast({
        position: "top",
        description: "Updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      firstPopover.onClose();
      return toast({
        position: "top",
        description: responseUpdate.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    console.log(orderItemsarr);
  }, [orderItemsarr]);

  return (
    <Grid templateColumns="2fr 1fr" gap={6} p={4}>
      {/* Left Side: Order Table */}
      <GridItem>
        <Box bg="white" shadow="md" p={2} borderRadius="md">
          <Heading size="md" mb={4}>
            Order Details of {orderId}
          </Heading>
          <Table variant="striped" colorScheme="whiteAlpha" size="sm">
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
              {orderItemsarr.length > 0 ? (
                orderItemsarr.map((item, index) => {
                  const {
                    name,
                    image,
                    item_price,
                    offer_price,
                    tax,
                    item_total,
                    item_total_discount,
                    item_total_tax,
                    quantity,
                  } = item;
                  return (
                    <Tr key={index}>
                      <Td>
                        <Box display="flex" alignItems="center">
                          <Image src={image} alt={name} boxSize="40px" mr={3} />
                          <Box>
                            <Text>{name}</Text>
                          </Box>
                        </Box>
                      </Td>
                      <Td>₹{item_price}</Td>
                      <Td>₹{offer_price}</Td>
                      <Td>{quantity}</Td>
                      <Td>{tax}%</Td>
                      <Td>₹{quantity * offer_price}</Td>
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
              <Td></Td>
              <Td>{totalItemCount}</Td>
              <Td>{totalTax}</Td>
              <Td>{itemsGrandTotal}</Td>
            </Tbody>
          </Table>
          {/* Additional Order Summary */}
          <Box mt={4}>
            <SimpleGrid columns={2} spacing={4}>
              <Text>Delivery Fee</Text>
              <Text textAlign="right">
                {paymentInfo.usedelivery ? paymentInfo.deliverycharges : "Free"}
              </Text>
              {paymentInfo.useWallet ? (
                <>
                  <Text>Wallet Amount Used</Text>
                  <Text textAlign="right">₹{paymentInfo.walletAmount}</Text>
                </>
              ) : (
                <></>
              )}

              {paymentInfo.useReferral ? (
                <>
                  <Text>Referral Amount Used</Text>
                  <Text textAlign="right">₹{paymentInfo.referralAmount}</Text>
                </>
              ) : (
                <></>
              )}
              <Text>Discounts</Text>
              <Text textAlign="right">₹{totalDiscount}</Text>
              <Heading size="sm" mt={2}>
                Grand Total
              </Heading>
              <Heading size="sm" mt={2} textAlign="right">
                {itemsGrandTotal +
                  parseInt(
                    paymentInfo.usedelivery ? paymentInfo.deliverycharges : 0
                  )}
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
            <Text>
              {[
                userBillingdata.address,
                userBillingdata.locality,
                userBillingdata.landmark,
                userBillingdata.city,
                userBillingdata.pin_code,
                userBillingdata.state,
                userBillingdata.city,
              ]
                .filter((value) => value)
                .join(", ")}
            </Text>
          </Box>

          <Box bg="white" shadow="md" p={4} borderRadius="md">
            <Heading size="sm" mb={2}>
              Payment Details
            </Heading>
            <Text>
              Payment Mode:{" "}
              {paymentInfo.paymentType == "cod"
                ? "Cash on Delivery"
                : paymentInfo.paymentType}
            </Text>
            <Text>Amount: ₹{paymentInfo.amount}</Text>
            <Text>Status: {paymentInfo.status}</Text>
            <HStack justifyContent="space-between" mt={4}>
              {paymentInfo.status === "completed" ? (
                <Button colorScheme="red" isDisabled>
                  Mark Paid
                </Button>
              ) : (
                <Popover
                  isOpen={firstPopover.isOpen}
                  onClose={firstPopover.onClose}
                >
                  <PopoverTrigger>
                    <Button colorScheme="red" onClick={firstPopover.onOpen}>
                      Mark Paid
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Order Id: {orderId}</PopoverHeader>

                    <PopoverBody>
                      <HStack justifyContent="space-between" mt={4}>
                        <Input
                          htmlSize={4}
                          width="auto"
                          variant="outline"
                          value={amount}
                          placeholder="amount"
                          onChange={handleMarkAsPaidInputChange}
                          focusBorderColor="brown.500"
                        />
                        <Button
                          isLoading={paidLoading}
                          colorScheme="blue"
                          onClick={handleMarkAsPaid}
                          loadingText="Updating"
                        >
                          Submit
                        </Button>
                      </HStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
              <Popover
                isOpen={secondPopover.isOpen}
                onClose={secondPopover.onClose}
              >
                <PopoverTrigger>
                  <Button colorScheme="red" onClick={secondPopover.onOpen}>
                    Change status
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Status for {orderId}</PopoverHeader>
                  <PopoverBody>
                    <Select
                      variant="filled"
                      name="status"
                      focusBorderColor="brown.500"
                      value={paymentStatus}
                      onChange={handlePaymentStatus}
                    >
                      {paymentStatusList.map((status, index) => {
                        const { name, value } = status;
                        return (
                          <option key={index} value={value}>
                            {name}
                          </option>
                        );
                      })}
                    </Select>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          </Box>

          <Box bg="white" shadow="md" p={4} borderRadius="md">
              <Heading size="sm" mb={2}>
                Order Details
              </Heading>
            <HStack justifyContent="space-between" mt={4}>
              <Text fontSize="bold" mt={4}>
                Total Item: {orderItemsarr.length}{" "}
              </Text>
              <Text fontSize="bold" mt={4}>
                Date-time: {orderDate?.createdAtKolkata}{" "}
              </Text>
            </HStack>
            <HStack justifyContent="space-between" mt={4}>
              <OrderWeightPopover
                totalWeight={totalItemCount}
                weightWiseOrder={weightWiseOrder}
              />
              <Button
                colorScheme="red"
                onClick={() => {
                  history.push(`/edit-order/${id}`);
                }}
              >
                Update Order
              </Button>
            </HStack>
          </Box>

          <Box bg="white" shadow="md" p={4} borderRadius="md">
            <HStack justifyContent="space-between" mt={4}>
              <Heading size="sm" mb={2}>
                Delivery Details
              </Heading>
              <Badge colorScheme={getOrderStatusColor(orderStatus)}>
                {orderStatus}
              </Badge>
            </HStack>
            <Text>Delivery Type: {deliveryInfo.deliveryType}</Text>
            <Text>Delivery cost: ₹{deliveryInfo.deliveryCost}</Text>
            <Text>Name: {deliveryInfo.name}</Text>
            <Text>Phone: {deliveryInfo.phone}</Text>
            <Text>Email: {deliveryInfo.email}</Text>
            <HStack justifyContent="space-between" mt={4}>
              {orderStatus === "cancelled" || orderStatus === "delivered" ? (
                <>
                  <Button isDisabled colorScheme="red">
                    Cancel
                  </Button>
                  <Button isDisabled colorScheme="red">
                    Mark Deliver
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    isLoading={cancelButtonLoading}
                    loadingText="Cancelling"
                    colorScheme="red"
                    mt={4}
                    onClick={async () => {
                      setCancelButtonLoading(true);
                      const response = await updateOrderStatusToCancelled(id);
                      setCancelButtonLoading(false);
                      await fetchSingleOrderStatus(id);
                      if (response.success) {
                        return toast({
                          position: "top",
                          description: `Order Id ${orderId} updated to cancelled`,
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        });
                      } else {
                        return toast({
                          position: "top",
                          description: response.message,
                          status: "error",
                          duration: 5000,
                          isClosable: true,
                        });
                      }
                    }}
                  >
                    Cancel order
                  </Button>
                  <Button
                    loadingText="Updating"
                    isLoading={deliverButtonLoading}
                    colorScheme="red"
                    mt={4}
                    onClick={async () => {
                      setDeliverButtonLoading(true);
                      const response = await udpateOrderStatusAsDelivered(id);
                      setDeliverButtonLoading(false);
                      await fetchSingleOrderStatus(id);
                      await fetchUserOrderDeliveryInfo(id);
                      if (response.success) {
                        return toast({
                          position: "top",
                          description: `Order Id ${orderId} updated to delivered`,
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        });
                      } else {
                        return toast({
                          position: "top",
                          description: response.message,
                          status: "error",
                          duration: 5000,
                          isClosable: true,
                        });
                      }
                    }}
                  >
                    Mark delivered
                  </Button>
                </>
              )}
            </HStack>
          </Box>
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default OrderTableWithItem;

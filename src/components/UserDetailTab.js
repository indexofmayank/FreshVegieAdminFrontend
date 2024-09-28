import React from 'react';
import { Tabs, TabList, Divider, TabPanels, Tab, TabPanel, Box, Text, Heading, StatLabel, StatHelpText, VStack, HStack, Button, Stack, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useUserDetailProviderContext } from '../context/user_detail_context';


function UserDetailTab({ userOrderHistory, userTransactions, userOrderLogs, userDetailCardInfo, userAllAddress, id }) {
  console.log(userAllAddress);
  // Safely access orderItems using optional chaining
  const orderHistory = userOrderHistory?.data || [];
  const totalOrderHistoryPage = userOrderHistory?.totalPage || null;
  let totalOrderHistory = userOrderHistory?.total || null;
  const currentOrderHistoryPage = userOrderHistory?.page || null
  const transactions = userTransactions?.data || [];
  const currentTransactionPage = userTransactions?.page || null;
  let totalOrderTransactions = userTransactions?.totalTransactions || null;
  const totalOrderTransactionPage = userTransactions?.totalPages || null;
  const orderLogs = userOrderLogs?.data || [];
  const totalOrderLogs = userOrderLogs?.totalLogs || null;
  let totalOrderLogsPage = userOrderLogs?.totalPages || null;
  const currentOrderLogsPage = userOrderLogs?.page || null;
  const details = userDetailCardInfo?.data || {}
  const allAddress = userAllAddress?.data?.[0].address || [];

  const {
    fetchUserOrderLogs,
    fetchUserOrderHistroy,
    getUserTransaction
  } = useUserDetailProviderContext();

  console.log(allAddress);
  return (
    <Box display="flex" p={4}>
      {/* Left Panel - Tab Section */}
      <Box flex="1">
        <Tabs>
          <TabList>
            <Tab>Order History</Tab>
            <Tab>Logs</Tab>
            <Tab>Transactions</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <>
                  {orderHistory.map((order, index) => {
                    const { orderId, timestampFormatted, totalItems, orderStatus, deliveryType, totalPrice } = order;
                    return (
                      <Box
                        key={index}
                        p={4}
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        shadow="sm"
                      >
                        {/* Order Date and Time */}
                        <HStack justify="space-between">
                          <Text fontSize="sm" color="gray.600">
                            {timestampFormatted}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            COD
                          </Text>
                        </HStack>

                        {/* Order ID and Items */}
                        <Text fontWeight="bold" fontSize="lg" mt={2}>
                          {orderId}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {Number(totalItems)} Items
                        </Text>
                        <Text fontWeight="bold" fontSize="lg" mt={1}>
                          ₹{totalPrice}
                        </Text>
                        <Divider />
                        {/* Status and Delivery Info */}
                        <HStack justify="space-between" mt={2}>
                          <HStack>
                            <Box as="span" color="blue.500" fontSize="2xl" lineHeight="1">•</Box>
                            <Text fontSize="sm" color="gray.600">
                              {orderStatus}
                            </Text>
                          </HStack>
                          {/* <Link fontSize="sm" color="blue.500" href="#">
                          View Details
                        </Link> */}
                        </HStack>

                        <Text fontSize="sm" color="gray.600" mt={2}>
                          {deliveryType}
                        </Text>
                      </Box>
                    );
                  })}
                </>
                {orderHistory.length > 0 ? (
                  <HStack justify="center" mt={4}>
                    <Button fontSize="sm" color="gray.500" onClick={async () => {
                      await fetchUserOrderHistroy(id, currentOrderHistoryPage - 1);
                    }}>
                      Previous
                    </Button>
                    <Text fontSize="sm" mx={2}>
                      {currentOrderHistoryPage} out of {totalOrderHistoryPage} total {totalOrderHistory}
                    </Text>
                    <Button fontSize="sm" color="gray.500" onClick={async () => {
                      await fetchUserOrderHistroy(id, currentOrderHistoryPage + 1);
                    }}>
                      Next
                    </Button>
                  </HStack>

                ) : (
                  <Text fontSize="sm">No history found</Text>
                )}
              </VStack>
            </TabPanel>
            <TabPanel>
              {orderLogs.map((logs, index) => {
                const { timestampFormatted, message } = logs;
                return (
                  <>
                    <VStack spacing={4} align="stretch" maxW="400px" mx="auto">
                      <VStack align="stretch" spacing={2} p={4} borderWidth="1px" borderRadius="md">
                        <VStack justify="space-between">
                          <Text fontWeight="bold" fontSize="md">
                            {timestampFormatted}
                          </Text>
                          <Text fontWeight="bold" fontSize="lg" color="gray.700">
                            {message}
                          </Text>
                        </VStack>
                      </VStack>
                      <Divider />
                    </VStack>

                  </>
                );
              })}
              {orderLogs.length > 0 ? (
                <HStack justify="center" mt={4}>
                  <Button fontSize="sm" color="gray.500" onClick={async () => {
                    await fetchUserOrderLogs(id, currentOrderLogsPage - 1);
                  }}>
                    Previous
                  </Button>
                  <Text fontSize="sm" mx={2}>
                    {currentOrderLogsPage} out of {totalOrderLogsPage} total {totalOrderLogs}
                  </Text>
                  <Button fontSize="sm" color="gray.500" onClick={async () => {
                    await fetchUserOrderLogs(id, currentOrderLogsPage + 1);
                  }}>
                    Next
                  </Button>
                </HStack>

              ) : (
                <Text fontSize="sm">No logs found</Text>
              )}
            </TabPanel>
            <TabPanel>
              {/* First Transaction */}
              {transactions.map((transaction, index) => {
                const { orderId, paymentType, paymentStatus, totalPrice, timestampFormatted } = transaction;
                return (
                  <VStack spacing={4} align="stretch" maxW="400px" mx="auto" key={index}>
                    <VStack align="stretch" spacing={2} p={4} borderWidth="1px" borderRadius="md">
                      <HStack justify="space-between">
                        <Text fontWeight="bold" fontSize="md">
                          Order No: {orderId}
                        </Text>
                        <Text fontWeight="bold" fontSize="lg" color="gray.700">
                          ₹{totalPrice}
                        </Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        {paymentType}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {timestampFormatted}
                      </Text>
                      <Badge colorScheme="green" fontSize="sm" alignSelf="flex-end">
                        {paymentStatus}
                      </Badge>
                    </VStack>
                    <Divider />

                  </VStack>
                );
              })}
              {transactions.length > 0 ? (
                <HStack justify="center" mt={4}>
                  <Button fontSize="sm" color="gray.500" onClick={async () => {
                    await getUserTransaction(id, currentTransactionPage - 1);
                  }}>
                    Previous
                  </Button>
                  <Text fontSize="sm" mx={2}>
                    {currentTransactionPage} out of {totalOrderTransactionPage} total {totalOrderTransactions}
                  </Text>
                  <Button fontSize="sm" color="gray.500" onClick={async () => {
                    await getUserTransaction(id, currentTransactionPage + 1);
                  }}>
                    Next
                  </Button>
                </HStack>


              ) : (
                <Text fontSize="sm">No transaction found</Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Right Panel - User Info Section */}
      <Box flex="1" ml={8}>
        {/* User Information Card */}
        <Box
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          shadow="sm"

        >
          <Heading size="md" mb={2}>{details.name}</Heading>
          <Text mb={2}>{details.email}</Text>
          <Text mb={4}>{details.phone}</Text>

          {/* Address Details */}
          {allAddress.length > 0 && (
            <>
              <HStack spacing={15} mb={2}>
                <Heading size="sm" mb={2}>Address details</Heading>
                <Button
                  colorScheme='brown'
                >Add Address</Button>
              </HStack>

              <Box
                p={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                shadow="sm"

              >
                <Box>
                  <Text>{allAddress[0].address_name}</Text>
                  <Text mb={1}>{allAddress[0].address + " " + allAddress[0].locality + " " + allAddress[0].landmark}</Text>
                  <Text>{allAddress[0].city}</Text>
                  <Text>{allAddress[0].pin_code}</Text>
                  <Text>{allAddress[0].phone}</Text>
                </Box>
              </Box>
            </>
          )}
          {/* Wallet Balance */}
          <Box mt={4}>
            <Heading size="sm" mb={2}>Wallet balance</Heading>
            <Text>...</Text>
          </Box>
          <Box mt={4}>
            <Heading size="sm" mb={2}>Loyality</Heading>
            <Text>...</Text>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}



export default UserDetailTab;

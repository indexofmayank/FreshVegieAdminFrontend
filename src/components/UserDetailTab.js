import React from 'react';
import { Tabs, TabList, Divider, TabPanels, Tab, TabPanel, Box, Text, Heading, StatLabel, StatHelpText, VStack, HStack, Button, Stack, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


function UserDetailTab({ userOrderHistory, userTransactions, userOrderLogs, userDetailCardInfo }) {
  // Safely access orderItems using optional chaining
  const orderHistory = userOrderHistory?.data || [];
  const transactions = userTransactions?.data || [];
  const orderLogs = userOrderLogs?.data || [];
  const details = userDetailCardInfo?.data || {}
  console.log(details);
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
              </VStack>
            </TabPanel>
            <TabPanel>
              {orderLogs.map((logs, index) => {
                const { timestampFormatted, message } = logs;
                return (
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
                );
              })}
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
              <HStack justify="center" mt={4}>
                <Text fontSize="sm" color="gray.500">
                  Previous
                </Text>
                <Text fontSize="sm" mx={2}>
                  1 out of 1
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Next
                </Text>
              </HStack>

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
              <Text>Address - 1</Text>
              <Text mb={1}>Tulip 423, SKA Metro Ville, ETA 2, Greater Noida, 201310</Text>
              <Text>India</Text>
              <Text>201310</Text>
              <Text>8377916553</Text>
            </Box>
          </Box>

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

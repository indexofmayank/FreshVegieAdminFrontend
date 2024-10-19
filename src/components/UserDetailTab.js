import React, { useState } from 'react';
import { Tabs, TabList, Divider, TabPanels, Tab, TabPanel, Box, Text, Heading, StatLabel, StatHelpText, VStack, HStack, Button, Stack, Badge, useDisclosure, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Input, toast, position, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useUserDetailProviderContext } from '../context/user_detail_context';
import { FaWallet } from "react-icons/fa";



function UserDetailTab({ userOrderHistory, userTransactions, userOrderLogs, userDetailCardInfo, userAllAddress, walletLogs, walletBalance, id }) {

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
  const walletLogsDetails = walletLogs?.logs?.[0].transactions || [];
  const currentWalletLogsPage = walletLogs?.page || null;
  const totalWalletLogs = walletLogs?.totalTransactions || null;
  const totalWalletLogPage = walletLogs?.totalPages || null;
  const walletBalanceUser = walletBalance?.balance?.[0]?.balance || null;



  const firstPopover = useDisclosure();


  const {
    fetchUserOrderLogs,
    fetchUserOrderHistroy,
    getUserTransaction,
    fetchUserWalletLogs,
    fetchUserBalance,
    addAmountToWallet
  } = useUserDetailProviderContext();

  const [addWalletAmount, setAddWalletAmount] = useState(null);
  const [addWalletAmountDescription, setAddWalletAmountDescription] = useState(null);
  const [walletButtonSubmitLoading, setWalletButtonSubmitLoading] = useState(false);
  const toast = useToast();

  return (
    <Box display="flex" p={4}>
      {/* Left Panel - Tab Section */}
      <Box flex="1">
        <Tabs>
          <TabList>
            <Tab>Order History</Tab>
            <Tab>Logs</Tab>
            <Tab>Transactions</Tab>
            <Tab>Wallet</Tab>
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
            <TabPanel>
              <Box
                p={4}
                border='1px solid'
                borderColor='gray.200'
                borderRadius='md'
                shadow='sm'
              >
                <VStack spacing={4} align='stretch' maxW='400px' mx='auto' >
                  {walletLogsDetails.map((log, index) => {
                    const { type, amount, description, date } = log;
                    return (
                      <VStack align='stretch' spacing={2} p={4} borderWidth='1px' borderRadius='md'>
                        <HStack justifyContent='space-between' >
                          <Text fontWeight='bold' fontSize='sm'>
                            {description}
                          </Text>
                          <Text fontWeight='bold' fontSize='lg' color='gray.700' >
                            ₹{amount}
                          </Text>
                        </HStack>
                        <Text fontSize='sm' color='gray.500' >
                          {date}
                        </Text>
                      </VStack>
                    );
                  })}
                  {walletLogsDetails.length > 0 ? (
                    <HStack justify='center' mt={4}>
                      <Button fontSize='sm' color='gray.500' onClick={async () => {
                        await fetchUserWalletLogs(id, currentWalletLogsPage - 1);
                      }}>
                        Previous
                      </Button>
                      <Text fontSize='sm' mx={2} >
                        {currentWalletLogsPage} out of {totalWalletLogs} total {totalWalletLogPage}
                      </Text>
                      <Button fontSize='sm' color='gray.500' onClick={async () => {
                        await fetchUserWalletLogs(id, currentWalletLogsPage + 1)
                      }}>
                        Next
                      </Button>
                    </HStack>
                  ) : (
                    <Text fontSize='sm'>No logs found</Text>
                  )}
                </VStack>
              </Box>
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
            <HStack justifyContent='space-between'>
              <Text>{walletBalanceUser}</Text>
              <Popover isOpen={firstPopover.isOpen} onClose={firstPopover.onClose}>
                <PopoverTrigger>
                  <Button colorScheme='brown' onClick={firstPopover.onOpen}><FaWallet /></Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Add amount</PopoverHeader>
                  <PopoverBody>
                    <HStack justifyContent='space-between' mt={4} >
                      <VStack>
                      <Input
                        type='number'
                        htmlSize={4}
                        width='auto'
                        value={addWalletAmount}
                        variant='outlilne'
                        placeholder='amount'
                        onChange={(e) => {setAddWalletAmount(e.target.value)}}
                        focusBorderColor='brown'
                      />
                      <Input
                        width='auto'
                        value={addWalletAmountDescription}
                        variant='outline'
                        placeholder='description'
                        focusBorderColor='brown'
                        onChange={(e) => {setAddWalletAmountDescription(e.target.value)}}
                      />
                      </VStack>
                      <Button
                        colorScheme='blue'
                        isLoading={walletButtonSubmitLoading}
                        onClick={ async () => {
                          setWalletButtonSubmitLoading(true)
                          console.log(addWalletAmount);
                          console.log(addWalletAmountDescription);
                          const response = await addAmountToWallet(id, addWalletAmount, addWalletAmountDescription);
                          const {success} = response;
                          console.log(response);
                          if(success) {
                            setWalletButtonSubmitLoading(false);
                            firstPopover.onClose();
                            await fetchUserBalance(id);
                            return toast({
                              position: 'top',
                              description: `${addWalletAmount} added successfully to the wallet`,
                              status: 'success',
                              duration: 5000,
                              isClosable: true
                            });
                          } else {
                            setWalletButtonSubmitLoading(false);
                            firstPopover.onClose();
                            await fetchUserBalance(id);
                            return toast({
                              position: 'top',
                              description: 'Not able to add wallet',
                              status: 'error',
                              duration: 5000,
                              isClosable: true
                            });
                          }
                        }}
                      >
                        Add
                      </Button>
                    </HStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
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

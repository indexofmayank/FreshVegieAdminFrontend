import React, { useEffect, useState, useRef } from "react";
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, HStack,
    Heading, Stack, Box, Text, Divider,
    VStack
} from '@chakra-ui/react';
import { useUserDetailProviderContext } from '../context/user_detail_context';
import { useParams } from 'react-router-dom';
import { formatPrice, getOrderStatusColor, FormattedDate } from '../utils/helpers';
import {Pagination, OrderHistoryCard, OrderLogCard, TransactionCard} from '../components/';


function UserDetailTab({userLogs, userOrderHistory, userTransaction}) {
    console.log(userOrderHistory);
    return (
        <HStack align="start" spacing={8} p={4}>
            <Tabs variant="soft-rounded" colorScheme="teal">
                <TabList>
                    <Tab>Order History</Tab>
                    <Tab>Logs</Tab>
                    <Tab>Transactions</Tab>
                    <Divider orientation='horizontal'/>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <OrderHistoryCard />
                        <OrderHistoryCard />
                        <OrderHistoryCard />
                        <OrderHistoryCard />
                        <OrderHistoryCard />
                        <Pagination />
                    </TabPanel>
                    <TabPanel>
                    <Tab>
                        <VStack>
                        {userLogs.map((logs, index) => {
                                const {timestampFormatted, message} = logs;
                                return (
                                    <OrderLogCard message={message} date={timestampFormatted}/>
                                );
                            })}

                        </VStack>
                    </Tab>
                    </TabPanel>
                    <TabPanel>
                            <VStack>
                                {userTransaction.map((transaction, index) => {
                                    const {orderId, totalPrice, paymentType, paymentStatus, createdAtFormatted} = transaction;
                                    return (
                                        <TransactionCard orderId={orderId} totalPrice={totalPrice} paymentStatus={paymentStatus} createdAtFormatted={createdAtFormatted} paymentType={paymentType} />
                                    )
                                })}
                            </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                p={5}
                bg="white"
            >
                <Stack spacing={3}>
                    <Heading size="md">User Information</Heading>
                    <Text fontSize="md">
                        Here is some detailed information about the user.
                    </Text>
                </Stack>
            </Box>
        </HStack>
    );
}

export default UserDetailTab;

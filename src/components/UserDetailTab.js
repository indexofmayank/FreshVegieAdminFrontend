import React, { useEffect, useState, useRef } from "react";
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, HStack,
    Heading, Stack, Box, Text, Divider,
    VStack
} from '@chakra-ui/react';
import { useUserDetailProviderContext } from '../context/user_detail_context';
import { useParams } from 'react-router-dom';
import { formatPrice, getOrderStatusColor, FormattedDate } from '../utils/helpers';


function UserDetailTab({userLogs}) {
    console.log(userLogs);
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
                        <Text>Order history details will be displayed here.</Text>
                    </TabPanel>
                    <TabPanel>
                    <Tab>
                        <VStack>
                        {userLogs.map((logs, index) => {
                                const {timestamp, level, message} = logs;
                                return (
                                         <Box key={index}>
                                            <Text >{message}</Text>
                                            <Text><strong>{FormattedDate(timestamp)}</strong></Text>
                                            <Divider orientation='horizontal'/>
                                         </Box>
                                );
                            })}

                        </VStack>
                    </Tab>

                    </TabPanel>
                    <TabPanel>
                        <Text>Transaction details will be available here.</Text>
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

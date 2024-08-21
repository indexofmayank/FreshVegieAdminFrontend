import React from "react";
import {
    Box,
    Text,
    Stack,
    Divider,
    Flex,
    Spacer,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
  } from "@chakra-ui/react";
  
  const TransactionCard = ({orderId, totalPrice, paymentType, paymentStatus, createdAtFormatted}) => {
    return (
      <Box
        maxW="lg"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding={4}
        boxShadow="md"
        bg="white"
        mb={4}
      >
        <Stack spacing={3}>
          {/* Order Number and Amount */}
          <Flex>
            <Text fontWeight="bold">{orderId}</Text>
            <Spacer />
            <Text fontWeight="bold" fontSize="lg">
              {totalPrice}
            </Text>
          </Flex>
  
          {/* Payment Method */}
          <Text fontSize="sm" color="gray.600">
            {paymentType}
          </Text>
  
          {/* Date and Time */}
          <Text fontSize="sm" color="gray.600">
           {createdAtFormatted}
          </Text>
  
          <Divider />
  
          {/* Payment Status */}
          <Flex>
            <Spacer />
            <Text fontWeight="bold" color="green.500">
              {paymentStatus}
            </Text>
          </Flex>
        </Stack>
      </Box>
    );
  };
  
  
  export default TransactionCard;
  
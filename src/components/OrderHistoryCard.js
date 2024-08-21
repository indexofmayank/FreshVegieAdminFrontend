import React from "react";
import {
    Box,
    Text,
    Stack,
    Divider,
    Button,
    Flex,
    Spacer,
  } from "@chakra-ui/react";
  
  const OrderHistoryCard = ({orderHistory}) => {
    console.log(orderHistory);
    return (
      <Box
        maxW="lg"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding={4}
        mb={4}
        boxShadow="md"
      >
        <Stack spacing={2}>
          {/* Date and Time */}
          <Text fontSize="sm" color="gray.600">
            10 August, 2024 10:47 PM
          </Text>
  
          {/* Order ID and Delivery Method */}
          <Flex>
            <Text fontWeight="bold" fontSize="lg">
              ORD1710
            </Text>
            <Spacer />
            <Text fontSize="sm" color="gray.500">
              Standard Delivery
            </Text>
          </Flex>
  
          {/* Number of Items */}
          <Text fontSize="sm" color="gray.600">
            6 Items
          </Text>
  
          {/* Price and Payment Mode */}
          <Flex>
            <Text fontSize="xl" fontWeight="bold">
              ₹ 331.5
            </Text>
            <Spacer />
            <Text fontSize="sm" color="gray.500">
              ONLINE
            </Text>
          </Flex>
  
          <Divider />
  
          {/* Status and Details Link */}
          <Flex>
            <Text color="blue.500" fontWeight="bold">
              ● Delivered
            </Text>
            <Spacer />
            <Button variant="link" color="blue.500">
              View Details
            </Button>
          </Flex>
        </Stack>
      </Box>
    );
  };
  
  export default OrderHistoryCard;
  
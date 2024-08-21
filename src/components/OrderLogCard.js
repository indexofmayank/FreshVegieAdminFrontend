import React from "react";
import { Box, Text, Stack } from "@chakra-ui/react";

const OrderLogCard = ({ message, date }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding={4}
      mb={4}
      boxShadow="md"
      bg="white"
    >
      <Stack spacing={2}>
        {/* Log Message */}
        <Text fontWeight="bold" fontSize="md">
          {message}
        </Text>
        {/* Date and Time */}
        <Text fontSize="sm" color="gray.600">
          {date}
        </Text>
      </Stack>
    </Box>
  );
};


export default OrderLogCard;

import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  List,
  useToast,
} from "@chakra-ui/react";
import { FaSistrix } from "react-icons/fa";
import {useOrderContext} from '../context/order_context';
import { useHistory } from 'react-router-dom'; 



function SearchBoxForOrder() {
  const history = useHistory(); 

  const {
    orderIdBy_customOrderId,
    orderIdBy_customOrderId_loading,
    orderIdBy_customOrderId_error,
    fetchOrderIdFromCustomOrderId
  } = useOrderContext();

  const [query, setQuery] = useState("");
  const toast = useToast();
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestion, setSuggestion] = useState(false);


  useEffect(() => {
    if (query.length >= 4) {
      const orderRegex = /^ORD\d+$/;
      if (!orderRegex.test(query)) {
        setShowSuggestion(false);
        toast({
          position: "top",
          title: "Invalid Order Number",
          description: "Order number must be in the format ORD1, ORD2, etc.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
     setShowSuggestion(true);
     fetchOrderIdFromCustomOrderId(query);
    
    }
    else {
      setShowSuggestion(false);
    }
  }, [query, toast]);

  return (
    <Box position="relative">
      <InputGroup>
        <Input
          value={query}
          placeholder="Search with order number"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          // onKeyDown={handleKeyDown}  
        />
        <InputRightElement>
          <FaSistrix />
        </InputRightElement>
      </InputGroup>
      {showSuggestion && orderIdBy_customOrderId && (
        <Box
          position='absolute'
          bg='white'
          w='100%'
          zIndex={10}
          border='1px solid #e2e8f0'
          borderRadius='md'
          mt={2}
          cursor="pointer"
          _hover={{ bg: "gray.100" }}
          onClick={() => {history.push(`orders/${orderIdBy_customOrderId.id}`)}}
        >
          {orderIdBy_customOrderId.orderId}
        </Box>
      )}
    </Box>
  );
}

export default SearchBoxForOrder;

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  useToast,
  Text,
} from "@chakra-ui/react";
import { FaSistrix } from "react-icons/fa";
import { useOrderContext } from "../context/order_context";
import { useHistory } from "react-router-dom";

function SearchBoxForOrder() {
  const history = useHistory();
  const inputRef = useRef();

  const {
    orderIdBy_customOrderId,
    orderIdBy_customOrderId_loading,
    orderIdBy_customOrderId_error,
    fetchOrderIdFromCustomOrderId,
  } = useOrderContext();

  const [query, setQuery] = useState("");
  const toast = useToast();
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleClickOutside = (event) => {
    if(inputRef.current && !inputRef.current.contains(event.target)) {
      setShowSuggestion(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);


  useEffect(() => {
    const fetchRequiredData = async () => {
      try {
        await fetchOrderIdFromCustomOrderId(query);
      } catch (error) {
        setShowSuggestion(false);
      }
    };
    fetchRequiredData();
  }, [query]);

  useEffect(() => {
    console.log(orderIdBy_customOrderId);
  }, [orderIdBy_customOrderId]);

  return (
    <Box position="relative" ref={inputRef}>
      <InputGroup>
        <Input
          value={query}
          placeholder="Search for Order number"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onFocus={() => {
            setShowSuggestion(true);
          }}
        />
        <InputRightElement>
          <FaSistrix />
        </InputRightElement>
        {showSuggestion && (
          <Box
            position="absolute"
            bg="white"
            w="100%"
            zIndex={10}
            border="1px solid #e2e8f0"
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
          >
            {showSuggestion && orderIdBy_customOrderId.length > 0 && (
              <Box
                position="absolute"
                bg="white"
                w="100%"
                zIndex={10}
                border="1px solid #e2e8f0"
                borderRadius="md"
                mt={10}
              >
                <List maxH="200px" overflowY="auto">
                  {orderIdBy_customOrderId.map((item, index) => {
                    const { user, orderId, _id } = item;
                    return (
                      <ListItem
                        key={index}
                        p={2}
                        cursor="pointer"
                        _hover={{ bg: "gray.100" }}
                        onClick={() => {
                          history.push(`orders/${_id}`);
                        }}
                      >
                        {orderId} -- {user}
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            )}
          </Box>
        )}
      </InputGroup>
    </Box>
  );
}

export default SearchBoxForOrder;

import React, { useState, useEffect, useRef } from 'react';
import {
  Input,
  Button,
  VStack,
  HStack,
  Box,
  Divider,
  Image,
  Text,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  FormControl,
  FormLabel,
  SimpleGrid
} from '@chakra-ui/react';

import { useProductContext } from '../context/product_context';
import { useUserContext } from '../context/user_context';
import {useOrderContext} from '../context/order_context';

const CreateOrderForm = () => {
  const [items, setItems] = useState([]); // Store items in the order
  const [searchTerm, setSearchTerm] = useState(''); // For product search input
  const [suggestions, setSuggestions] = useState([]); // Store product suggestions
  const suggestionBoxRef = useRef(null); // Reference for the suggestion box
  const [customerNameSuggestion, setCustomerNameSuggestion] = useState([]); // For customer name suggestions
  const [customerSearchTerm, setCustomerSearchTerm] = useState(''); // For customer search input
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);
  const { productForCreateOrder, fetchProductForCreateOrder } = useProductContext();
  const { usernameForCreateOrder, fetchUserForCreateOrder, userById_loading, userById_error, userById, fetchUserById} = useUserContext();
  const {
    new_order_address: {
      address_name,
      name,
      phone,
      email,
      address,
      locality,
      landmark,
      city,
      pin_code,
      state
    },
    updateNewOrderAddressDetails
  } = useOrderContext()

  // Fetch product suggestions when the search term changes
  useEffect(() => {
    if (searchTerm) {
      fetchProductForCreateOrder(searchTerm);
      setSuggestions(productForCreateOrder);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if(customerSearchTerm) {
      fetchUserForCreateOrder(customerSearchTerm);
      setCustomerNameSuggestion(usernameForCreateOrder);
    } else {
      setCustomerNameSuggestion([]);
    }
  }, [customerSearchTerm]);

  // Close suggestion boxes when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target)) {
        setSuggestions([]);
        setCustomerNameSuggestion([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
    setSearchTerm('');
    setSuggestions([]);
  };

  const calculateTotal = () => {
    const totalItems = items.length;
    const totalPrice = items.reduce((sum, item) => sum + item.offer_price ? (item.offer_price): (item.price) * item.count, 0);
    return { totalItems, totalPrice };
  };

  useEffect(() => {
    setGrandTotal(items.reduce((sum, item) => sum + item.offer_price ? (item.offer_price): (item.price) * item.count, 0));
  }, [items]);

  const incrementCount = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, count: item.count + 1 } : item
      )
    );
    calculateTotal()
  };

  const decrementCount = (index) => {
    setItems((prevItems) =>
      prevItems
        .map((item, i) =>
          i === index && item.count > 1 ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0) // Remove item if count reaches 0
    );
    calculateTotal()
  };
  const { totalItems, totalPrice } = calculateTotal();

  const handleCreateOrder = async() => {
    console.log(items);
    const response = await fetchUserById(selectedCustomerId);
    console.log(response);
    console.log('clicked');
  }

  return (
    <VStack spacing={4} align="stretch">
      {/* Grid Layout */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {/* Product Search Section */}
        <GridItem colSpan={2}>
          <Heading size="md" mb={4}>
            Create Order
          </Heading>
          <Box mb={4} position="relative">
            <Input
              placeholder="Search for products"
              size="lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {suggestions.length > 0 && (
              <List
                ref={suggestionBoxRef}
                position="absolute"
                zIndex={1}
                bg="white"
                border="1px solid lightgray"
                borderRadius="md"
                mt={1}
                w="100%"
                maxH="200px"
                overflowY="auto"
              >
                {suggestions.map((product, index) => (
                  <ListItem
                    key={index}
                    p={2}
                    cursor="pointer"
                    _hover={{ bg: 'gray.100' }}
                    onClick={() => addItem({ ...product, count: 1 })}
                  >
                    <HStack>
                      <Image src={product.image} boxSize="30px" />
                      <Text>{product.name}</Text>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Added products */}
          {items.map((item, index) => {
            const {name, image, price, offer_price, count} = item;
            return (
              <HStack key={index} justifyContent="space-between" mb={2}>
              <Image src={item.image} boxSize="50px" />
              <Text>{item.name}</Text>
              <HStack>
                <Button onClick={() => decrementCount(index)}>-</Button>
                <Text>{item.count}</Text>
                <Button onClick={() => incrementCount(index)}>+</Button>
              </HStack>
              {offer_price ? (<Text>{offer_price * count}</Text>) : (<Text>{price * count}</Text>)}
            </HStack>
            )
          })}

          <Divider />

          {/* Total Section */}
          <Box mt={4} p={4} border="1px solid lightgray" borderRadius="md" bg="gray.50">
            <HStack justifyContent="space-between">
              <Text>No. of items:</Text>
              <Text>{items.length}</Text>
            </HStack>
            <HStack justifyContent="space-between" mt={2}>
              <Text>Total:</Text>
              <Text>{`₹${grandTotal}`}</Text>
            </HStack>
          </Box>
        </GridItem>

        {/* Customer and Address Section */}
        <GridItem colSpan={1}>
          <Heading size="md" mb={4}>
            Add Customer
          </Heading>
          <Input
            placeholder="Enter Customer Name"
            size="lg"
            mb={4}
            value={customerSearchTerm}
            // onChange={(e) => setCustomerSearchTerm(e.target.value)}
            onChange={(e) => {
              console.log(e.target.value);
              setCustomerSearchTerm(e.target.value);
            }}
          />
          {customerNameSuggestion.length > 0 && (
            <List
              position="absolute"
              zIndex={1}
              bg="white"
              border="1px solid lightgray"
              borderRadius="md"
              mt={1}
              w="100%"
              maxH="200px"
              overflowY="auto"
            >
              {customerNameSuggestion.map((customer, index) => {
                const {name, _id} = customer;
                return (
                  <ListItem
                      key={index}
                      p={2}
                      _hover={{bg: 'gray.100'}}
                      onClick={() => {
                        setCustomerSearchTerm(name);
                        setCustomerNameSuggestion([]); // Clear the customer name suggestions
                        setSelectedCustomerId(_id);
                      }}
                  >
                    <Text>{name}</Text>
                  </ListItem>
                )
              })}

            </List> 
          )}
          <SimpleGrid bg='white'  p={5} shadow='lg' borderRadius='lg' overflowX='auto' mt={4}>
          <Heading size="md" mb={4} mt={4}>
            Add Address
          </Heading>

            <FormControl>
              <FormLabel>Address name </FormLabel>
              <Input
                placeholder='Address name'
                 name='address_name'
                focusBorderColor='brown.500'
                value={address_name}
                onChange={updateNewOrderAddressDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder='Address'
                name='address'
                focusBorderColor='brown.500'
                value={address}
                onChange={updateNewOrderAddressDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                placeholder='City'
                name='city'
                focusBorderColor='brown.500'
                value={city}
                onChange={updateNewOrderAddressDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder='Email'
                name='email'
                focusBorderColor='brown.500'
                value={email}
                onChange={updateNewOrderAddressDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Landmark</FormLabel>
              <Input
                placeholder='Landmark'
                name='landmark'
                focusBorderColor='brown.500'
                value={landmark}
                onChange={updateNewOrderAddressDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Locality</FormLabel>
              <Input
                placeholder='Locality'
                name='locality'
                focusBorderColor='brown.500'
                value={locality}
                onChange={updateNewOrderAddressDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder='Name'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateNewOrderAddressDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                placeholder='Phone'
                name='phone'
                focusBorderColor='brown.500'
                value={phone}
                onChange={updateNewOrderAddressDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pin code</FormLabel>
              <Input
                placeholder='Pin code'
                name='pin_code'
                focusBorderColor='brown.500'
                value={pin_code}
                onChange={updateNewOrderAddressDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input
                placeholder='State'
                name='state'
                focusBorderColor='brown.500'
                value={state}
                onChange={updateNewOrderAddressDetails}
              />
            </FormControl>
          </SimpleGrid>
          <Button 
          colorScheme="blue" 
          mt={5}
          onClick={handleCreateOrder}
          >Create Order</Button>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default CreateOrderForm;

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
  useToast,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react';

import { useProductContext } from '../context/product_context';
import { useUserContext } from '../context/user_context';
import { useOrderContext } from '../context/order_context';
import { FaTrash } from "react-icons/fa";


const CreateOrderForm = () => {
  const [items, setItems] = useState([]); // Store items in the order
  const [searchTerm, setSearchTerm] = useState(''); // For product search input
  const [suggestions, setSuggestions] = useState([]); // Store product suggestions
  const suggestionBoxRef = useRef(null); // Reference for the suggestion box
  const [customerNameSuggestion, setCustomerNameSuggestion] = useState([]); // For customer name suggestions
  const [customerSearchTerm, setCustomerSearchTerm] = useState(''); // For customer search input
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);
  const [createOrderLoadingState, setCreateOrderLoadingState] = useState(false);
  const [selectedCustomerAddresses, setSelectedCustomerAddresses] = useState([]);
  const { productForCreateOrder, fetchProductForCreateOrder } = useProductContext();
  const { usernameForCreateOrder, fetchUserForCreateOrder, fetchUserById, fetchUserAddressById, userAddresses, fetchUserMetaDataForCreateOrder } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
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
    updateNewOrderAddressDetails,
    createNewOrder
  } = useOrderContext();

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
    if (customerSearchTerm) {
      fetchUserForCreateOrder(customerSearchTerm);
      setCustomerNameSuggestion(usernameForCreateOrder);
    } else {
      setCustomerNameSuggestion([]);
    }
  }, [customerSearchTerm]);

  useEffect(() => {
    if (selectedCustomerId) {
      fetchUserAddressById(selectedCustomerId);
    }
  }, [selectedCustomerId]);

  useEffect(() => {
    if (userAddresses && userAddresses.length > 0) {
      setSelectedCustomerAddresses(userAddresses);
    }
  }, [userAddresses]);

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
    setItems((prevItems) => [...prevItems, {
        name: item.name,
        image: item.image,
        item_price: item.price,
        offer_price: item.offer_price,
        quantity: item.quantity,
        unit: item.information,
        incrementvalue: item.increment_value,
        maxquantity: item.product_detail_max,
        minquantity: item.product_detail_min
    }]);
    setSearchTerm('');
    setSuggestions([]);
}

  const incrementCount = (index, incrementvalue, maxquantity, minquantity) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.quantity < maxquantity 
          ? { ...item, quantity: parseFloat(item.quantity) + parseFloat(incrementvalue) } 
          : item
      )
    );
  };
  
  const decrementCount = (index, incrementvalue, maxquantity, minquantity) => {
    setItems((prevItems) =>
      prevItems
        .map((item, i) =>
          i === index && item.quantity > minquantity ? { ...item, quantity: parseFloat(item.quantity) - parseFloat(incrementvalue) } : item
        )
        .filter((item) => item.quantity > 0) 
    );
  };

  // Calculate grand total whenever items change
  useEffect(() => {
    const total = items.reduce((acc, item) => {
      const itemTotal = item.offer_price ? item.offer_price * item.quantity : item.price * item.quantity;
      return acc + itemTotal;
    }, 0);
    setGrandTotal(total);
  }, [items]);

  const handleCreateOrder = async () => {
    setCreateOrderLoadingState(true);
    let response = await fetchUserMetaDataForCreateOrder(selectedCustomerId);
    console.log(response);
    const user = {name: response?.[0].name, email: response?.[0].email, phone: response?.[0].phone, userId: selectedCustomerId};
    const shippingAddress = {
      billingAddress: {
        address_name: address_name,
        name: name,
        phone: phone,
        email: email,
        address: address,
        locality: locality,
        landmark: landmark,
        city: city,
        pin_code: pin_code,
        state: state
      },
      deliveryAddress: {
        address_name: address_name,
        name: name,
        phone: phone,
        email: email,
        address: address,
        locality: locality,
        landmark: landmark,
        city: city,
        pin_code: pin_code,
        state: state
      }
    };
    const orderItems = items.map((item) => {
      const { name, image, item_price, offer_price, quantity, unit, incrementvalue, maxquantity, minquantity, _id} = item;
    
      // Ensure image is a single string (get the first URL from the array or use a fallback)
      const imageString = Array.isArray(image) && image.length > 0 ? image[0] : '';
    
      return {
        name: name,
        image: imageString, // Single image URL
        quantity: quantity,
        item_price: item_price,
        offer_price: offer_price,
        quantity: quantity,
        unit: unit,
        incrementvalue: incrementvalue,
        maxquantity: maxquantity,
        minquantity: minquantity,
        id: _id
      };
    });
    if(
      !orderItems ||
      !user ||
      !shippingAddress
    ) { 
      setCreateOrderLoadingState(false);
      return toast({
        position: 'top',
        description: 'Provide all details',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    response = await createNewOrder(orderItems, user, shippingAddress);
    setCreateOrderLoadingState(false);
    return toast({
      position: 'top',
      description: response.message,
      status: 'success',
      duration: 5000,
      isClosable: true
    });
  };

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
                    onClick={() => addItem({ ...product, quantity: product.increment_value})}
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
            const { name, image, item_price, offer_price, quantity, unit, incrementvalue, maxquantity, minquantity} = item;
            return (
              <HStack key={index} justifyContent="space-between" mb={2}>
                <Image src={item.image} boxSize="50px" />
                <Text>{item.name}</Text>
                <HStack>
                  <Button onClick={() => decrementCount(index, incrementvalue, maxquantity, minquantity)}>-</Button>
                  <Text>{item.quantity}</Text>
                  <Button onClick={() => incrementCount(index, incrementvalue, maxquantity, minquantity)}>+</Button>
                </HStack>
                {offer_price > 0 ? (<Text>{offer_price * quantity}</Text>) : (<Text>{item_price * quantity}</Text>)}
                </HStack>
            );
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
                const { name, _id } = customer;
                return (
                  <ListItem
                    key={index}
                    p={2}
                    _hover={{ bg: 'gray.100' }}
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
          {selectedCustomerId && (
            <>
              <Button 
                onClick={async () => {
                  onOpen();
                  console.log(userAddresses?.[0]?.address); // Debugging line
                }}
              >
                Select Address
              </Button>

              <Modal isOpen={isOpen} onClose={onClose} overflowY>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{customerSearchTerm}'s Address</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {userAddresses && userAddresses?.[0]?.address.map((data, index) => {
                      const {address_name, name, phone, email, address, locality, city, pin_code, state, landmark} = data;
                      return (
                        <Box key={index} mb={4}>
                        <Text fontWeight="bold">Address {index + 1}</Text>
                        <Text>{address_name}</Text>
                        <Text>{name}</Text>
                        <Text>{phone}</Text>
                        <Text>{email}</Text>
                        <Text>{address}</Text>
                        <Text>{locality}</Text>
                        <Text>{landmark}</Text>
                        <Text>{city}</Text>
                        <Text>{pin_code}</Text>
                        <Text>{state}</Text>
                        <Button 
                          onClick={(e) => {
                            onClose();
                            e.target.name='address_name';
                            e.target.value=address_name
                            updateNewOrderAddressDetails(e);
                            e.target.name='address';
                            e.target.value=address
                            updateNewOrderAddressDetails(e);
                            e.target.name='name';
                            e.target.value=name;
                            updateNewOrderAddressDetails(e);
                            e.target.name='phone';
                            e.target.value=phone;
                            updateNewOrderAddressDetails(e);
                            e.target.name='email';
                            e.target.value=email;
                            updateNewOrderAddressDetails(e);
                            e.target.name='locality';
                            e.target.value=locality;
                            updateNewOrderAddressDetails(e);
                            e.target.name='city';
                            e.target.value=city;
                            updateNewOrderAddressDetails(e);
                            e.target.name='pin_code';
                            e.target.value=pin_code
                            updateNewOrderAddressDetails(e);
                            e.target.name='state';
                            e.target.value=state;
                            updateNewOrderAddressDetails(e);
                            e.target.name='landmark';
                            e.target.value=landmark;
                            updateNewOrderAddressDetails(e);
                          }}
                        >Select</Button>
                      </Box>
                      );
                    })}
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
          <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto' mt={4}>
            <Heading size="md" mb={4} mt={4}>
              Add Address
            </Heading>

            <FormControl>
              <FormLabel>Address name</FormLabel>
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
            isLoading={createOrderLoadingState}
            loadingText='Creating order'
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

import React, { useState, useEffect, useRef } from 'react';
import {
  Input,Button,VStack,HStack, Box, Divider, Image, Text, Grid, GridItem,Heading, List,ListItem, FormControl,FormLabel,useToast, SimpleGrid, useDisclosure, ModalCloseButton,toast, Table,Thead,Tbody,Tr, Th,Td,Select,option
} from '@chakra-ui/react';

import { useProductContext } from '../context/product_context';
import { useUserContext } from '../context/user_context';
import { useOrderContext } from '../context/order_context';
import {useCustomerContext} from '../context/customer_context';
import { FaTrash } from "react-icons/fa";


const CreateOrderForm = () => {
  const [items, setItems] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [suggestions, setSuggestions] = useState([]); 
  const suggestionBoxRef = useRef(null); 
  const {
    customerwithaddress,
} = useCustomerContext();
  const [customerNameSuggestion, setCustomerNameSuggestion] = useState([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState(''); 
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);
  const [totalDiscount, setTotalDiscount] = useState(null);
  const [createOrderLoadingState, setCreateOrderLoadingState] = useState(false);
  const [selectedCustomerAddresses, setSelectedCustomerAddresses] = useState([]);
  const [customerlist, setCustomerlist] = useState([]);
  const [productlist, setProductlist] = useState([]);
  const [uaddress, setUaddress] = useState([]);
  const [minimumCartAmount, setMinimumCartAmount] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedproduct, setSelectedproduct] = useState('');
  const { productForCreateOrder, fetchProductForCreateOrder,getAllProductForOrder,allproduct } = useProductContext();
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
    fetchStaticDeliveryInstructionsInfo,
    createNewOrder
  } = useOrderContext();

  useEffect(() => {
   const loadDeliveryData = async () => {
    const response = await fetchStaticDeliveryInstructionsInfo()
    setMinimumCartAmount(response?.data?.minimumcart_amount);
    setDeliveryCharges(response?.data?.delivery_charges);
   }
   loadDeliveryData();
  })

  // useEffect(() => {
   
  // }, [customerwithaddress]);

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


  const onUserSelect = (event) => {
    // const userId = event.target.value;
    const userId = event.target.value;
    // console.log(userId)
    // console.log(customerlist)
    setSelectedUser(userId);
    const user = customerlist.find((user) => user._id == userId);
    // console.log(user)
    // console.log(user.address)
    if (user) {
      setUaddress(user.address);
      setSelectedCustomerAddresses(user.address)
    } else {
      setSelectedCustomerAddresses([])
      // setUaddress('');
    }
  };

  const onProductSelect = (event) => {
    // const userId = event.target.value;
    const productId = event.target.value;
    console.log(productId)
    // // console.log(customerlist)
    // setSelectedproduct(productId);
    const product = productlist.find((product) => product._id == productId);
    addItem(product)
  };
  useEffect(() => {
    if (customerwithaddress && customerwithaddress.length > 0) {
      setCustomerlist(customerwithaddress);
    }
  }, [customerwithaddress]);

  useEffect(() => {
    if (allproduct && allproduct.data.length > 0) {
      console.log("setting data")
    setProductlist(allproduct.data)
    }
  }, [allproduct]);
  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, {
      id: item._id,
      name: item.name,
      image: item.image,
      item_price: item.price,
      offer_price: item.offer_price,
      quantity: item.product_detail_min,
      unit: item.information,
      incrementvalue: item.increment_value,
      maxquantity: item.product_detail_max,
      minquantity: item.product_detail_min
    }]);
  }
console.log(items)
  const incrementCount = (index, incrementvalue, maxquantity, minquantity) => {
    if (items[index].quantity === maxquantity) {
      return toast({
        position: 'top',
        title: 'Limit reached',
        description: `maximum limit ${maxquantity} at a time`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.quantity < maxquantity
          ? { ...item, quantity: parseFloat(item.quantity) + parseFloat(incrementvalue) }
          : item
      )
    );
  };

  const decrementCount = (index, incrementvalue, maxquantity, minquantity) => {
    if (items[index].quantity === minquantity) {
      return toast({
        position: 'top',
        title: 'Limit reached',
        description: `minimumm limit ${minquantity} at a time`,
        status: 'warning',
        isClosable: true
      });
    }
    setItems((prevItems) =>
      prevItems
        .map((item, i) =>
          i === index && item.quantity > minquantity ? { ...item, quantity: parseFloat(item.quantity) - parseFloat(incrementvalue) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  useEffect(() => {
    if (items.length === 0) {
      setGrandTotal(0);
      return;
    }
  
    const total = items.reduce((acc, item) => {
      const itemTotal = item.offer_price ? item.offer_price * item.quantity : item.price * item.quantity;
      return acc + itemTotal;
    }, 0);
  
    setGrandTotal(total);  // Only the item total, without delivery charges
  }, [items, minimumCartAmount, deliveryCharges]);

  const deliveryFee = grandTotal < minimumCartAmount && items.length > 0 ? deliveryCharges : 0;

// Calculate total discount whenever items change
useEffect(() => {
  const total = items.reduce((acc, item) => {
    const totalOfferPrice = item.item_price * item.quantity - item.offer_price * item.quantity;
    return acc + totalOfferPrice;
  }, 0);
  
  setTotalDiscount(total);
}, [items]);




  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };



  const handleCreateOrder = async () => {
    setCreateOrderLoadingState(true);
    const orderedFrom = 'admin';
    let response = await fetchUserMetaDataForCreateOrder(selectedCustomerId);
    const user = { name: response?.[0].name, email: response?.[0].email, phone: response?.[0].phone, userId: selectedCustomerId };
    const discountPrice = totalDiscount;
    const itemPrice = grandTotal;
    const paymentInfo = {
      amount: grandTotal,
      usedelivery: true,
      deliverycharges: grandTotal > 100 ? parseInt(0) : parseInt(deliveryCharges),
      payment_type: 'cod'
    }
    const deliveryInfo = {
      deliveryCost: grandTotal > 100 ? parseInt(0) : parseInt(deliveryCharges)
    }
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
      const { name, image, item_price, offer_price, quantity, unit, incrementvalue, maxquantity, minquantity, id } = item;

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
        id: id
      };
    });
    if (
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
    response = await createNewOrder(orderItems, user, shippingAddress, orderedFrom, discountPrice, itemPrice, paymentInfo, deliveryInfo);
    console.log(response);
    if (response.success) {
      setCreateOrderLoadingState(false);
      return toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } else {
      return toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });

    }
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
          <Select
                name='product'
                focusBorderColor='brown.500'
                value={selectedproduct} onChange={onProductSelect}
              >
                 <option value="">Select a product</option>
              {productlist.length > 0 ? (
                productlist.map((product,index) =>{
                //  console.log(users.name?users.name:'Na');
                 return (
                  // <></>
                 <option key={product._id} value={product._id}>{(product.name?product.name:'Na')}</option>
                 )
               })
              ):(<></>)}
              </Select>
          </Box>
          {/* Added products */}
          <Table variant='simple'>
            {items.length > 0 && (
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Actions</Th>
                  <Th>Offer price</Th>
                  <Th>Item price</Th>
                  <Th>Item total</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>

            )}
            {items.map((item, index) => {
              console.log(item);
              const { name, image, item_price, offer_price, quantity, unit, incrementvalue, maxquantity, minquantity } = item;
              return (
                <Tbody>
                  <Tr key={index}>
                    <Td>
                      <Image src={image} boxSize="50px" />
                    </Td>
                    <Td>
                      <Text>{item.name}</Text>
                    </Td>
                    <Td>
                      <HStack>
                        <Button onClick={() => decrementCount(index, incrementvalue, maxquantity, minquantity)}>-</Button>
                        <Text>{item.quantity}</Text>
                        <Button onClick={() => incrementCount(index, incrementvalue, maxquantity, minquantity)}>+</Button>
                      </HStack>
                    </Td>
                    <Td>
                      {offer_price}
                    </Td>
                    <Td>
                      {item_price}
                    </Td>
                    <Td>
                      {offer_price * quantity}
                    </Td>
                    <Td>
                    <Button colorScheme="red" onClick={() => removeItem(index)}>
                      <FaTrash />
                    </Button>
                    </Td>
                  </Tr>
                </Tbody>

              );
            })}
          </Table>

          {/* Total Section */}
          <Box mt={4} p={4} border="1px solid lightgray" borderRadius="md" bg="gray.50">
            <HStack justifyContent="space-between" mt={2}>
              <Text>No. of items:</Text>
              <Text>{items.length}</Text>
            </HStack>
            <HStack justifyContent='space-between' mt={2}>
              <Text>Total Discount:</Text>
              <Text>{totalDiscount}</Text>
            </HStack>
            <HStack justifyContent="space-between" mt={2}>
              <Text>Delivery fee:</Text>
              {deliveryFee > 0 ? <Text>{deliveryFee}</Text> : <Text>free</Text>}
            </HStack>
            <HStack justifyContent="space-between" mt={2}>
            <Text>Total:</Text>
            <Text>{`₹${grandTotal + deliveryFee}`}</Text>  {/* Add delivery fee to the grand total here */}
          </HStack>
          </Box>
        </GridItem>

        {/* Customer and Address Section */}
        <GridItem colSpan={1}>
          <Heading size="md" mb={4}>
            Select Customer
          </Heading>
          <Select
                name='user'
                focusBorderColor='brown.500'
                value={selectedUser} onChange={onUserSelect}
              >
                 <option value="">Select a user</option>
              {customerlist.length > 0 ? (
                customerlist.map((users,index) =>{
                //  console.log(users.name?users.name:'Na');
                 return (
                  // <></>
                 <option key={users._id} value={users._id}>{(users.name?users.name:'Na')}</option>
                 )
               })
              ):(<></>)}
              </Select>
          <Grid mt={5}>

         
           {uaddress && uaddress.map((data, index) => {
                      const { address_name, name, phone, email, address, locality, city, pin_code, state, landmark } = data;
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
                          <Text>{city},{pin_code},{state}</Text>
                          <Button
                            colorScheme="blue"
                            mt={5}
                            mb={5}
                            onClick={(e) => {
                              onClose();
                              e.target.name = 'address_name';
                              e.target.value = address_name
                              updateNewOrderAddressDetails(e);
                              e.target.name = 'address';
                              e.target.value = address
                              updateNewOrderAddressDetails(e);
                              e.target.name = 'name';
                              e.target.value = name;
                              updateNewOrderAddressDetails(e);
                              e.target.name = 'phone';
                              e.target.value = phone;
                              updateNewOrderAddressDetails(e);
                              e.target.name = 'email';
                              e.target.value = email;
                              updateNewOrderAddressDetails(e);
                              e.target.name = 'locality';
                              e.target.value = locality;
                              updateNewOrderAddressDetails(e);
                              e.target.name = 'city';
                              e.target.value = city;
                              updateNewOrderAddressDetails(e);
                              e.target.name = 'pin_code';
                              e.target.value = pin_code
                              updateNewOrderAddressDetails(e);
                              e.target.name = 'state';
                              e.target.value = state;
                              updateNewOrderAddressDetails(e);
                              e.target.name = 'landmark';
                              e.target.value = landmark;
                              updateNewOrderAddressDetails(e);
                            }}
                          >Select user address </Button>
                        </Box>
                      );
                    })}
                   </Grid>
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
                colorScheme="blue"
                onClick={async () => {
                  onOpen();
                  console.log(userAddresses?.[0]?.address); // Debugging line
                }}
              >
                Click to select customer Address
              </Button>
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
         
        </GridItem>
        <GridItem colSpan={3}>
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

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
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
    Icon
} from '@chakra-ui/react';
import {
    SidebarWithHeader,
} from '../components';
import { useOrderContext } from '../context/order_context';
import { useProductContext } from '../context/product_context';
import { FaRegEdit } from "react-icons/fa";

function EditOrderPage() {

    const {
        orderForEditOrder_loading,
        orderForEditOrder_error,
        orderForEditOrder,
        fetchOrderForEditOrder
    } = useOrderContext();

    const orderItems = orderForEditOrder?.[0]?.orderItems;
    const orderId = orderForEditOrder?.[0]?.orderId
    const [items, setItems] = useState([]);
    const suggestionBoxRef = useRef(null); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [grandTotal, setGrandTotal] = useState(null);
    const [suggestions, setSuggestions] = useState([]); 
    const { productForCreateOrder, fetchProductForCreateOrder } = useProductContext();
    const { id } = useParams();

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

    useEffect(() => {
        const total = items.reduce((acc, item) => {
            const itemTotal = item.offer_price > 0 ? item.offer_price * item.quantity : item.item_price * item.quantity;
            return acc + itemTotal;
        }, 0);
        setGrandTotal(total);
    }, [items]);

    useEffect(() => {
        if(searchTerm) {
            fetchProductForCreateOrder(searchTerm);
            setSuggestions(productForCreateOrder);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);



    useEffect(() => {
        fetchOrderForEditOrder(id)
    }, [id]);

    useEffect(() => {
        if (orderItems) {
            setItems(orderItems);
        }
    }, [orderItems]);

    useEffect(() => {
        console.log(productForCreateOrder);
    }, [productForCreateOrder]);


    return (
        <SidebarWithHeader>
            <VStack spacing={4} align='stretch'>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem colSpan={2}>
                        <Heading>
                            Edit order  {orderId}
                        </Heading>
                        <Box mb={4} position="relative" mt={4}>
                            <Input
                                placeholder='Search for products'
                                size='lg'
                                value={searchTerm}
                                onChange={(e) => {setSearchTerm(e.target.value)} }
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
                                    onClick={() => addItem({ ...product, quantity: 1 })}
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
                        {items.map((item, index) => {
                            const { name, image, item_price, offer_price, quantity, unit, incrementvalue, maxquantity, minquantity } = item;
                            return (
                                <HStack key={index} justifyContent="space-between" mb={2}>
                                    <Image src={image} boxSize="50px" />
                                    <Text>{name}</Text>
                                    <HStack>
                                        <Button onClick={() => { }}>-</Button>
                                        <Text>{quantity}</Text>
                                        <Button onClick={() => { }}>+</Button>
                                    </HStack>
                                    {offer_price > 0 ? (<Text>{offer_price * quantity}</Text>) : (<Text>{item_price * quantity}</Text>)}
                                </HStack>
                            );
                        })}
                        <Divider />

                        {/* Total section */}
                        <Box mt={4} p={4} border="1px solid lightgray" borderRadius="md" bg="gray.50">
                            <HStack justifyContent="space-between">
                                <Text>No. of items: </Text>
                                <Text>{items.length}</Text>
                            </HStack>
                            <HStack justifyContent="space-between" mt={2}>
                                <Text>Total:{`₹${grandTotal}`}</Text>
                                <Text></Text>
                            </HStack>
                        </Box>

                    </GridItem>
                    <GridItem colSpan={1}>
                        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto' mt={4}>

                            <HStack justifyContent="space-between" mt={4}>
                                <Heading size='md' mb={4} mt={4}>
                                    Shipping Address
                                </Heading>
                                <Box
                                    as="button"
                                    _hover={{ color: 'teal.500', transform: 'scale(1.2)' }}
                                    transition="all 0.3s"
                                    aria-label="Settings"
                                >
                                    <Icon as={FaRegEdit} boxSize={5} />
                                </Box>
                            </HStack>

                            <FormControl>
                                <FormLabel>Address name</FormLabel>
                                <Input
                                    placeholder='Address name'
                                    name='address_name'
                                    focusBorderColor='brown.500'
                                // value={address_name}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    placeholder='Address'
                                    name='address'
                                    focusBorderColor='brown.500'
                                // value={address}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>City</FormLabel>
                                <Input
                                    placeholder='City'
                                    name='city'
                                    focusBorderColor='brown.500'
                                // value={city}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder='Email'
                                    name='email'
                                    focusBorderColor='brown.500'
                                // value={email}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Landmark</FormLabel>
                                <Input
                                    placeholder='Landmark'
                                    name='landmark'
                                    focusBorderColor='brown.500'
                                // value={landmark}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Locality</FormLabel>
                                <Input
                                    placeholder='Locality'
                                    name='locality'
                                    focusBorderColor='brown.500'
                                // value={locality}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder='Name'
                                    name='name'
                                    focusBorderColor='brown.500'
                                // value={name}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    placeholder='Phone'
                                    name='phone'
                                    focusBorderColor='brown.500'
                                // value={phone}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Pin code</FormLabel>
                                <Input
                                    placeholder='Pin code'
                                    name='pin_code'
                                    focusBorderColor='brown.500'
                                // value={pin_code}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>State</FormLabel>
                                <Input
                                    placeholder='State'
                                    name='state'
                                    focusBorderColor='brown.500'
                                // value={state}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>

                        </SimpleGrid>
                        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto' mt={4}>

                            <HStack justifyContent="space-between" mt={4}>
                                <Heading size='md' mb={4} mt={4}>
                                    Shipping Address
                                </Heading>
                                <Box
                                    as="button"
                                    _hover={{ color: 'teal.500', transform: 'scale(1.2)' }}
                                    transition="all 0.3s"
                                    aria-label="Settings"
                                >
                                    <Icon as={FaRegEdit} boxSize={5} />
                                </Box>
                            </HStack>
                            <FormControl>
                                <FormLabel>Address name</FormLabel>
                                <Input
                                    placeholder='Address name'
                                    name='address_name'
                                    focusBorderColor='brown.500'
                                // value={address_name}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    placeholder='Address'
                                    name='address'
                                    focusBorderColor='brown.500'
                                // value={address}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>City</FormLabel>
                                <Input
                                    placeholder='City'
                                    name='city'
                                    focusBorderColor='brown.500'
                                // value={city}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder='Email'
                                    name='email'
                                    focusBorderColor='brown.500'
                                // value={email}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Landmark</FormLabel>
                                <Input
                                    placeholder='Landmark'
                                    name='landmark'
                                    focusBorderColor='brown.500'
                                // value={landmark}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Locality</FormLabel>
                                <Input
                                    placeholder='Locality'
                                    name='locality'
                                    focusBorderColor='brown.500'
                                // value={locality}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder='Name'
                                    name='name'
                                    focusBorderColor='brown.500'
                                // value={name}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    placeholder='Phone'
                                    name='phone'
                                    focusBorderColor='brown.500'
                                // value={phone}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Pin code</FormLabel>
                                <Input
                                    placeholder='Pin code'
                                    name='pin_code'
                                    focusBorderColor='brown.500'
                                // value={pin_code}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>State</FormLabel>
                                <Input
                                    placeholder='State'
                                    name='state'
                                    focusBorderColor='brown.500'
                                // value={state}
                                // onChange={updateNewOrderAddressDetails}
                                />
                            </FormControl>

                        </SimpleGrid>

                        <Button
                            // isLoading={createOrderLoadingState}
                            loadingText='Creating order'

                            colorScheme="blue"
                            mt={5}
                        // onClick={handleCreateOrder}
                        >Update Order</Button>
                    </GridItem>

                </Grid>
            </VStack>
        </SidebarWithHeader >
    )
}

export default EditOrderPage;
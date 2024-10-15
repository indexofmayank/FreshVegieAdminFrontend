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
    Icon,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    toast,
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
    const orderId = orderForEditOrder?.[0]?.orderId;
    const [items, setItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(null);
    const toast = useToast();
    const { id } = useParams();

    useEffect(() => {
        fetchOrderForEditOrder(id)
    }, [id]);

    useEffect(() => {
        if (orderItems) {
            setItems(orderItems);
        }
    }, [orderItems]);

    console.log(items);

    const decrementCount = (index, incrementvalue, maxquantity, minquantity) => {
        if (items[index].quantity === minquantity) {
            return toast({
                position: 'top',
                title: 'Limit reacthed',
                description: `minimum limit ${minquantity} at a time`,
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

    const incrementCount = () => {
        return toast({
            position: 'top',
            title: 'Limit reached',
            description: `maximum limit 0 at a time`,
            status: 'warning',
            duration: 5000,
            isClosable: true
        });
    }

    return (
        <SidebarWithHeader>
            <VStack spacing={4} align='stretch'>
                <Grid gap={6}>
                    <GridItem colSpan={2}>
                        <Heading size="md" mb={4}>
                            Edit order  {orderId}
                        </Heading>
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
                                    </Tr>
                                </Thead>
                            )}
                            {items.map((item, index) => {
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
                                                    <Button onClick={() => incrementCount()}>+</Button>
                                                </HStack>
                                            </Td>
                                            <Td>
                                                {offer_price * quantity}
                                            </Td>
                                            <Td>
                                                {item_price * quantity}
                                            </Td>
                                            <Td>
                                                {offer_price * quantity}
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
                                {/* <Text>{items.length}</Text> */}
                            </HStack>
                            <HStack justifyContent='space-between' mt={2}>
                                <Text>Total Discount:</Text>
                                {/* <Text>{totalDiscount}</Text> */}
                            </HStack>
                            <HStack justifyContent='space-between' mt={2}>
                                <Text>Delivery fee:</Text>
                                {/* {items.length === 0 ? (<Text>0</Text>) : grandTotal < minimumCartAmount ? (<Text>{deliveryCharges}</Text>) : (<Text>free</Text>)} */}
                            </HStack>
                            <HStack justifyContent="space-between" mt={2}>
                                <Text>Total:</Text>
                                {/* <Text>{`₹${grandTotal}`}</Text> */}
                            </HStack>
                        </Box>


                    </GridItem>
                </Grid>
            </VStack>
        </SidebarWithHeader >
    )
}

export default EditOrderPage;
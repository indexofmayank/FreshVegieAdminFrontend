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
    const { id } = useParams();

    useEffect(() => {
        fetchOrderForEditOrder(id)
    }, [id]);

    useEffect(() => {
        if (orderItems) {
            setItems(orderItems);
        }
    }, [orderItems]);



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
                                                    <Button onClick={() =>{}}>-</Button>
                                                    <Text>{item.quantity}</Text>
                                                    <Button onClick={() =>{}}>+</Button>
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

                    </GridItem>
                </Grid>
            </VStack>
        </SidebarWithHeader >
    )
}

export default EditOrderPage;
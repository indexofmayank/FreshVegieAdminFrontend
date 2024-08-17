import React, {useEffect, useState} from 'react';
import {
    Box, HStack, VStack, Text, Badge,
    SimpleGrid, Table, Thead, Tr, Th, Tbody, Td, Image, Spinner
} from '@chakra-ui/react';
import { useOrderContext } from '../context/order_context';


function OrderTableWithItem({ orderWithItems }) {
    console.log('Order Data:', orderWithItems);

    // Safely check if orderWithItems is defined and contains orderItems
    if (!orderWithItems || !orderWithItems.orderItems) {
        console.error('No orderItems found or orderWithItems is undefined');
        return <Text>No order items available.</Text>;
    }

    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
            <Table variant='striped'>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>Item Name</Th>
                        <Th>Item Price</Th>
                        <Th>Disc. Price</Th>
                        <Th>Quantity</Th>
                        <Th>Tax</Th>
                        <Th>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orderWithItems.orderItems.map((item, index) => (
                        <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{item.name}</Td>
                            <Td>{item.price}</Td>
                            <Td>{item.discountPrice}</Td>
                            <Td>{item.quantity}</Td>
                            <Td>{item.tax}</Td>
                            <Td>{item.total}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </SimpleGrid>
    );
}

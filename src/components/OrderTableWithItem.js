import React, { useEffect, useState } from 'react';
import {
    Box, HStack, VStack, Text, Badge,
    SimpleGrid, Table, Thead, Tr, Th, Tbody, Td, Image, Spinner
} from '@chakra-ui/react';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'
import { useOrderContext } from '../context/order_context';


 function OrderTableWithItem({ orderWithItems }) {
    console.log('Order Data:', orderWithItems);
    const [date, setDate] = useState(""); // Input date as string
    const [newDate, setNewDate] = useState(""); // New date after adding 1 day
    
    // let givenDate = new Date(orderWithItems.createdAt);
    // console.log(orderWithItems.createdAt);
    // console.log(givenDate.getDate() + 1);
    // Safely check if orderWithItems is defined and contains orderItems

    // useEffect(() => {
    //     if (date) {
    //       let givenDate = new Date(date);
    
    //       // Ensure the date is valid before trying to manipulate it
    //       if (!isNaN(givenDate.getTime())) {
    //         givenDate.setDate(givenDate.getDate() + 1);
    //         setNewDate(givenDate.toString()); // Update newDate with the full date string
    //       } else {
    //         console.error("Invalid date provided");
    //       }
    //     }
    //   }, [date]);

      const addOneDay = () => {
        
        let givenDate = new Date(date);
      
      // Add 1 day
      givenDate.setDate(givenDate.getDate() + 1);

      // Format the new date with full details
      setNewDate(givenDate.toString())
    // const formattedDate = givenDate.toISOString().split('T')[0];
    // setNewDate(formattedDate);
        // if (orderWithItems.createdAt) {
        //   let givenDate = new Date(orderWithItems.createdAt);
        //   let newdata =  givenDate.getDate() + 1;
        // console.log(newDate);
        console.log(givenDate);
        //   // Format new date to "YYYY-MM-DD"
        //   const formattedDate = newdata.toISOString().split('T')[0];
        //   return formattedDate;
        // }
      };


      useEffect(() => {
        if(orderWithItems){
            setDate(orderWithItems.createdAt);
            // addOneDay()
        }
       
        // addOneDay()
      }, [orderWithItems]);

      useEffect(() => {
        // if(orderWithItems){
        //     setDate(orderWithItems.createdAt);
            addOneDay()
        // }
       
        // addOneDay()
      }, [date]);


    if (!orderWithItems || !orderWithItems.orderItems) {
        console.error('No orderItems found or orderWithItems is undefined');
        return <Text>No order items available.</Text>;
    }
   
  


   
     // let givenDate = new Date(orderWithItems.createdAt);
    // console.log(orderWithItems.createdAt);
    // console.log(givenDate.getDate() + 1);

    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto' columns={2} spacing={10}>
             <Box width={'100%'}>
             <Table variant='simple' maxWidth={'100%'}>
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
                    {orderWithItems.orderItems.map((item, index) => {
                        const { name, image, price, quantity } = item;
                        return (
                            <Tr key={index}>
                                <Td>
                                    <Image
                                        src={image}
                                        boxSize='100px'
                                        objectFit='cover'
                                        borderRadius='lg'
                                    />

                                </Td>
                                <Td>{name}</Td>
                                <Td>{price}</Td>
                                <Td>-</Td>
                                <Td>{quantity}</Td>
                                <Td>0</Td>
                                <Td>{price * quantity} </Td>
                            </Tr>
                        )
                    })}
                    <tr>
                        <td colSpan={4}></td>
                        
                        <td colSpan={2}>Delivery Fee</td>
                        <td>Free</td>
                    </tr>
                    <tr>
                        <td colSpan={4}></td>
                       
                        <td colSpan={2}>Discounts</td>
                        <td>{orderWithItems.discountPrice}</td>
                    </tr>
                    <tr>
                        <td colSpan={4}></td>
                       
                        <td colSpan={2}>Grand Total</td>
                        <td>{orderWithItems.totalPrice}</td>
                    </tr>
                </Tbody>
            </Table>
             </Box>
             <Box>
                <Box height='auto'  m={4}>
                    <Stat>
                        <StatLabel>Customer Details</StatLabel>
                        <StatHelpText>{orderWithItems.user.name}</StatHelpText>
                        <Text fontSize='xl'>{orderWithItems.user.phone}</Text>
                        <StatHelpText>{orderWithItems.shippingInfo.deliveryAddress.address}</StatHelpText>
                        <StatHelpText>{orderWithItems.shippingInfo.deliveryAddress.address},{orderWithItems.shippingInfo.deliveryAddress.locality},{orderWithItems.shippingInfo.deliveryAddress.landmark},{orderWithItems.shippingInfo.deliveryAddress.city},{orderWithItems.shippingInfo.deliveryAddress.pin_code},{orderWithItems.shippingInfo.deliveryAddress.state}</StatHelpText>
                    </Stat>
                </Box>
                <Box m={4}>
                <StatGroup>
                    <Stat>
                        <StatNumber>Payment Details</StatNumber>
                        <StatLabel>Payment Mode</StatLabel>
                        <StatHelpText>{orderWithItems.paymentInfo.payment_type}</StatHelpText>
                        <StatHelpText>COD : ₹{orderWithItems.itemsPrice}</StatHelpText>
                    
                    </Stat>

                    <Stat>
                        <StatLabel>{orderWithItems.paymentInfo.status}</StatLabel>
                    </Stat>
                    </StatGroup>
                </Box>
                <Box m={4}>
                     <StatGroup>
                    <Stat>
                        <StatLabel>Weight</StatLabel>
                    </Stat>
                    <Stat>
                        <StatLabel>Order Status</StatLabel>
                    </Stat>
                    </StatGroup>
                </Box>
                <Box m={4}>
                <StatGroup>
                    <Stat>
                        <StatNumber>Delivery Details</StatNumber>
                        <StatHelpText>Delivery Type</StatHelpText>
                        <StatHelpText>Standard Delivery</StatHelpText>
                        <StatHelpText>Ordered On</StatHelpText>
                        <StatHelpText>{orderWithItems.createdAt}</StatHelpText>
                        <StatHelpText>Delivery Time</StatHelpText>
                        <StatHelpText>{newDate}</StatHelpText>
                        <StatHelpText>Delivery Address</StatHelpText>
                        <StatHelpText>{orderWithItems.shippingInfo.deliveryAddress.address}</StatHelpText>
                        <StatHelpText>{orderWithItems.shippingInfo.deliveryAddress.address},{orderWithItems.shippingInfo.deliveryAddress.locality},{orderWithItems.shippingInfo.deliveryAddress.landmark},{orderWithItems.shippingInfo.deliveryAddress.city},{orderWithItems.shippingInfo.deliveryAddress.pin_code},{orderWithItems.shippingInfo.deliveryAddress.state}</StatHelpText>
                    </Stat>

                    <Stat>
                        <StatLabel>icon</StatLabel>
                    </Stat>
                    </StatGroup>
                </Box>
             </Box>
        </SimpleGrid>
    );
}

export default OrderTableWithItem;

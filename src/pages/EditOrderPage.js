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
    Checkbox,
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
        fetchOrderForEditOrder,
        // fetchStaticDeliveryInstructionsInfo,
        updateOrderForAdmin,
        fetchUserBalanceFromWallet,
        updateUserRefundAmountToWallet
    } = useOrderContext();

    const orderItems = orderForEditOrder?.[0]?.orderItems;
    const orderId = orderForEditOrder?.[0]?.orderId;
    const amount = orderForEditOrder?.[0]?.amount || null;
    const paymentInfo = orderForEditOrder?.[0]?.paymentInfo || {};
    const isDeliveryUsed = orderForEditOrder?.[0]?.isDeliveryUsed || false;
    const deliverycharges = orderForEditOrder?.[0]?.deliverycharges || null;
    const discount = orderForEditOrder?.[0]?.discountPrice || null;
    const userId = orderForEditOrder?.[0]?.userId || null;
    const [items, setItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(amount);
    const [updatedDeliveryCharges, setUpdatedDeliveryCharges] = useState(deliverycharges);
    const [fixedDeliveryCharges, setFixedDeliveryCharges] = useState(null);
    const [refundableAmout, setRefundAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(discount);
    const [minimumCartAmount, setMinimumCartAmount] = useState(null);
    const [updatingOrderLoading, setUpdatingOrderLoading] = useState(false);
    const [deliveryFeeText, setDeliveryFeeText] = useState(null);
    const [isChecked, setIsChecked] = useState(true);
    const [isRefundInitiated, setIsRefundInitiated] = useState(false);


    const toast = useToast();
    const { id } = useParams();

    useEffect(() => {
        const total = items.reduce((acc, item) => {
            return acc + (item.offer_price * item.quantity);
        }, 0);
        // if (total < minimumCartAmount) {
            const finalAmount = total + deliverycharges;
            const refund = amount - total
            // console.log(refund);
            // console.log(total);
            // console.log(amount);
            // console.log(finalAmount);
            // setDeliveryFeeText(deliverycharges);
            setGrandTotal(finalAmount);
            setRefundAmount(refund);

        // } else {
            // setGrandTotal(total);
            // setDeliveryFeeText('free');
        // }
    }, [items, fixedDeliveryCharges, minimumCartAmount]);

    useEffect(() => {
        const total = items.reduce((acc, item) => {
            const totalOfferPrice = item.item_price * item.quantity - item.offer_price * item.quantity;
            return acc + totalOfferPrice;
        }, 0);
        setTotalDiscount(total);
    }, [items]);





    // useEffect(() => {
    //     const loadDeliveryData = async () => {
    //         const response = await fetchStaticDeliveryInstructionsInfo()
    //         setMinimumCartAmount(response?.data?.minimumcart_amount);
    //         setFixedDeliveryCharges(response?.data?.delivery_charges);
    //     }
    //     loadDeliveryData();
    // });

    useEffect(() => {
        fetchOrderForEditOrder(id)
    }, [id]);

    useEffect(() => {
        if (orderItems) {
            setItems(orderItems);
        }
    }, [orderItems]);

    // console.log(orderId);

    // const decrementCount = (index,currentquantity, incrementvalue, maxquantity, minquantity) => {
    //     // if (currentquantity - incrementvalue === 0) {
    //     //     console.log("unable to decreasse quantity")
    //     //     // dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
    //     // }else{
    //         setItems((prevItems) =>
    //         prevItems
    //             .map((item, i) =>
    //                 i === index ? { ...item, quantity: parseFloat(item.quantity) - parseFloat(item.incrementvalue) } : item
    //             )
    //             .filter((item) => item.quantity > 0)
    //     );
    //     // }
        
    // };
    const decrementCount = (index, currentQuantity,minquantity,maxquantity,incrementvalue) => {
        // console.log(index, currentQuantity,minquantity,maxquantity,incrementValue)
        console.log(currentQuantity - incrementvalue,minquantity);
        if (currentQuantity - incrementvalue < minquantity) {
            // Show a warning if attempting to reduce below the minimum quantity
            return toast({
                position: 'top',
                title: 'Cannot decrease quantity',
                description: 'Quantity cannot be less than 1.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
        } else {
            // Update item quantity
            setItems((prevItems) =>
                prevItems.map((item, i) =>
                    i === index ? { ...item, quantity: parseFloat(currentQuantity) - parseFloat(incrementvalue) } : item
                )
            );
        }
    };
    

    const incrementCount = (index, currentQuantity,minquantity,maxquantity,incrementvalue) => {
        if (currentQuantity + incrementvalue > maxquantity) {
        return toast({
            position: 'top',
            title: 'Limit reached',
            description: `maximum limit 0 at a time`,
            status: 'warning',
            duration: 5000,
            isClosable: true
        });
    } else {
        // Update item quantity
        setItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index ? { ...item, quantity: parseFloat(currentQuantity) + parseFloat(incrementvalue) } : item
            )
        );
    }
    }

    // const calculateTotals = () => {
    //     const total = items.reduce((acc, item) => acc + (item.offer_price * item.quantity), 0);
    //     setGrandTotal(total);
    //     // setRefundAmount(amount - total);
    // };

    const handleUpdateOrder = async () => {
        setUpdatingOrderLoading(true);

        // Calculate totals before updating the order
        // calculateTotals();

        try {
            const updatedPaymentInfo = {

                amount: grandTotal,
                deliverycharges: paymentInfo.deliverycharges,
                payment_type: paymentInfo.payment_type,
                referralAmount: paymentInfo.referralAmount,
                status: paymentInfo.status,
                useReferral: paymentInfo.useReferral,
                useWallet: paymentInfo.useWallet,
                usedelivery: paymentInfo.usedelivery,
                walletAmount: paymentInfo.walletAmount,
                referralAmount: paymentInfo.referralAmount,
                refundAmount: refundableAmout,
                refundStatus: isRefundInitiated && refundableAmout > 0 && paymentInfo.payment_type === "online" ? 'completed' : null,
            };
            const discountPrice = totalDiscount;
            const response = await updateOrderForAdmin(id, items, updatedPaymentInfo, discountPrice, grandTotal);
            if (response.success && isRefundInitiated && refundableAmout > 0 && paymentInfo.payment_type === "online") {
                const refundUpdateResponse = await updateUserRefundAmountToWallet(userId, refundableAmout,orderId);
                console.log(refundUpdateResponse);
                if (refundUpdateResponse.success) {
                    toast({
                        position: 'top',
                        description: 'Amount refunded successfully',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    toast({
                        position: 'top',
                        description: response.message,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                }

            }
            if (response.success) {
                toast({
                    position: 'top',
                    description: response.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    position: 'top',
                    description: 'Not able to update order',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
             
        } catch (error) {
            toast({
                position: 'top',
                description: error.message || 'Unable to update order',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setUpdatingOrderLoading(false);
        }
    };

    const handleCheckboxChange = (e) => {
        setIsRefundInitiated(e.target.checked);
    };
   
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
                                // console.log( item.quantity,item.minquantity,item.maxquantity, item.incrementvalue);
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
                                                <Button 
                                                        onClick={() => decrementCount(index, item.quantity,item.minquantity,item.maxquantity, item.incrementvalue)} 
                                                        isDisabled={item.quantity <= item.minquantity}
                                                    >-</Button>
                                                    <Text>{item.quantity}</Text>
                                                    <Button onClick={() => incrementCount(index, item.quantity,item.minquantity,item.maxquantity, item.incrementvalue)} isDisabled={item.quantity >= item.quantity}>+</Button>
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
                                <Text>{items.length}</Text>
                            </HStack>
                            <HStack justifyContent='space-between' mt={2}>
                                <Text>Total Discount:</Text>
                                <Text>{totalDiscount}</Text>
                            </HStack>
                            <HStack justifyContent='space-between' mt={2}>
                                <Text>Delivery fee:</Text>
                                <Text>{(isDeliveryUsed?deliverycharges:'Free')}</Text>
                            </HStack>
                            <HStack justifyContent="space-between" mt={2}>
                                <Text>Total:</Text>
                                <Text>{`₹${grandTotal}`}</Text>
                            </HStack>
                            {paymentInfo.payment_type =='online' && refundableAmout > 0 && (
                                <>
                                    <HStack justifyContent="space-between" mt={2}>
                                        <Text>Refund :</Text>
                                        <Text>{`₹${refundableAmout}`}</Text>
                                    </HStack>

                                    <FormControl mt={2}>
                                        {/* <Checkbox
                                            defaultChecked
                                            colorScheme='brown'
                                            name='isRefuned'
                                            onChange={(e) => { console.log(e.target.checked) }}
                                        >
                                            Initiate refund amount to wallet
                                        </Checkbox> */}
                                        <Checkbox
                                            isChecked={isRefundInitiated}
                                            colorScheme='brown'
                                            onChange={handleCheckboxChange}
                                        >
                                            Initiate refund amount to wallet
                                        </Checkbox>
                                    </FormControl>
                                </>
                            )}
                        </Box>

                        <Button
                            isLoading={updatingOrderLoading}
                            loadingText={`Updating ${orderId || null}`}
                            colorScheme="blue"
                            mt={2}
                            onClick={handleUpdateOrder} // Call the refactored function here
                        >
                            Update {orderId}
                        </Button>

                    </GridItem>
                </Grid>
            </VStack>
        </SidebarWithHeader >
    )
}

export default EditOrderPage;
import React, { useEffect, useState } from "react";
import {
    Box,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    Button,
    filter,
    FormControl, FormLabel, Input,
    Stack,
    HStack
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useOrderStatusContext } from '../context/orderStatus_context';
import { Link } from 'react-router-dom';

const OrderCard = ({ label, value, highlight, onClick }) => (
    <Box
        p={4}
        bg={highlight ? 'black' : 'white'}
        color={highlight ? 'white' : 'black'}
        borderRadius="md"
        textAlign="center"
        shadow="md"
        _hover={{
            bg: highlight ? 'gray.700' : 'gray.200',
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        <Stat>
            <StatLabel>{label}</StatLabel>
            <Text fontSize="2xl">{value}</Text>
        </Stat>
    </Box>
);

function OrderStatus({ orderStatus, totalOrder, totalAvg, totalSales, handleCardClick, filter,setFilter }) {

    const {
        fetchOrderTotalStats,
        fetchOrderAvgCount,
        fetchOrderTotalCount,
        fetchOrderStatus
    } = useOrderStatusContext();

    const [orderStatic, setOrderStatic] = useState([]);
    const [filteredTotalSale, setFilteredTotalSale] = useState(totalSales);



    useEffect(() => {
        setOrderStatic(prevState => [...prevState, orderStatus]);
    }, [orderStatus]);

    const [startDate, setStartDate] = useState(new Date());

    // useEffect(() => {

    // }, [filter]);   

    // Example onClick handler
    console.log(filter);
    console.log(orderStatus);

    return (
        <Box p={6}>
            <HStack justifyContent='space-between' >
                <Box mb={4}>
                    {['All', 'Day', 'Week', 'Month', 'Year', 'Custom'].map((period) => (
                        <Button
                            key={period}
                            colorScheme={filter === period ? 'yellow' : 'gray'}
                            mr={2}
                            onClick={async () => {
                                setFilter(period);
                                await fetchOrderStatus(period);
                                await fetchOrderTotalStats(period);
                                await fetchOrderAvgCount(period);
                                await fetchOrderTotalCount(period);
                            }}
                        >
                            {period}
                        </Button>
                    ))}
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel htmlFor="date-picker">Select Date</FormLabel>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                            }}
                            customInput={<Input id="date-picker" />}
                        />
                    </FormControl>
                </Box>

            </HStack>
            {/* Order Cards */}
            <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing={4} mb={6}>


                {
                    orderStatic[0]?.orderStatus?.map((status, index) => {
                        const { label, data } = status;
                        return (

                            <OrderCard key={index} label={label} value={data} onClick={() => handleCardClick(label)} />
                        );
                    })
                }
            </SimpleGrid>
            {/* Total Orders, Average Order Value, and Total Sales */}
            <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4}>
                <OrderCard label="Total Orders" value={totalOrder[0]?.totalOrders} key={48} />
                <OrderCard label="Average Order Value" value={totalAvg} />
                <OrderCard label="Total Sales" value={totalSales} onClick={() => { }} />
            </SimpleGrid>
        </Box>
    );
}

export default OrderStatus;

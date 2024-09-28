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
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';


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

function OrderStatus({ orderStatus, totalOrder, totalAvg, totalSales, handleCardClick, filter, setFilter }) {

    const {
        fetchOrderTotalStats,
        fetchOrderAvgCount,
        fetchOrderTotalCount,
        fetchOrderStatus
    } = useOrderStatusContext();

    const [orderStatic, setOrderStatic] = useState([]);
    const [filteredTotalSale, setFilteredTotalSale] = useState(totalSales);
    const [selectedDate, setSelectedDate] = useState([new Date(), new Date()])
    useEffect(() => {
        setOrderStatic(prevState => [...prevState, orderStatus]);
    }, [orderStatus]);

    console.log(filter);
    console.log(orderStatus);
        
    return (
        <Box p={6}>
            <HStack justifyContent='space-between' >
                <Box mb={4}>
                    {['All', 'Day', 'Week', 'Month', 'Year'].map((period) => (
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
                        <FormLabel htmlFor="date-pickerone">Select Date</FormLabel>
                        {/* <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                            }}
                            customInput={<Input id="date-pickerone" />}
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => {
                                setEndDate(date);
                                console.log(date);
                            }}
                            customInput={<Input id="date-pickerone" />}
                        /> */}
                        <DateRangePicker 
                            onChange={ async (value) => { 
                                await fetchOrderStatus('custom', value[0], value[1]);
                                setSelectedDate(value);
                            }}
                            value={selectedDate} 
                            format="dd-MM-y"
                        />
                        {/* <DatePicker
                            selected={selectedDate.startDate}
                            onChange={async (date) => {
                                setSelectedDate((prevState) => ({
                                    ...prevState,
                                    startDate: date
                                }));
                                console.log(selectedDate);
                                await fetchOrderStatus('custom', selectedDate.startDate, selectedDate.endDate);
                            }}
                            customInput={<Input id="date-pickerone" />}
                        />
                        <DatePicker
                            selected={selectedDate.endDate}
                            onChange={async (date) => {
                                setSelectedDate((prevState) => ({
                                    ...prevState,
                                    endDate: date
                                }));
                                await fetchOrderStatus('custom', selectedDate.startDate, selectedDate.endDate);
                            }}
                            customInput={<Input id="date-pickerone" />}
                        /> */}
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

import React, { useEffect, useState } from "react";
import {
    SidebarWithHeader,
    CreateNewDealOfTheDay,
    DealOfTheDayTable
} from '../components';
import { HStack, Button, VStack, Spinner, Heading } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useDealOfTheDayContext } from '../context/dealoftheday_context';

function DealOfTheDayPage() {

    const {
        dealOfTheDay_loading: loading,
        dealOfTheDay_error: error,
        dealOfTheDay,
        fetchDealOfTheDayForTable
    } = useDealOfTheDayContext();
    const [dealofthedaydata, setDealofthedaydata] = useState([]);

    const handleRefresh = async () => {
        await fetchDealOfTheDayForTable();
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchDealOfTheDayForTable();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (dealOfTheDay) {
            console.log("working");
            setDealofthedaydata(dealOfTheDay);
        }
    }, [dealOfTheDay]);

    if (loading) {
        return (
            <SidebarWithHeader>
                <HStack mb={3}>
                    <Button
                        colorScheme="blue" // Updated color scheme to "blue"
                        variant="outline"
                        leftIcon={<MdOutlineRefresh />}
                        onClick={handleRefresh}
                    >
                        Refresh
                    </Button>
                </HStack>
                <VStack alignItems='center' justifyContent='center'>
                    <Spinner size='lg' color='blue.500' />
                </VStack>
            </SidebarWithHeader>
        );
    }

    if (error) {
        return (
            <SidebarWithHeader>
                <HStack mb={5}>
                    <Button
                        colorScheme="blue" // Updated color scheme to "blue"
                        variant="outline"
                        leftIcon={<MdOutlineRefresh />}
                        onClick={handleRefresh}
                    >
                        Refresh
                    </Button>
                </HStack>
                <VStack alignItems='center' justifyContent='center'>
                    <Heading color='red.500'>There was an error</Heading>
                </VStack>
            </SidebarWithHeader>
        );
    }

    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <Button
                    colorScheme="blue" // Updated color scheme to "blue"
                    variant="outline"
                    leftIcon={<MdOutlineRefresh />}
                    onClick={handleRefresh}
                >
                    Refresh
                </Button>
            </HStack>
            {dealofthedaydata ? 
                <DealOfTheDayTable dealOfTheDay={dealofthedaydata} />
             : null}
        </SidebarWithHeader>
    );
}

export default DealOfTheDayPage;

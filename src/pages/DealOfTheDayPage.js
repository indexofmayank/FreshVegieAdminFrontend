import React from "react";
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


    const handleRefresh = async () => {
        await fetchDealOfTheDayForTable();
    }

    if (loading) {
        return (
            <SidebarWithHeader>
                <HStack mb={3}>
                    <Button
                        colorScheme="brown"
                        variant="outline"
                        leftIcon={<MdOutlineRefresh />}
                        onClick={handleRefresh}
                    >
                        Refresh
                    </Button>
                </HStack>
                <VStack alignItems='center' justifyContent='center'>
                    <Spinner size='lg' color='brown.500' />
                </VStack>

            </SidebarWithHeader>
        )
    }

    if (error) {
        return (
            <SidebarWithHeader>
                <HStack mb={5}>
                    <Button
                        colorScheme="brown"
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

        )
    }


    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <Button
                    colorScheme="brown"
                    variant="outline"
                    leftIcon={<MdOutlineRefresh />}
                >
                    Refresh
                </Button>

            </HStack>
            <DealOfTheDayTable dealOfTheDay={dealOfTheDay}/>
        </SidebarWithHeader>
    );
}

export default DealOfTheDayPage;
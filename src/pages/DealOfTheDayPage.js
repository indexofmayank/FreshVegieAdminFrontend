import React, { useEffect, useState } from "react";
import {
    SidebarWithHeader,
    CreateNewDealOfTheDay,
    SearchBoxForDealOfTheDay,
    DealOfTheDayTable,
    UpdateDealOfTheDayModal
} from '../components';
import { HStack, Button, VStack, Spinner, Heading, Select, useToast } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useDealOfTheDayContext } from '../context/dealoftheday_context';

function DealOfTheDayPage() {

    const {
        dealOfTheDay_loading: loading,
        dealOfTheDay_error: error,
        dealOfTheDay,
        fetchDealOfTheDayForTable,
        blukUpdateDealOfTheDay,
    } = useDealOfTheDayContext();

    const toast = useToast();
    const [updatedDeals, setUpdatedDeals] = useState([]);
    const [dealofthedaydata, setDealofthedaydata] = useState([]);
    const [pushChangesLoading, setPushChangesLoading] = useState(false);

    const handlePushChangesButton = async (e) => {
        e.preventDefault();
        setPushChangesLoading(true);
        const response = await blukUpdateDealOfTheDay(updatedDeals);
        if(response?.success) {
            await fetchDealOfTheDayForTable();
            setPushChangesLoading(false);
            return toast({
                position: 'top',
                description: `${updatedDeals.length} updated successfully`,
                status: 'success',
                duration: 5000,
                isClosable: true 
            });
        } else {
            setPushChangesLoading(false);
            return toast({
                position: 'top',
                description: response?.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
    };
    

    


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
            setDealofthedaydata(dealOfTheDay);
        }
    }, [dealOfTheDay]);


    if (loading) {
        return (
            <SidebarWithHeader>
                <HStack mb={3}>
                    <Button
                        colorScheme="blue" 
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
                        colorScheme="blue" 
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
                    colorScheme="blue" 
                    variant="outline"
                    leftIcon={<MdOutlineRefresh />}
                    onClick={handleRefresh}
                >
                    Refresh
                </Button>
            <SearchBoxForDealOfTheDay />
            <Button
                colorScheme="brown"
                onClick={(e) => {handlePushChangesButton(e)}}
                isLoading={pushChangesLoading}
                loadingText='Updating Banner'
                >
                Push Changes
            </Button>
            </HStack>
            {dealofthedaydata ? 
                <DealOfTheDayTable dealOfTheDay={dealofthedaydata}
                updatedDeals={updatedDeals}
                setUpdatedDeals={setUpdatedDeals}
                />
             : null}
        </SidebarWithHeader>
    );
}

export default DealOfTheDayPage;

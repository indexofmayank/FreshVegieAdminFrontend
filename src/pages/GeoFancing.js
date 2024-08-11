import React, { useState } from 'react';
import {
    SidebarWithHeader,
    GeoFancingPolygon,
    CreateNewGeoFancingModal,
    GeoFancingTable
} from '../components';
import { HStack, Button, VStack, Spinner, Heading } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useGeoFancingContext } from '../context/geoFancing_context';

function GeoFancing() {

    const {
        geoFancings,
        geoFancing_loading: loading,
        geoFancing_error: error,
        fetchGeoFancing
    } = useGeoFancingContext();

    const handleRefresh = async () => {
        await fetchGeoFancing;
    };

    if (loading) {
        return (
            <SidebarWithHeader>
                <HStack mb={5}>
                    <CreateNewGeoFancingModal />
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

            </SidebarWithHeader >
        );
    };

    if (error) {
        return (
            <SidebarWithHeader>
                <HStack mb={5}>
                    <CreateNewGeoFancingModal />
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
        );
    }


    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateNewGeoFancingModal/>
                <Button
                    colorScheme="brown"
                    variant="outline"
                    leftIcon={<MdOutlineRefresh />}

                >
                    Refresh
                </Button>
            </HStack>
            <GeoFancingTable  geoFancings={geoFancings}/>
        </SidebarWithHeader>
    )
}

export default GeoFancing;
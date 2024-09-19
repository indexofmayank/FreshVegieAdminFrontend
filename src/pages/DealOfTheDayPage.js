import React from "react";
import {
    SidebarWithHeader,
    CreateNewDealOfTheDay,
} from '../components';
import { HStack, Button, VStack, Spinner, Heading } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';


function DealOfTheDayPage() {

    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateNewDealOfTheDay />
                <Button
                    colorScheme="brown"
                    variant="outline"
                    leftIcon={<MdOutlineRefresh />}
                >
                    Refresh
                </Button>

            </HStack>
        </SidebarWithHeader>
    );
}

export default DealOfTheDayPage;
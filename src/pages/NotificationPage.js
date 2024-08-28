import React, {useEffect, useState} from "react";
import {
    SidebarWithHeader
} from '../components';
import { HStack, Button, VStack, Spinner, Heading, Text } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { CreateNewNotificationModal } from '../components/';
import { NotificationTable} from '../components/';


const handleReresh =() => {
    console.log('clicked');
};


function NotificationPage() {


    return (
        <SidebarWithHeader >
            <HStack mb={5}>
                <CreateNewNotificationModal />
                <Button
                    colorScheme="brown"
                    variant="outline"
                    leftIcon={<MdOutlineRefresh />}
                    onClick={handleReresh}
                >
                    Refresh
                </Button>
            </HStack>
            <NotificationTable />
        </SidebarWithHeader>
    );

}

export default NotificationPage;
import React, { useEffect, useState } from "react";
import {
    SidebarWithHeader
} from '../components';
import { HStack, Button, VStack, Spinner, Heading, Text } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { CreateNewNotificationModal } from '../components/';
import { NotificationTable } from '../components/';
import { useNotificationContext } from '../context/notification_context';
import axios from "axios";
import {getAllUserFcmToken_url} from '../utils/constants';


function NotificationPage() {

    const [allUserToken, setAllUserToken] = useState([]);

    const {
        notificatin_loading: loading,
        notification_error: error,
        notifications,
        fetchNotifications,
        notificationProductName_loading,
        notificationProductName_error,
        notificationProductName,
        fetchProductNameForNotification
    } = useNotificationContext();

    const handleRefresh = async () => {
        await fetchNotifications();
    }

    useEffect(() => {
        // getAllUserFcmToken_url
        const loadData = async () => {
            const response = await axios.get(getAllUserFcmToken_url);
            const {data} = response.data;
            setAllUserToken(data);
            console.log(response);
        }
        loadData();
    }, [setAllUserToken]);

    console.log(allUserToken)

    if (loading) {
        return (
            <SidebarWithHeader>
                <HStack mb={5}>
                    <CreateNewNotificationModal />
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
                    <CreateNewNotificationModal />
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
        <SidebarWithHeader >
            <HStack mb={5}>
                <CreateNewNotificationModal />
                <Button
                    colorScheme="brown"
                    variant="outline"
                    leftIcon={<MdOutlineRefresh />}
                    onClick={handleRefresh}
                >
                    Refresh
                </Button>
            </HStack>
            <NotificationTable notifications={notifications} />
        </SidebarWithHeader>
    );

}

export default NotificationPage;
import React from "react";
import {
    SidebarWithHeader,
    CreateOrderForm
} from '../components';
import { HStack, Button, VStack, Spinner, Heading } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';


function CreateNewOrderPage() {

    return (
        <SidebarWithHeader>
            <CreateOrderForm />
        </SidebarWithHeader>
    )
}

export default CreateNewOrderPage;
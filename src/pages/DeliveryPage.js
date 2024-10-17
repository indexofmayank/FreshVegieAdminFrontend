import React, { useEffect } from "react";
import {
    SidebarWithHeader,
    CreateNewDeliveryInstruction,
    DeliveryInstructionsTable
} from '../components'
import { Button, HStack } from "@chakra-ui/react";
import { MdOutlineRefresh } from 'react-icons/md';
import {useDeliveryInstructionContext} from '../context/deliveryInstruction_context';



function DeliveryPage() {

    return (
        <SidebarWithHeader>
            <DeliveryInstructionsTable />
        </SidebarWithHeader>
    );
}

export default DeliveryPage;
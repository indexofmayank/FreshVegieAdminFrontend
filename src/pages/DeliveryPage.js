import React from "react";
import {
    SidebarWithHeader,
    CreateNewDeliveryInstruction,
    DeliveryInstructionsTable
} from '../components'
import { Button, HStack } from "@chakra-ui/react";
import { MdOutlineRefresh } from 'react-icons/md';


function DeliveryPage() {

    return (
        <SidebarWithHeader>
            {/* <HStack mb={5}>
                <CreateNewDeliveryInstruction />
                <Button
                    colorScheme="brown"
                    variant="outline"
                    leftIcon={<MdOutlineRefresh />}
                >
                    Refresh
                </Button>
            </HStack> */}
            <DeliveryInstructionsTable />
        </SidebarWithHeader>
    );
}

export default DeliveryPage;
import React  from "react";
import {
    SidebarWithHeader,
    CreateAssestModal,
    AssestImageTable
} from '../components';
import {
    HStack,
    Button,
    VStack,
    Spinner,
    Heading
} from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';


function BlukImageUploadPage() {


    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateAssestModal />
                <Button
                    colorScheme="brown"
                    variant="outline"
                    leftIcon={<MdOutlineRefresh />}
                >   
                    Refresh
                </Button>
            </HStack>
            <AssestImageTable />
        </SidebarWithHeader>
    );
}

export default BlukImageUploadPage;
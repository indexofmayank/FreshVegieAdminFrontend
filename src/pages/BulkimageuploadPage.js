import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    Input,
    Button,
    VStack,
    HStack,
    Box,
    Divider,
    Image,
    Text,
    Grid,
    GridItem,
    Heading,
    List,
    ListItem,
    FormControl,
    FormLabel,
    useToast,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    ModalCloseButton,
    Icon,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    toast,
    Checkbox,
} from '@chakra-ui/react';
import {
    SidebarWithHeader,
} from '../components';


function BulkimageuploadPage() {

    return (
        <SidebarWithHeader>
        <VStack spacing={4} align='stretch'>
            <Grid gap={6}>
                <GridItem colSpan={2}>
                    <Heading size="md" mb={4}>
                        Edit order 
                    </Heading>
                   
                </GridItem>
            </Grid>
        </VStack>
    </SidebarWithHeader >
    );
}

export default BulkimageuploadPage;
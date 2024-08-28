import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    Button,
    SimpleGrid,
    Spinner,
    useToast,
    HStack,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    Switch,
    Text
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function NotificationTable() {

    const loading = false;

    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
            {loading ? (
                <HStack my={8} alignItems='center' justifyContent='center'>
                    <Spinner size='lg' color='brown.500' />
                </HStack>

            ) : (
                <Table variant='simple' size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Redirect to</Th>
                            <Th>Audience</Th>
                            <Th>Banner</Th>
                            <Th>Status</Th>
                            <Th>Last live</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                    </Tbody>
                </Table>
            )}
        </SimpleGrid>
    );

}

export default NotificationTable;
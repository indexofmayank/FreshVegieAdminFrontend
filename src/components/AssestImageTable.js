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


function AssestImageTable() {


    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Image</Th>
                        <Th>Name</Th>
                        <Th>Url</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
            </Table>
            <Tbody>
                <Tr>
                    <Td>
                       <Text>maiyank</Text>

                    </Td>
                    <Td>this name</Td>
                    <Td><Text size='lg'>https://res.cloudinary.com/domrtfad0/image/upload/v1724338868/tomper-wear/lf90blsbrihg0icz0usw.jpg</Text></Td>
                </Tr>
            </Tbody>
        </SimpleGrid>
    );
}

export default AssestImageTable;
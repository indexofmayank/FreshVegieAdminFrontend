import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    SimpleGrid,
    Spinner,
    HStack,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    Switch,
    useToast,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useCustomerContext } from '../context/customer_context';

export const UserTable = ({ customers }) => {
    const toast = useToast();
    const { fetchCustomers } = useCustomerContext();
    const [loading, setLoading] = useState(false);

    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
            {loading ? (
                <HStack my={8} alignItems='center' justifyContent='center'>
                    <Spinner size='lg' color='brown.500' />
                </HStack>
            ) : (
                <Table variant='striped' colorScheme='whiteAlpha' size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {customers.map((customer, index) => {
                            const { name, phone, email, status, _id } = customer;
                            return (
                                <Tr key={index}>
                                    <Td>{name}</Td>
                                    <Td>{email}</Td>
                                    <Td>{phone}</Td>
                                    <Td>
                                        <Switch
                                            colorScheme='brown'
                                            isChecked={status}
                                        />
                                    </Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                                                Actions
                                            </MenuButton>
                                            <MenuList>
                                                <Link to={`/users/${_id}`}>
                                                    <MenuItem>View</MenuItem>
                                                </Link>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            )}
        </SimpleGrid>
    );
};

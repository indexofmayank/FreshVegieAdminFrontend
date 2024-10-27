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
import { UpdateNotificationModal } from '../components';

function NotificationTable({ notifications }) {
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
                        {(notifications.length > 0 ?
                        notifications.map((notification, index) => {
                            const {
                                name,
                                redirect_to,
                                audience,
                                banner,
                                status,
                                lastLive,
                                _id
                            } = notification;
                            return (
                                <Tr key={index}>
                                    <Td>{name}</Td>
                                    <Td>{redirect_to}</Td>
                                    <Td>{audience}</Td>
                                    <Td>
                                        <Image
                                            src={banner}
                                            boxSize='50px'
                                            objectFit='content'
                                            borderRadius='lg'
                                        />
                                    </Td>
                                    <Td>
                                        <Switch
                                            colorScheme='green'
                                            isChecked={status}
                                        />
                                    </Td>
                                    <Td>{lastLive}</Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                                                Actions
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem>
                                                    <UpdateNotificationModal id={_id} />
                                                </MenuItem>
                                                <MenuItem>
                                                    Delete
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            );
                        })
                        :<Tr><Td colSpan={6}> No Notification data found</Td></Tr>)}
                    </Tbody>
                </Table>
            )}
        </SimpleGrid>
    );

}

export default NotificationTable;
import React from "react";
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
    Switch
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import {UpdateDeliveryInstruction, DeliveryInstructionsPagination} from '../components';


function DeliveryInstructionsTable({ instructions = [] }) {
    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Distance</Th>
                        <Th>Surge</Th>
                        <Th>Status</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {instructions.map((instruction, index) => {
                        const { name, total_distance, surge, status, _id } = instruction;
                        return (
                            <Tr key={index}>
                                <Td>
                                    {name}
                                </Td>
                                <Td>
                                    {total_distance}
                                </Td>
                                <Td>
                                    {surge}
                                </Td>
                                <Td>
                                    {status}
                                </Td>
                                <Td>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                                            Actions
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>
                                                <UpdateDeliveryInstruction id={_id} />
                                            </MenuItem>
                                            <MenuItem onClick={() => {console.log('clicked')}}>
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>

                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            <DeliveryInstructionsPagination />
        </SimpleGrid>
    );
}

export default DeliveryInstructionsTable;
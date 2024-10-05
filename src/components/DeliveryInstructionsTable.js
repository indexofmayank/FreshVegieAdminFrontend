import React,{useRef} from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    SimpleGrid,
    Spinner,
    useToast,
    HStack,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea,
    Center,
    VStack,
    Checkbox,
    Select,
    Switch
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import {UpdateDeliveryInstruction, DeliveryInstructionsPagination} from '../components';


function DeliveryInstructionsTable({ instructions = [] }) {
    const initialRef = useRef();
    return (
        <SimpleGrid  bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
                        <FormControl mt={4}>
                            <FormLabel>Minimum cart amount</FormLabel>
                            <Input
                                type='number'
                                placeholder='Minimum cart amount'
                                name='minimumcart_amount'
                                focusBorderColor='brown.500'
                                // value={}
                                onChange={() => { }}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Delivery charges</FormLabel>
                            <Input
                                type='number'
                                placeholder='Delivery charges'
                                name='delivery_charges'
                                focusBorderColor='brown.500'
                                // value={}
                                onChange={() => { }}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Initial reward point</FormLabel>
                            <Input
                                ref={initialRef}
                                type='number'
                                placeholder='Initial reward point'
                                name='initial_rewardpoint'
                                focusBorderColor='brown.500'
                                // value={name}
                                onChange={() => { }}
                            />
                        </FormControl>
                        <FormControl mt={6}>
                        <Button mr={3} >
                            Cancel
                        </Button>
                        <Button
                            // isLoading={}
                            // isLoadingText=''
                            colorScheme='brown'
                            // onClick={() => { }}
                        >
                            Save
                        </Button>
                        </FormControl>
            {/* <Table variant='simple'>
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
            <DeliveryInstructionsPagination /> */}
        </SimpleGrid>
    );
}

export default DeliveryInstructionsTable;
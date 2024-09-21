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
    useToast,
    HStack,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    Switch,
    Image
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { UpdateDealOfTheDayModal } from '../components';

function DealOfTheDayTable({ dealOfTheDay }) {
    const deals = dealOfTheDay || [];

    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>

            <Table variant='simple'>
                <Thead>
                    {/* <Tr>
                        <Th>
                            name
                        </Th>
                        <Th>
                            date
                        </Th>
                        <Th>
                            status
                        </Th>
                        <Th>

                        </Th>
                    </Tr> */}
                    <Th>Name</Th>
                    <Th>Image</Th>
                    <Th>

                    </Th>
                </Thead>
                <Tbody>
                    {deals.map((deal, index) => {
                        const { name, image, _id } = deal;
                        return (
                            <Tr key={index}>
                                <Td>{name}</Td>
                                {/* <Td>{timestampFormatted}</Td> */}
                                {/* <Td>
                                    <Switch
                                        isChecked={status}
                                        isReadOnly={true}
                                        colorScheme='brown'
                                    />

                                </Td> */}

                                <Td>
                                    <Image
                                    src={image}
                                    boxSize='100px'
                                    objectFit='cover'
                                    borderRadius='lg'
                                    />
                                </Td>
                                <Td>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                                            Actions
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>
                                                <UpdateDealOfTheDayModal id={_id} name={name} image={image}/>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>

                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>

        </SimpleGrid>

    )
}

export default DealOfTheDayTable;
import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Image,
    Button,
    SimpleGrid,
    Spinner,
    Select,
    useToast,
    HStack,
    Menu,
    MenuItem,
    MenuList,
    MenuButton
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useCategoryContext } from '../context/category_context';
import { UpdateCategoryModal } from '../components';

export const CategoryTable = ({ categories }) => {
    const toast = useToast();
    const { fetchCategory } = useCategoryContext();
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        console.log('did');
    }
    

    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
            {loading ? (
                <HStack my={8} alignItems='center' justifyContent='center'>
                    <Spinner size='lg' color='brown.500' />
                </HStack>
            ) : (
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Image</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.map((category, index) => {
                            const { image, name, id } = category;
                            return (
                                <Tr key={index}>
                                    <Td>{name}</Td>
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
                                                <Link to={`/category/${id}`}>
                                                    <MenuItem>View</MenuItem>
                                                </Link>
                                                <MenuItem>
                                                    <UpdateCategoryModal id={id} />
                                                </MenuItem>
                                                <MenuItem onClick={() => handleDelete(id)}>
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

            )}
        </SimpleGrid>
    );
};
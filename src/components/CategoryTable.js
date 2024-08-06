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
    Switch
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useCategoryContext } from '../context/category_context';
import { UpdateCategoryModal } from '../components';

export const CategoryTable = ({ categories }) => {
    const toast = useToast();
    const { fetchCategory, deleteCategory } = useCategoryContext();
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        setLoading(true);
        const response = await deleteCategory(id);
        console.log(response);
        if (response.success) {
            toast({
                position: 'top',
                description: response.message,
                status: 'success',
                duration: 5000,
                isClosable: true
            });
            await fetchCategory();
        } else {
            toast({
                position: 'top',
                description: response.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        setLoading(false);
    };

    const handleSwitchChange = (id, event) => {
        const newStatus = event.target.checked;
        console.log(`Category ID: ${id}, New Status: ${newStatus}`);
        // You can add more logic here to update the status in the backend or state
    };

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
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th>Status</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.map((category, index) => {
                            const { image, name, id, status } = category;
                            return (
                                <Tr key={index}>
                                    <Td>
                                        <Image
                                            src={image}
                                            boxSize='100px'
                                            objectFit='cover'
                                            borderRadius='lg'
                                        />
                                    </Td>
                                    <Td>{name}</Td>
                                    <Td>
                                        <Switch
                                            colorScheme='green'
                                            isChecked={status}
                                            onChange={(e) => handleSwitchChange(id, e)}
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

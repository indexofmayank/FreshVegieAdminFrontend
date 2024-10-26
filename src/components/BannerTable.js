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
import { useBannerContext } from '../context/banner_context';
import { UpdateBannerModal } from '../components';

function BannerTable({ banners }) {
    const toast = useToast();
    const { fetchBanner, deleteBanner } = useBannerContext();
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        setLoading(true);
        const response = await deleteBanner(id);
        setLoading(false);
        if (response.success) {
            toast({
                position: 'top',
                description: response.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            return await fetchBanner();
        } else {
            return toast({
                position: 'top',
                description: response.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
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
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th>Status</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {banners.map((banner, index) => {
                            const { name, image, status, id } = banner;
                            return (
                                <Tr key={index}>
                                    <Td>
                                        <Image
                                            src={image}
                                            boxSize='60px'
                                            objectFit='content'
                                            borderRadius='lg'
                                        />
                                    </Td>
                                    <Td>{name}</Td>
                                    <Td>
                                        <Switch
                                            isChecked={status}
                                            isReadOnly={true}
                                            colorScheme='brown'
                                        />
                                    </Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                                                Actions
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem>
                                                    <UpdateBannerModal id={id} />
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
}

export default BannerTable;

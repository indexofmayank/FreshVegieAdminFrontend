import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { formatPrice } from '../utils/helpers';
import { useProductContext } from '../context/product_context';
import { Link } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  VStack,
  HStack,
  Spinner,
  Text,
  useToast,
  Switch
} from '@chakra-ui/react';
import UpdateProductModal from './UpdateProductModal';
import FilterComponent from './FilterComponent';
import Pagination from './Pagination';

function ProductsTable({ products, pagination, setPagination }) {
  const toast = useToast();
  const { fetchProducts, deleteProduct } = useProductContext();
  const [loading, setLoading] = useState(false);
  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteProduct(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchProducts();
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
//  console.log(products);

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
              <Th>Category</Th>
              <Th>Stock</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
          {(products.length > 0 ?
            products.map((product, index) => {
              const { image, name, category, stock, price, product_status, _id } =
              product;
              return (
                <Tr key={index}>
                  <Td style={{width:'10%'}}>
                    <Image
                      src={image}
                      boxSize='40px'
                      objectFit='content'
                      borderRadius='sm'
                    />
                  </Td>
                  <Td style={{width:'40%'}}>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{name.substring(0, 50)}</Text>
                      <Text fontSize='sm' color='green.500'>
                        {formatPrice(price)}
                      </Text>
                    </VStack>
                  </Td>
                  {/* <Td>
                    <VStack alignItems='flex-start' spacing={1}>
                      <Text as='b'>{category.toUpperCase()}</Text>
                      <Text fontSize='sm' color='brown.500'>
                        {company}
                      </Text>
                    </VStack>
                  </Td> */}
                  <Td style={{width:'13%'}}>
                    {category}
                  </Td>
                  <Td style={{width:'12%'}}>{stock}</Td>
                  <Td style={{width:'12%'}}>
                    <Switch
                      colorScheme='green'
                      isChecked={product_status}
                    />
                  </Td>
                  <Td style={{width:'13%'}}>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Actions
                      </MenuButton>
                      <MenuList>
                        <Link to={`/products/${_id}`}>
                          <MenuItem>View</MenuItem>
                        </Link>
                        <MenuItem>
                          <UpdateProductModal id={_id} />
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(_id)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>

              );
            })
            : <></>)}
          </Tbody>
        </Table>
      )}
      <Pagination pagination={pagination} setPagination={setPagination}/>
    </SimpleGrid>
  );
}

export default ProductsTable;

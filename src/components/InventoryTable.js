import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import {
  Button, Select, Stack, Table, Thead, Tr, Th, Td, Tbody,
  SimpleGrid, Spinner, HStack, Image, Input, InputGroup, InputLeftAddon
} from '@chakra-ui/react';
import { useInventoryContext } from '../context/inventory_context';

const InventoryTable = ({ products, categories }) => {

  const {fetchInventory} = useInventoryContext();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.categoryId === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const loading = false;

  console.log(filteredProducts);

  return (
    <>
      <Stack spacing={4} direction='row'>
        <SearchBox placeholder="Search for items..." onSearch={handleSearch} width='50%' />
        <Select placeholder='All Categories' onChange={handleCategoryChange}>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </Select>
        <Button  colorScheme="brown"  px={5} size='xl'>Update</Button>
        <Button  colorScheme="brown"  px={5} size='xl'>Bulk Update</Button>
      </Stack>

      <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto' mt={4}>
        {loading ? (
          <HStack my={8} alignItems='center' justifyContent='center'>
            <Spinner size='lg' color='brown.500' />
          </HStack>
        ) : (
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Stock</Th>
                <Th>Stock Notify</Th>
                <Th>Unit/Variant</Th>
                <Th>Price</Th>
                <Th>Selling Price</Th>
                <Th>Stock Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredProducts.map((product, index) => {
                const { image, name, stock, stock_notify, price, offer_price, purchase_price } = product;
                return (
                  <Tr key={index}>
                    <Td>
                      <div>
                        <Image
                          src={image}
                          boxSize='100px'
                          objectFit='cover'
                          borderRadius='lg'
                          size='sm'
                        /><span>{name}</span>
                      </div>
                    </Td>
                    <Td> <Input  value={stock} size='md' width='auto' /></Td>
                    <Td> <Input  value={stock_notify} size='md' width='auto' /></Td>
                    <Td><strong>-</strong></Td>
                    <Td>  <InputGroup>
                            <InputLeftAddon>₹</InputLeftAddon>
                            <Input  value={price} size='md' width='auto' />
                          </InputGroup> </Td>
                    <Td >  <InputGroup>
                            <InputLeftAddon>₹</InputLeftAddon>
                            <Input  value={offer_price} size='md' width='auto' />
                          </InputGroup> </Td>
                    <Td>
                      {
                        !isNaN(purchase_price) && !isNaN(stock) ?
                          (parseFloat(purchase_price) * parseFloat(stock)).toFixed(2) :
                          "Invalid Data"
                      }
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </SimpleGrid>
    </>
  );
};

export default InventoryTable;

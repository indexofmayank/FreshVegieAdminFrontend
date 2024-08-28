import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import {
  Button, Select, Stack, Table, Thead, Tr, Th, Td, Tbody,
  SimpleGrid, Spinner, HStack, Image, Input, InputGroup, InputLeftAddon,
  useToast,
  toast,
  position
} from '@chakra-ui/react';
import { useInventoryContext, fetchProductByNameForInventory} from '../context/inventory_context';
import { SearchBoxForInventory } from '../components/';

const InventoryTable = ({ products, categoriesByName }) => {
  const  categories = categoriesByName?.data;

  const {
    fetchProductByNameForInventory,
    inventoryProductName,
    inventoryProductName_error,
    inventoryProductName_loading
  } = useInventoryContext();

  const { fetchInventory, updateInventory } = useInventoryContext();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [updatedProducts, setUpdatedProducts] = useState({});
  const [bulkUpdateLoading, setBulkUpdateLoading] = useState(null);

  const toast = useToast();

  
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  //for searching, sorting, filterling
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
    fetchProductByNameForInventory();
  }, [searchQuery, selectedCategory, products]);


  //for bulk update
  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedList = [...filteredProducts];
    updatedList[index] = { ...updatedList[index], [field]: value };

    setFilteredProducts(updatedList); 
    setUpdatedProducts((prevState) => {
      const updatedProduct = updatedList[index];
      return {
        ...prevState,
        [updatedProduct._id]: updatedProduct,
      };
    });
  };


  const handleBulkUpdate = async () => {
    const productsToUpdate = Object.values(updatedProducts);
    console.log('Products to be updated:', productsToUpdate);

    if(productsToUpdate.length < 1) {
      return toast({
        position: 'top',
        description: 'Nothing to update',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setBulkUpdateLoading(true);
    const responseCreate = await updateInventory(productsToUpdate);
    setBulkUpdateLoading(false);
    console.log(responseCreate);
    if(responseCreate.success) {
      toast({
        position: 'top',
        description: 'inventory updated',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      await fetchInventory();
    } else {
      return toast({
        position: 'top',
        describe: responseCreate.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    
  };

  const loading = false;
  return (
    <>
      <Stack spacing={4} direction='row'>
      <SearchBoxForInventory 
      placeholder="Search for items..." 
      onSelectProduct={() => {}} 
      initialProductName={inventoryProductName}
       width="50%" 
      />
      <Select placeholder='All Categories' onChange={handleCategoryChange}>
          {categoriesByName?.data?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </Select>
        <Button colorScheme="brown" px={5} 
        size='xl' 
        onClick={handleBulkUpdate} 
        isLoading={bulkUpdateLoading} 
        loadingText='Bluk Updating'
        >
          Bulk Update
        </Button>
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
                    <Td>
                      <Input
                        value={stock}
                        size='md'
                        width='auto'
                        onChange={(e) => handleInputChange(e, index, 'stock')}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={stock_notify}
                        size='md'
                        width='auto'
                        onChange={(e) => handleInputChange(e, index, 'stock_notify')}
                      />
                    </Td>
                    <Td><strong>-</strong></Td>
                    <Td>
                      <InputGroup>
                        <InputLeftAddon>₹</InputLeftAddon>
                        <Input
                          value={price}
                          size='md'
                          width='auto'
                          onChange={(e) => handleInputChange(e, index, 'price')}
                        />
                      </InputGroup>
                    </Td>
                    <Td>
                      <InputGroup>
                        <InputLeftAddon>₹</InputLeftAddon>
                        <Input
                          value={offer_price}
                          size='md'
                          width='auto'
                          onChange={(e) => handleInputChange(e, index, 'offer_price')}
                        />
                      </InputGroup>
                    </Td>
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

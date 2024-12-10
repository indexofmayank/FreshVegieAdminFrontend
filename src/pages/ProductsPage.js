import React, { useState, useEffect } from 'react';
import {
  ProductsTable,
  SidebarWithHeader,
  CreateNewProductModal,
  BlukUploadProduct
} from '../components';
import { HStack, VStack, Spinner, Heading, Button, FormControl, FormLabel, Input, List, ListItem, Box, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useProductContext } from '../context/product_context';
import FilterComponent from '../components/FilterComponent';
import SearchBox from '../components/SearchBox';
import { FaAngleDown, FaArrowUp } from 'react-icons/fa';

function ProductsPage() {
  const {
    products,
    products_loading: loading,
    products_error: error,
    fetchProducts,
    fetchProductByNameForSearch
  } = useProductContext();


  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [productlist, setProductlist] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPage: 0,
    totalItems: 0,
  })

  useEffect(() => {
    setPagination({
      limit: products.limit || 10,
      page: products.page || 1,
      totalPage: products.totalPage || 0,
      totalItems: products.totalProducts || 0,
    });

  }, [products]);

  useEffect(() => {
    if (products.data) {
      setProductlist(products.data)
    }
}, [products]);

  // useEffect(() => {
  //   fetchProducts(pagination.page, pagination.limit);
  // }, [pagination.page, pagination.limit]);

    useEffect(() => {
       fetchProducts();
  }, []);
 

  useEffect(() => {
    // console.log(suggestionList);
    if(suggestionList.length>0){
      setProductlist(suggestionList);
    }
   
  }, [suggestionList]);

console.log(products);
// console.log(productlist);

  const handleRefresh = async () => {
    await fetchProducts(pagination.page, pagination.limit);
  };


  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewProductModal />
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
          <CreateNewProductModal />
          <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<MdOutlineRefresh />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </HStack>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }
  // console.log(products); 
  return (
    <SidebarWithHeader>
      <HStack mb={5} spacing={4}>
        <CreateNewProductModal />
        <BlukUploadProduct />
        <Button
          colorScheme='brown'
          variant='outline'
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
          // spacing={4}
        >
          Refresh
        </Button>
        
        <FormControl mt={4} >
          <InputGroup>
          <Input
            placeholder='Search for product'
            name='Search Query'
            focusBorderColor='brown.500'
            value={searchQuery}
            onChange={async (event) => {
              setSearchQuery(event.target.value);
              const response = await fetchProductByNameForSearch(event.target.value);
              const { data } = response;
              setSuggestionList(data);
            }}
          />
          <InputRightElement>
            <IconButton
                aria-label='Open dropdown'
                // icon={isCategoryDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                size='sm'
                variant='ghost'
                onClick={() => {console.log('clicked')}}
            />
          </InputRightElement>
          {isDropdownOpen && (
            <Box
            maxHeight="200px"
            overflowY="auto"
            borderWidth="1px"
            borderRadius="md"
            mt="2"
            zIndex="10"
            bg="white"
            position="absolute"
            width="100%"
            >

            </Box>
          )}
          </InputGroup>
        </FormControl>
      </HStack>

      <ProductsTable
        products={productlist}
        pagination={pagination}
        setPagination={setPagination}
      />
    </SidebarWithHeader>
  );
}

export default ProductsPage;

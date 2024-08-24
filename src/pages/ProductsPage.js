import React, {useState, useEffect} from 'react';
import {
  ProductsTable,
  SidebarWithHeader,
  CreateNewProductModal,
} from '../components';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useProductContext } from '../context/product_context';
import FilterComponent from '../components/FilterComponent';
import SearchBox from '../components/SearchBox';

function ProductsPage() {
  const {
    products,
    products_loading: loading,
    products_error: error,
    fetchProducts,
  } = useProductContext();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalPage: 0,
    totalItems: 0,
    })

  useEffect(() => {
    setPagination({
      limit: products.limit || 5,
      page: products.page || 1,
      totalPage: products.totalPage || 0,
      totalItems: products.totalProducts || 0,
    });
  }, [ ]);

  useEffect(() => {
    fetchProducts(pagination.page, pagination.limit);
  }, []);



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
  console.log(products);
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
      <HStack>
      <SearchBox />
      <FilterComponent />
      </HStack>
      <ProductsTable 
        products={products.data} 
        pagination={pagination} 
        setPagination={setPagination}
      />
    </SidebarWithHeader>
  );
}

export default ProductsPage;

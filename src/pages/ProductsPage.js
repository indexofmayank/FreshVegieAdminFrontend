import React, {useState, useEffect} from 'react';
import {
  ProductsTable,
  SidebarWithHeader,
  CreateNewProductModal,
} from '../components';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useProductContext } from '../context/product_context';

function ProductsPage() {
  const {
    products,
    products_loading: loading,
    products_error: error,
    fetchProducts,
  } = useProductContext();

  const [pagination, setPagination] = useState({
    page: '',
    limit: 10,
    totalPage: '',
    totalProducts: '',
  })

  useEffect(() => {
    setPagination({
      limit: products.limit,
      page: products.page,
      totalPage: products.totalPage,
      totalProducts: products.totalProducts
    });
  }, [setPagination, products]);


  const handleRefresh = async () => {
    await fetchProducts();
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
      <ProductsTable 
        products={products.data} 
        pagination={pagination} 
        setPagination={setPagination}
      />
    </SidebarWithHeader>
  );
}

export default ProductsPage;

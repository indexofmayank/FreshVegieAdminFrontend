import React from "react";
import { InventoryTable, SidebarWithHeader } from "../components";
import { HStack, VStack, Spinner, Heading, Button } from "@chakra-ui/react";
import { MdOutlineRefresh } from 'react-icons/md';
import { useProductContext } from '../context/product_context';
import {useCategoryContext} from '../context/category_context';


function InventoryPage() {

  const {
    categories,
    fetchCategory
  } = useCategoryContext();

  const {
    products,
    products_loading: loading,
    products_error: error,
    fetchProducts
  } = useProductContext();

  const handleRefresh = async () => {
    await fetchProducts();
    await fetchCategory();
  };
  if (loading) {
    return (
      <SidebarWithHeader>
        <HStack mb={5}>
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

  return (
    <SidebarWithHeader>
      <HStack mb={3}>
        <Button
          colorScheme="brown"
          variant="outline"
          leftIcon={<MdOutlineRefresh />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </HStack>
      <InventoryTable products={products} categories={categories} />
    </SidebarWithHeader>
  )
}

export default InventoryPage;
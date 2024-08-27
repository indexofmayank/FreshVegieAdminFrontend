import React, {useEffect} from "react";
import { InventoryTable, SidebarWithHeader } from "../components";
import { HStack, VStack, Spinner, Heading, Button } from "@chakra-ui/react";
import { MdOutlineRefresh } from 'react-icons/md';
import { useProductContext } from '../context/product_context';
import {useCategoryContext} from '../context/category_context';
import { useInventoryContext } from "../context/inventory_context";


function InventoryPage() {

  const {
    categoriesByName,
    fetchCategoryByName
  } = useCategoryContext();
  
  const {
    inventory_loading: loading,
    inventory_error: error,
    inventory,
    fetchInventory
  } = useInventoryContext();
  
  useEffect(() => {
    const callAsyncCategories = async () => {
      await fetchCategoryByName();
    }
    callAsyncCategories();
  }, []);

  const handleRefresh = async () => {
    await fetchInventory();
    await fetchCategoryByName();
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
      <InventoryTable products={inventory} categoriesByName={categoriesByName} />
    </SidebarWithHeader>
  )
}

export default InventoryPage;
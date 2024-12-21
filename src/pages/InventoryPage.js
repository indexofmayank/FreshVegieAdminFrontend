import React, { useEffect, useState } from "react";
import { InventoryTable, SidebarWithHeader } from "../components";
import { HStack, VStack, Spinner, Heading, Button } from "@chakra-ui/react";
import { MdOutlineRefresh } from 'react-icons/md';
import { useProductContext } from '../context/product_context';
import { useCategoryContext } from '../context/category_context';
import { useInventoryContext } from "../context/inventory_context";
import axios from 'axios';
import { getproductinventoryCsvDownload_url } from '../utils/constants';
import { FaDownload } from 'react-icons/fa';

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
  // console.log(inventory);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPage: 0,
    totalItems: 0
  });

  useEffect(() => {
    const callAsyncCategories = async () => {
      await fetchCategoryByName(pagination.page, pagination.limit);
    }
    callAsyncCategories();
  }, []);

  useEffect(() => {
    setPagination({
      limit: inventory.limit || 5,
      page: inventory.page || 1,
      totalPage: inventory.totalPages || 0,
      totalItems: inventory.totalProducts || 0,
    });
  }, []);

  useEffect(() => {
    fetchInventory(pagination.page, pagination.limit, '', '');
  }, []);


  const handleRefresh = async () => {
    await fetchInventory();
    await fetchCategoryByName();
  };

  const handleDownload = async () => {
    // console.log(selectedDate);
      try {
        const response = await axios.get(`${getproductinventoryCsvDownload_url}`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'inventory.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
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
        <Button
            colorScheme='brown'
            variant='outline'
            leftIcon={<FaDownload />}
            onClick={handleDownload}
            spacing={4}
            px={4}
            style={{padding:'20px 30px'}}
           >
            Download inventory
        </Button>
      </HStack>
      <InventoryTable
        inventory={inventory}
        categoriesByName={categoriesByName}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        pagination={pagination}
        setPagination={setPagination}
      />
    </SidebarWithHeader>
  )
}

export default InventoryPage;
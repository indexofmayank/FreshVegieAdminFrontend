import React, { useEffect, useState } from "react";
import { SidebarWithHeader } from '../components';
import { HStack, Button, VStack, Spinner, Text } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import CreateNewCategoryModal from "../components/CreateNewCategoryModal";
import { useCategoryContext } from '../context/category_context';
import { CategoryTable } from '../components/CategoryTable';
import axios from 'axios';
import { getcategoryCsvDownload_url } from '../utils/constants';
import { FaDownload } from 'react-icons/fa';
function CategoryPage() {
    const {
        categories,
        category_loading: loading,
        category_error: error,
        fetchCategory,
        createNewCategory,
        updateNewCategoryDetails
    } = useCategoryContext();
    const [categoriesData, setCategoriesData] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPage: 0,
        totalItems: 0
    });

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            limit: categories.limit || 10,
            page: categories.page || 1,
            totalPage: categories.totalPage || 0,
            totalItems: categories.totalCategories || 0,
        }));
    }, [categories]);

    useEffect(() => {
        fetchCategory(pagination.page, pagination.limit);
    }, [pagination.page, pagination.limit]);

    const handleRefresh = async () => {
        await fetchCategory(pagination.page, pagination.limit);
    }

    const handleDownload = async () => {
        // console.log(selectedDate);
          try {
            const response = await axios.get(`${getcategoryCsvDownload_url}`, {
              responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'category.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
          } catch (error) {
            console.error('Error downloading the file:', error);
          }
      
        
    
      };

    useEffect(() => {
        if (categories.data) {
            setCategoriesData(categories.data);
        }
    }, [categories]);

    const renderContent = () => {
        if (loading) {
            return <Spinner size='lg' color='brown.500' />;
        }
        
        if (error) {
            return <Text color="red.500">Failed to load categories. Please try again.</Text>;
        }

        return (
            <CategoryTable
                categories={categoriesData}
                pagination={pagination}
                setPagination={setPagination}
            />
        );
    };

    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateNewCategoryModal />
                <Button
                    colorScheme='brown'
                    variant='outline'
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
                >
                    Download Category
                </Button>
            </HStack>
            {/* <VStack alignItems='center' justifyContent='center'> */}
                {renderContent()}
            {/* </VStack> */}
        </SidebarWithHeader>
    );
}

export default CategoryPage;

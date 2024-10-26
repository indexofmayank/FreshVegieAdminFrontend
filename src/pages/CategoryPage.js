import React, {useEffect, useState} from "react";
import {
    SidebarWithHeader
} from '../components';
import { HStack, Button, VStack, Spinner, Heading } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import CreateNewCategoryModal from "../components/CreateNewCategoryModal";
import { useCategoryContext } from '../context/category_context';
import { CategoryTable } from '../components/CategoryTable';

function CategoryPage() {
    const {
        categories,
        category_loading: loading,
        category_error: error,
        fetchCategory,
        createNewCategory,
        updateNewCategoryDetails
    } = useCategoryContext();

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        totalPage: 0,
        totalItems: 0
    });

    useEffect(() => {
        setPagination({
            limit: categories.limit || 5,
            page: categories.page || 1,
            totalPage: categories.totalPage || 0,
            totalItems: categories.totalCategories || 0,
        });
    }, [ ]);

    useEffect(() => {
        fetchCategory(pagination.page, pagination.limit);
    }, []);

    const handleRefresh = async () => {
        await fetchCategory();
    }

    // console.log(categories);

    if (loading) {
        return (
            <SidebarWithHeader>
                <HStack mb={5}>
                    <CreateNewCategoryModal />
                    <Button
                        colorScheme="brown"
                        variant="outline"
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
        )
    }

    if (error) {
        return (
            <SidebarWithHeader>
                <HStack mb={5}>
                    <CreateNewCategoryModal />
                    <Button
                        colorScheme="brown"
                        variant="outline"
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
        )
    }

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
            </HStack>
            <CategoryTable 
            categories={categories.data}
            pagination={pagination}
            setPagination={setPagination}
            />
        </SidebarWithHeader>
    )
}

export default CategoryPage;
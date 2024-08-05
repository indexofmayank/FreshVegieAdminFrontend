import React from "react";
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

    const handleRefresh = async () => {
        await fetchCategory();
    }

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
            <CategoryTable categories={categories} />
        </SidebarWithHeader>
    )
}

export default CategoryPage;
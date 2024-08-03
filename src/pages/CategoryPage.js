import React from "react";
import {
    SidebarWithHeader
} from '../components';
import { HStack, Button, VStack, Spinner, Heading } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import CreateNewCategoryModal from "../components/CreateNewCategoryModal";
import {useCategoryContext} from '../context/category_context';
import {CategoryTable} from '../components/CategoryTable';

function CategoryPage() {
    const {
        categories,
        fetchCategory
    } = useCategoryContext()
    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateNewCategoryModal />
                <Button
                    colorScheme='brown'
                    variant='outline'
                    leftIcon={<MdOutlineRefresh />}
                    onClick={() => {}}
                >
                    Refresh
                </Button>
            </HStack>
            <CategoryTable categories = {categories} />
        </SidebarWithHeader>
    )
}

export default CategoryPage;
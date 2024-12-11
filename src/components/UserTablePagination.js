import React from "react";
import {Box, Button, Flex, Select, Text} from '@chakra-ui/react';
import {useCustomerContext} from '../context/customer_context';

function UserTablePagination({pagination, setPagination}) {

    const {fetchCustomers} = useCustomerContext();

    const handleLimitChange = (event) => {
        const newLimit = Number(event.target.value);
        setPagination((prev) => {
            const updateState = {...prev, limit: newLimit, page: 1}
             fetchCustomers(updateState.page, updateState.limit);
            return updateState
        });
    }

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({...prev, page: newPage}));
        fetchCustomers(newPage, pagination.limit);
    }


    return (
        <Flex justifyContent='space-between' alignItems='center' mt={4}>
            <Button
                variant="link"
                colorScheme="blue"
                disabled={pagination.page === 1}
                onClick={() => {handlePageChange(pagination.page - 1)}}
            >
                Previous
            </Button>
            <Box>
                <Text fontSize='sm' color='gray.600' mb={2}>
                    Showing results with limit:
                </Text>
                <Select
                    value={pagination.limit}
                    onChange={handleLimitChange}
                    size="sm"
                    width="120px"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>

                </Select>
                <Text fontSize='sm' color='gray.600' mt={2}>
                    Total items: {pagination.totalItems }
                </Text>
            </Box>
            <Button
                variant="link"
                colorScheme="blue"
                disabled={pagination.page === pagination.totalPage}
                onClick={() => {handlePageChange(pagination.page + 1)}}
            >
                Next
            </Button>
        </Flex>
    );
}

export default UserTablePagination;
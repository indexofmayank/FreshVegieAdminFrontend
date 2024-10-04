import React, { useState, useEffect, useCallback } from 'react';
import { Flex, Button, Box, Select, Text, defaultStandaloneParam } from '@chakra-ui/react';
import {useInventoryContext} from '../context/inventory_context';


const DeliveryInstructionsPagination = ({pagination, setPagination, totalInstructions}) => {

    // const handleLimitChange = (event) => {
    //     const newLimit = Number(event.target.value);
    //     setPagination((prev) => {
    //         const updatedState = {...prev, limit: newLimit, page: 1}
    //         //will call here
    //         return updatedState
    //     });
    // }

    // const handlePageChange = (newPage) => {
    //     setPagination((prev) => ({...prev, page: newPage}));
    //     //will call here too
    // }

    return (
        <Flex justifyContent="space-between" alignItems="center" mt={4}>
            <Button
                variant='link'
                colorScheme='blue'
                // disabled={pagination.page === 1}
                // onClick={() => {handlePageChange(pagination.page - 1)}}
            >
                Previous
            </Button>
            <Box>
            <Text fontSize="sm" color="gray.600" mb={2}>
                    Showing results with limit:
                </Text>
                <Select
                    // value={pagination.limit}
                    // onChange={handleLimitChange}
                    size="sm"
                    width="120px"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </Select>
                <Text fontSize="sm" color="gray.600" mt={2}>
                    {/* Total items: {totalInstructions} */}
                    Total items: 

                </Text>
            </Box>
            <Button
                variant='link'
                colorScheme='blue'
                // disabled={pagination.page === pagination.totalPage}
                // onClick={() => handlePageChange(pagination.page + 1)}
            >
                Next
            </Button>
        </Flex>
    );
}

export default DeliveryInstructionsPagination;
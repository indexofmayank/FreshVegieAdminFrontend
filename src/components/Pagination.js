import React, {useState, useEffect, useCallback} from 'react';
import { Flex, Button, Box, Select, Text } from '@chakra-ui/react';
import { useProductContext } from '../context/product_context';


const Pagination = ({ pagination, setPagination }) => {
  const { fetchProducts } = useProductContext();

  
  

  // console.log(pagination);
  const handleLimitChange = (event) => {
    const newLimit = Number(event.target.value);
    setPagination((prev) => {
      const updatedState = { ...prev, limit: newLimit, page: 1 };
      fetchProducts(updatedState.page, updatedState.limit);
      return updatedState;
    });
  };
  
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    fetchProducts(newPage, pagination.limit); // Fetch products after setting the new page.
  };
  
  return (
    <Flex justifyContent="space-between" alignItems="center" mt={4}>
      <Button
        variant="link"
        colorScheme="blue"
        disabled={pagination.page === 1}
        onClick={() => handlePageChange(pagination.page - 1)}
      >
        Previous
      </Button>
      <Box>
        <Text fontSize="sm" color="gray.600" mb={2}>
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
        <Text fontSize="sm" color="gray.600" mt={2}>
         Total items: {pagination.totalItems}
        </Text>
      </Box>
      <Button
        variant="link"
        colorScheme="blue"
        disabled={pagination.page === pagination.totalPage}
        onClick={() => handlePageChange(pagination.page + 1)}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
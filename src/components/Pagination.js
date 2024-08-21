import React, {useState, useEffect} from 'react';
import { Flex, Button, Box, Select, Text } from '@chakra-ui/react';
import { useProductContext } from '../context/product_context';


const Pagination = ({ pagination, setPagination }) => {
  const { fetchProducts } = useProductContext();

  // Update page and fetch new products when page or limit changes
  // useEffect(() => {
  //   fetchProducts(pagination.page, pagination.limit);
  // }, [pagination.page, pagination.limit]);

  const handleLimitChange = (event) => {
    setPagination((prev) => ({
      ...prev,
      limit: Number(event.target.value),
      page: 1, // Reset to page 1 when the limit changes
    }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
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
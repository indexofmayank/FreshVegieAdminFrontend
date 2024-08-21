import React, { useState } from "react";
import { Box, Flex, Button, Text, Select } from "@chakra-ui/react";
import { useProductContext } from '../context/product_context';


const Pagination = ({Pagination}) => {
  const {fetchProducts} = useProductContext();
  const [newlimit, setNewLimit] = useState(10); 
  console.log(Pagination);
  

  const handleLimitChange = (event) => {
    setNewLimit(Number(event.target.value));
  };

  // const handlePageChange = (newPage) => {
  //   fetchProducts(newPage, limit);
  // };

  return (
    <Flex justifyContent="space-between" alignItems="center" mt={4}>
      <Button 
      variant="link" 
      colorScheme="blue" 
      // disabled={pageNumber === 1}
      // onClick={() => handlePageChange(pageNumber - 1)}
      >
      Previous
      </Button>
      <Box>
        <Text fontSize="sm" color="gray.600" mb={2}>
          Showing results with limit:
        </Text>
        <Select
          // value={limit}
          // onChange={handleLimitChange}
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
      // disabled={pageNumber === totalPages}
      // onClick={() => handlePageChange(pageNumber + 1) }
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;

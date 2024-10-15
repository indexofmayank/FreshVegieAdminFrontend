import React, { useState, useEffect } from 'react';
import { formatPrice, getOrderStatusColor, FormattedDate } from '../utils/helpers';
import { BiChevronDown } from 'react-icons/bi';
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  SimpleGrid,
  VStack,
  Spinner,
  HStack,
  useToast,
  Flex,
  Box,
  Text,
  Select,
  Icon
} from '@chakra-ui/react';
import { useOrderContext } from '../context/order_context';
import { useHistory } from 'react-router-dom'; // Import useHistory

function OrdersTable({ orders, totalItem, page, totalPage, limit, itemFetchFunction, label }) {
  const toast = useToast();
  const history = useHistory(); // Initialize history object
  const { currentUser } = useUserContext();
  const { fetchOrders, deleteOrder } = useOrderContext();
  const [loading, setLoading] = useState(false);
  const [paginationLimit, setPaginationLimit] = useState(limit);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteOrder(id);
    setLoading(false);
    if (response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchOrders();
    } else {
      return toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };



  return (
    <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
      {loading ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </HStack>
      ) : (
        <Table variant='striped' colorScheme='whiteAlpha' size='sm'>
          <Thead>
            <Tr>
              <Th>Order No</Th>
              <Th>Date</Th>
              <Th>Customer</Th>
              <Th>Items</Th>
              <Th>Weight</Th>
              <Th>Locations</Th>
              <Th>Payment</Th>
              <Th>Status</Th>
              <Th>Amount</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, index) => {
              const {
                order_no,
                timestampFormatted,
                customerName,
                orderItemsCount,
                totalQuantity,
                location,
                paymentType,
                status,
                amount,
                _id: id,
              } = order;
              return (
                <Tr key={index} onClick={() => {
                  history.push(`/orders/${id}`);
                }}>
                  <Td>{order_no}</Td>
                  <Td>{timestampFormatted}</Td>
                  <Td>{customerName}</Td>
                  <Td>
                    {orderItemsCount}
                  </Td>

                  <Td>{totalQuantity}</Td>
                  <Td>{location}</Td>
                  <Td color='green.500'>
                    <Badge colorScheme='green'>{paymentType}</Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={getOrderStatusColor(status)}>
                      {status}
                    </Badge>
                  </Td>
                  <Td>{amount}</Td>
                  <Td>
                    {/* <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Actions
                      </MenuButton>
                      <MenuList>
                        <Link to={`/orders/${id}`}>
                          <MenuItem>View</MenuItem>
                        </Link>
                      </MenuList>
                    </Menu> */}
                    <Box
                      as="button"
                      _hover={{ color: 'teal.500', transform: 'scale(1.2)' }}
                      transition="all 0.3s"
                      aria-label="Settings"
                    >
                      <Icon as={FaRegEdit} boxSize={5} />
                    </Box>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Button
          variant='link'
          colorScheme='blue'
          disabled={page === 1}
          onClick={async () => { await itemFetchFunction(page - 1, '', '', label) }}
        >
          Previous
        </Button>
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>
            Showing results with limit: {paginationLimit}
          </Text>
          <Select
            value={paginationLimit}
            onChange={async (e) => {
              const value = e.target.value;
              setPaginationLimit(value);
              await itemFetchFunction('', value, '', label);
            }}
            size="sm"
            width="120px"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Select>
          <Text fontSize="sm" color="gray.600" mt={2}>
            Total items: {totalItem}
          </Text>
        </Box>
        <Button
          variant='link'
          colorScheme='blue'
          disabled={page === totalPage}
          onClick={async () => { await itemFetchFunction(page + 1, '', '', label) }}
        >
          Next
        </Button>
      </Flex>

    </SimpleGrid>
  );
}

export default OrdersTable;

import React, { useState } from 'react';
import { formatPrice, getOrderStatusColor, FormattedDate } from '../utils/helpers';
import { BiChevronDown } from 'react-icons/bi';
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
  Text,
  Spinner,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useOrderContext } from '../context/order_context';
function OrdersTable({ orders }) {
  const toast = useToast();
  const { currentUser } = useUserContext();
  const { fetchOrders, deleteOrder } = useOrderContext();
  const [loading, setLoading] = useState(false);

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
                orderId,
                timestampFormatted,
                user,
                totalItems,
                weight,
                location,
                payment_status,
                order_status,
                grand_total,
                _id: id,
              } = order;
              return (
                <Tr key={index}>
                  <Td>{orderId}</Td>
                  <Td>{timestampFormatted}</Td>
                  <Td>{user}</Td>
                  <Td>
                    {totalItems}
                  </Td>

                  <Td>{weight}</Td>
                  <Td>{location}</Td>
                  <Td color='green.500'>
                    <Badge colorScheme='green'>{payment_status}</Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={getOrderStatusColor(order_status)}>
                      {order_status}
                    </Badge>
                  </Td>
                  <Td>{grand_total}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Actions
                      </MenuButton>
                      <MenuList>
                        <Link to={`/orders/${id}`}>
                          <MenuItem>View</MenuItem>
                        </Link>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </SimpleGrid>
  );
}

export default OrdersTable;

import React, { useState, useEffect } from 'react';
import {
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Box,
  Tag,
} from '@chakra-ui/react';
import { formatPrice } from '../utils/helpers';
import { useAdminContext } from '../context/admin_context';
import { useProductContext } from '../context/product_context';
import { Stars } from '.';
import { useOrderContext } from '../context/order_context';

function SingleProductInfo({ product }) {
  const { admins } = useAdminContext();
  const { orders } = useOrderContext();
  const { single_product_loading: loading } = useProductContext();
  const [createdBy, setCreatedBy] = useState('');
  const [unitSold, setUnitSold] = useState(0);
  const {
    _id: id = '',
    name = '',
    category = '',
    add_ons = '',
    search_tags = '',
    selling_method = '',
    description = '',
    price = 0,
    offer_price = 0,
    images = [],
    sku = '',
    barcode = '',
    stock = '',
    stock_notify = '',
    tax = '',
    product_detail_min = '',
    product_detail_max = '',
    admin,
    featured,
    shipping,
    createdAt,
  } = product;

  useEffect(() => {
    // finding the admin from ID
    const createdBy = admins.find((x) => x.id === admin);
    if (createdBy) {
      setCreatedBy(createdBy.name);
    } else {
      setCreatedBy('No Details');
    }

    // creating new array having this product as the only orderItem
    const productOrders = orders.reduce((arr, order) => {
      const item = order.orderItems.find((x) => x.product === id);
      if (item) {
        arr.push(item);
      }
      return arr;
    }, []);

    // calculating total units sold
    const total = productOrders.reduce((total, order) => {
      const { quantity } = order;
      total += quantity;
      return total;
    }, 0);

    setUnitSold(total);
    // eslint-disable-next-line
  }, [loading]);

  return (
    <VStack>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Category</Td>
            <Td>{category}</Td>
          </Tr>
          <Tr>
            <Td>Price</Td>
            <Td>{formatPrice(price)}</Td>
          </Tr>
          <Tr>
            <Td>Offer Price</Td>
            <Td>{formatPrice(offer_price)}</Td>
          </Tr>
          <Tr>
            <Td>Description</Td>
            <Td>{description}</Td>
          </Tr>
          <Tr>
            <Td>Stock</Td>
            <Td>{stock}</Td>
          </Tr>
          <Tr>
            <Td>Add ons</Td>
            <Td>{add_ons}</Td>
          </Tr>
          <Tr>
            <Td>Search Tags</Td>
            <Td>{search_tags}</Td>
          </Tr>
         
          <Tr>
            <Td>Selling Method</Td>
            <Td>{selling_method}</Td>
          </Tr>
          <Tr>
            <Td>Category</Td>
            <Td>{category}</Td>
          </Tr>
          <Tr>
            <Td>Sku</Td>
            <Td>{sku}</Td>
          </Tr>
          <Tr>
            <Td>Barcode</Td>
            <Td>{barcode}</Td>
          </Tr>
          <Tr>
            <Td>Stock Notify</Td>
            <Td>{stock_notify}</Td>
          </Tr>
          <Tr>
            <Td>Tax</Td>
            <Td>{tax}</Td>
          </Tr>
          <Tr>
            <Td>Product detail max</Td>
            <Td>{product_detail_max}</Td>
          </Tr>
          <Tr>
            <Td>Product detail min</Td>
            <Td>{product_detail_min}</Td>
          </Tr>
          <Tr>
            <Td>Shipping</Td>
            <Td>{shipping ? formatPrice(55000) : formatPrice(0)}</Td>
          </Tr>
          <Tr>
            <Td>Featured</Td>
            <Td>{featured ? 'Yes' : 'No'}</Td>
          </Tr>
          <Tr>
            <Td>Created by</Td>
            <Td>{createdBy}</Td>
          </Tr>
          <Tr>
            <Td>Created at</Td>
            <Td>
              {new Date(createdAt).toDateString()},{' '}
              {new Date(createdAt).toLocaleTimeString('en-IN')}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
}

export default SingleProductInfo;

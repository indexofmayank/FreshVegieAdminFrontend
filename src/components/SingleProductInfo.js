import React, { useEffect } from 'react';
import { Box, Image, Text, Flex, Stack, Button, Heading, Divider, Grid, GridItem, Switch, FormControl, FormLabel, Spinner } from '@chakra-ui/react';
import { useProductContext } from '../context/product_context';


const ProductDetailPage = ({ single_product }) => {
  const product = single_product || {
    name: 'Loading...',
    product_status: false,
    category: { name: 'Loading...' },
    add_ons: 'Loading...',
    search_tags: 'Loading...',
    selling_method: 'Loading...',
    description: 'Loading...',
    price: 0,
    offer_price: 0,
    purchase_price: 0,
    images: [{ secure_url: 'https://via.placeholder.com/300', public_id: 'placeholder-image' }],
    sku: 'Loading...',
    barcode: 'Loading...',
    featured: '',
    stock: 0,
    stock_notify: 0,
    tax: 0,
    product_detail_min: 0,
    product_detail_max: 0,
  };

  useEffect(() => {
    if (!single_product) {
      console.log("No product data received yet.");
    }
  }, [single_product]);

  if (!single_product) {
    // Optionally show a loading spinner if data is still being fetched.
    return <Spinner size="xl" />;
  }

  return (
    <Box maxW="container.lg" mx="auto" p={5}>
      <Heading as="h1" size="xl" mb={6}>
        Product Details (Admin View)
      </Heading>
      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        {/* Product Image */}
        <Box flex="1">
          <Image src={product.images} alt={product.name} borderRadius="md" />
        </Box>

        {/* Product Information */}
        <Box flex="2">
          <Stack spacing={4}>
            <Heading as="h2" size="lg">
              {product.name}
            </Heading>

            {/* Product Status */}
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="product-status" mb="0">
                Product Status:
              </FormLabel>
              <Switch id="product-status" isChecked={product.product_status} colorScheme='green' />
            </FormControl>

            {/* Category, Add-ons, Search Tags */}
            <Text fontSize="md"><strong>Category:</strong> {product.category}</Text>
            <Text fontSize="md"><strong>Add-ons:</strong> {product.add_ons}</Text>
            <Text fontSize="md"><strong>Search Tags:</strong> {product.search_tags}</Text>
            <Text fontSize="md"><strong>Selling Method:</strong> {product.selling_method}</Text>

            {/* Description */}
            <Text fontSize="md"><strong>Description:</strong> {product.description}</Text>

            {/* Pricing */}
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem>
                <Text fontSize="md"><strong>Price:</strong> ₹{product.price}</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="md" color="gray.500" textDecoration="line-through"><strong>Offer Price:</strong> ₹{product.offer_price}</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="md"><strong>Purchase Price:</strong> ₹{product.purchase_price}</Text>
              </GridItem>
            </Grid>

            {/* SKU, Barcode, Stock */}
            <Text fontSize="md"><strong>SKU:</strong> {product.sku}</Text>
            <Text fontSize="md"><strong>Barcode:</strong> {product.barcode}</Text>
            <Text fontSize="md"><strong>Stock:</strong> {product.stock}</Text>
            <Text fontSize="md"><strong>Stock Notify:</strong> Notify at {product.stock_notify} units</Text>

            {/* Tax, Product Details */}
            <Text fontSize="md"><strong>Tax:</strong> {product.tax}%</Text>
            <Text fontSize="md"><strong>Product Detail Range:</strong> {product.product_detail_min} - {product.product_detail_max}</Text>

            {/* Action Buttons */}
          </Stack>
        </Box>
      </Flex>

      {/* Divider and Additional Info */}
      <Divider my={8} />

      <Box>
        <Heading as="h3" size="md" mb={4}>Additional Product Info</Heading>
        <Text fontSize="md"><strong>Featured: </strong> <i>{product.featured ? 'Yes' : 'No'}</i> </Text>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;

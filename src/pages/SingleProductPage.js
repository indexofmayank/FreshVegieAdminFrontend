import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SidebarWithHeader,
  ImagesList,
  SingleProductInfo,
  SingleProductReviews,
} from '../components';
import { useProductContext } from '../context/product_context';
import { VStack, Heading, Spinner, Stack } from '@chakra-ui/react';

function SingleProductPage() {
  const { id } = useParams();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product,
    fetchSingleProduct,
  } = useProductContext();

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  if (loading) {
    return (
      <SidebarWithHeader>
        <VStack alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      </SidebarWithHeader>
    );
  }

  if (error) {
    return (
      <SidebarWithHeader>
        <VStack alignItems='center' justifyContent='center'>
          <Heading color='red.500'>There was an error</Heading>
        </VStack>
      </SidebarWithHeader>
    );
  }


  console.log(single_product[0])
  return (
    <SidebarWithHeader>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing='8'
        alignItems='flex-start'
        bg='white'
        p='8'
        mb={4}
        borderRadius='lg'
        shadow='sm'
        overflowX='auto'
      >
        <SingleProductInfo single_product={single_product[0]}/>
      </Stack>
    </SidebarWithHeader>
  );
}

export default SingleProductPage;
  
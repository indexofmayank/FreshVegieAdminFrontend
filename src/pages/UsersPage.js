import React from 'react'
import {
    SidebarWithHeader
} from '../components';
import { HStack, Button, VStack, Spinner, Heading } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import {useCustomerContext} from '../context/customer_context';
import { UserTable } from '../components/UserTable';

function UsersPage () {

    const {
        customers,
        customer_loading: loading,
        customer_error: error,
        fetchCustomers,
    } = useCustomerContext();

    const handleRefresh = async () => {
        await fetchCustomers();
    };

    if (loading) {
        return (
          <SidebarWithHeader>
            <HStack mb={5}>
              <Button
                colorScheme='brown'
                variant='outline'
                leftIcon={<MdOutlineRefresh />}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </HStack>
            <VStack alignItems='center' justifyContent='center'>
              <Spinner size='lg' color='brown.500' />
            </VStack>
          </SidebarWithHeader>
        );
      }

      if (error) {
        return (
          <SidebarWithHeader>
            <HStack mb={5}>
              <Button
                colorScheme='brown'
                variant='outline'
                leftIcon={<MdOutlineRefresh />}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </HStack>
            <VStack alignItems='center' justifyContent='center'>
              <Heading color='red.500'>There was an error</Heading>
            </VStack>
          </SidebarWithHeader>
        );
      }

    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <Button
                    colorScheme='brown'
                    variant='outline'
                    leftIcon={<MdOutlineRefresh />}
                    onClick={handleRefresh}
                >
                    Refresh
                </Button>
            </HStack>
            <UserTable customers={customers}/>
        </SidebarWithHeader>
    );
}

export default UsersPage;
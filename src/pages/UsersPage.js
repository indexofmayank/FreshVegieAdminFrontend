import React,{ useState, useEffect } from 'react';
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
        customerwithaddress,
        customer_loading: loading,
        customer_error: error,
        fetchCustomers,
    } = useCustomerContext();

    const handleRefresh = async () => {
        await fetchCustomers(pagination.page, pagination.limit);
    };

    const [pagination, setPagination] = useState({
      page: 1,
      limit: 10,
      totalPage: 0,
      totalItems: 0,
    })
    
    useEffect(() => {
      setPagination(prev => ({
        ...prev,
        limit: customers.limit || 10,
        page: customers.page || 1,
        totalPage: customers.totalPages || 0,
        totalItems: customers.totalUsers || 0,
      }));
    
    }, [customers]);


  useEffect(() => {
    fetchCustomers(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

    console.log(customers);

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
            <UserTable 
            customers={customers.data}
            pagination={pagination}
            setPagination={setPagination}
            totalPages={customers.totalPages}
            />
        </SidebarWithHeader>
    );
}

export default UsersPage;
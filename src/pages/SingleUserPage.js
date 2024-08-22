import {
    Heading,
    HStack,
    Spinner,
    VStack,
    Select,
    Text,
    useToast,
  } from '@chakra-ui/react';
  import {
    SidebarWithHeader,
    UserDetailTab
  } from '../components';
  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
import {useUserDetailProviderContext} from '../context/user_detail_context';

function SingleUserPage () {
    const {id} = useParams();
    const {
        userOrderLogs_loading,
        userOrderLogs_error,
        userOrderLogs,
        fetchUserOrderLogs,
        userOrderHistory_loading,
        userOrderHistory_error,
        userOrderHistory,
        fetchUserOrderHistroy,
        userTransaction_loading,
        userTransaction_error,
        userTransactions,
        getUserTransaction
    } = useUserDetailProviderContext();

    useEffect(() => {
        fetchUserOrderLogs(id);
        fetchUserOrderHistroy(id);
        getUserTransaction(id);
    }, [id]);
    
    return (
        <SidebarWithHeader>
            <HStack bg='white' p={5} mb={5} shadow='sm' borderRadius='lg'>
                <VStack>
                <UserDetailTab userOrderLogs={userOrderLogs} userOrderHistory={userOrderHistory} userTransaction={userTransactions}/>
                </VStack>
            </HStack>
        </SidebarWithHeader>
    );
}

export default SingleUserPage;
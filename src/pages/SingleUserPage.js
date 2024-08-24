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
        getUserTransaction,
        userDetailCardInfo_loading,
        userDetailCardInfo_error,
        userDetailCardInfo,
        fetchUserSingleCardInfo
    } = useUserDetailProviderContext();

    useEffect(() => {
        fetchUserOrderLogs(id);
        fetchUserOrderHistroy(id);
        getUserTransaction(id);
        fetchUserSingleCardInfo(id);
    }, [id]);
    // console.log(userDetailCardInfo);
    // console.log(userOrderLogs);
    // console.log(userOrderHistory);
    // console.log(userTransactions);
    // console.log(userMetaData);
    
    return (
        <SidebarWithHeader>
            <HStack bg='white' p={5} mb={5} shadow='sm' borderRadius='lg'>
                <VStack>
                <UserDetailTab 
                userOrderHistory={userOrderHistory} 
                userTransactions={userTransactions}
                userOrderLogs={userOrderLogs} 
                userDetailCardInfo={userDetailCardInfo}
                />
                </VStack>
            </HStack>
        </SidebarWithHeader>
    );
}

export default SingleUserPage;
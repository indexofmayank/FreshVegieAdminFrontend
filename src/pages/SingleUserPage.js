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
    const {userDetail_loading,
        userDetail_error,
        userDetails,
        fetchUserDetail
    } = useUserDetailProviderContext();

    useEffect(() => {
        fetchUserDetail(id);
    }, [id]);
    console.log(userDetails);
    return (
        <SidebarWithHeader>
            <HStack bg='white' p={5} mb={5} shadow='sm' borderRadius='lg'>
                <VStack>
                <UserDetailTab userLogs={userDetails}/>
                </VStack>
            </HStack>
        </SidebarWithHeader>
    );
}

export default SingleUserPage;
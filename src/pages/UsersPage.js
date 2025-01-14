import React,{ useState, useEffect } from 'react';
import {
    SidebarWithHeader
} from '../components';
import { HStack, Button, VStack, Spinner, Heading,Input,FormControl,InputGroup } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import {useCustomerContext} from '../context/customer_context';
import { UserTable } from '../components/UserTable';
import axios from 'axios';
import { getuserCsvDownload_url } from '../utils/constants';
import { FaDownload } from 'react-icons/fa';

function UsersPage () {

    const {
        customers,
        customerwithaddress,
        customer_loading: loading,
        customer_error: error,
        fetchCustomers,
        fetchCustomerByNameForSearch
    } = useCustomerContext();

    const handleRefresh = async () => {
        await fetchCustomers(pagination.page, pagination.limit);
    };
    const [customerlist, setCustomerlist] = useState([]);
    const [pagination, setPagination] = useState({
      page: 1,
      limit: 10,
      totalPage: 0,
      totalItems: 0,
    })

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionList, setSuggestionList] = useState([]);
    
    useEffect(() => {
      setPagination(prev => ({
        ...prev,
        limit: customers.limit || 10,
        page: customers.page || 1,
        totalPage: customers.totalPages || 0,
        totalItems: customers.totalUsers || 0,
      }));
    
    }, [customers]);
// console.log(suggestionList);

  useEffect(() => {
    fetchCustomers(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    // console.log(suggestionList);
    if(suggestionList.length>0){
      setCustomerlist(suggestionList);
    }
   
  }, [suggestionList]);

  useEffect(() => {
    // console.log(customers.data);
    if(customers.data != undefined){
      setCustomerlist(customers.data);
    }
   
  }, [customers]);


  const handleDownload = async () => {
    // console.log(selectedDate);
      try {
        const response = await axios.get(`${getuserCsvDownload_url}`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'User.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
  
    

  };

    // console.log(customers);

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
                <Button
                    colorScheme='brown'
                    variant='outline'
                    leftIcon={<FaDownload />}
                    onClick={handleDownload}
                >
                    Download User
                </Button>
                 <FormControl mt={4} >
          <InputGroup>
          <Input
            placeholder='Search for user'
            name='Search Query'
            focusBorderColor='brown.500'
            value={searchQuery}
            onChange={async (event) => {
              setSearchQuery(event.target.value);
              const response = await fetchCustomerByNameForSearch(event.target.value);
              const { data } = response;
              setSuggestionList(data);
            }}
          />
          </InputGroup>
        </FormControl>
            </HStack>
            <UserTable 
            customers={customerlist}
            pagination={pagination}
            setPagination={setPagination}
            totalPages={customers.totalPages}
            />
        </SidebarWithHeader>
    );
}

export default UsersPage;
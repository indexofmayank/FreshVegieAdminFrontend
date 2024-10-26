import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  SimpleGrid,
  Spinner,
  useToast,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Switch
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { useGeoFancingContext } from '../context/geoFancing_context';
import {UpdateGeoFancingModal} from '../components';

function GeoFancingTable({ geoFancings }) {
  const toast = useToast();
  const {fetchGeoFancing, deleteGeoFancing } = useGeoFancingContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteGeoFancing(id);
    if(response.success) {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      await fetchGeoFancing();
    } else {
      toast({
        position: 'top',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    }
    setLoading(false);
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
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {geoFancings.map((geoFancing, index) => {
              const { name, image, status, _id } = geoFancing;
              return (
                <Tr key={index}>
                  <Td>
                    <Image
                      src={image}
                      boxSize='100px'
                      objectFit='cover'
                      borderRadius='lg'
                    />
                  </Td>
                  <Td>{name}</Td>
                  <Td>
                    <Switch
                      isChecked={status}
                      colorScheme='brown'
                    />
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Actions
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <UpdateGeoFancingModal id={_id} />
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(_id)}>
                          Delete
                        </MenuItem>
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

export default GeoFancingTable

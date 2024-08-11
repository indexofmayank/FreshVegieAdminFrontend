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
  const { fetchBanner, deleteGeoFancing } = useGeoFancingContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    console.log('clicked');
  };


  return (
    <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
      {loading ? (
        <HStack my={8} alignItems='center' justifyContent='center'>
          <Spinner size='lg' color='brown.500' />
        </HStack>
      ) : (
        <Table variant='simple'>
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
              const { name, image, status, id } = geoFancing;
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
                      isReadOnly={true}
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
                          <UpdateGeoFancingModal id={id} />
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(id)}>
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

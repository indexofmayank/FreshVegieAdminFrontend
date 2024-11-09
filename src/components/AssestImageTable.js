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
    IconButton,

} from '@chakra-ui/react';
import { BiCopy } from 'react-icons/bi'; 
import { MdDeleteOutline } from "react-icons/md";
import {deleteAsset_url} from '../utils/constants';
import axios from "axios";


function AssestImageTable({assetList, handleDelete}) {
    const [loading, setLoading] = useState(false);

    const toast = useToast(); 

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'Copied!',
        description: 'Image URL copied to clipboard.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:'top'
      });
    });
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
              <Th>Url</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {assetList.map((asset, index) => {
              const { image, name, _id } =asset;
              return (
                <Tr key={index}>
                  <Td>
                    <Image
                      src={image}
                      boxSize='40px'
                      objectFit='content'
                      borderRadius='sm'
                    />
                  </Td>
                  <Td>
                    {name}
                  </Td>
                  <Td>
                    {image}
                  </Td>
                  <Td>
                    <IconButton
                      icon={<BiCopy />}
                      aria-label="Copy URL"
                      onClick={() => handleCopy(image)}
                      size="lg"
                    />
                  </Td>
                  <Td>
                    <IconButton
                      icon={<MdDeleteOutline />}
                      aria-label="delete URL"
                      onClick={() => handleDelete(_id)}
                      size="lg"
                    />
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

export default AssestImageTable;
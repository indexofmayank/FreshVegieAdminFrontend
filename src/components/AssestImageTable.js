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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Text
} from '@chakra-ui/react';
import { BiCopy } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { deleteAsset_url } from '../utils/constants';
import axios from 'axios';

function AssestImageTable({ assetList, handleDelete }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null); // State to hold the asset being deleted

  const toast = useToast();

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'Copied!',
        description: 'Image URL copied to clipboard.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    });
  };

  // Function to open the delete modal and set the asset to delete
  const openDeleteModal = (asset) => {
    setAssetToDelete(asset);
    onOpen();
  };

  // Function to delete the asset
  const handleDeleteAsset = async () => {
    if (assetToDelete) {
      try {
        setLoading(true);
        // Perform the delete action (API call, or any other logic you have)
        await axios.delete(`${deleteAsset_url}/${assetToDelete._id}`);
        toast({
          title: 'Deleted!',
          description: `Asset ${assetToDelete.name} has been deleted.`,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top'
        });
        onClose(); // Close the modal
        handleDelete(assetToDelete._id); // Update parent component state
      } catch (error) {
        toast({
          title: 'Error!',
          description: 'There was an error deleting the asset.',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top'
        });
      } finally {
        setLoading(false);
      }
    }
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
              const { image, name, _id } = asset;
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
                  <Td>{name}</Td>
                  <Td>{image}</Td>
                  <Td>
                    <IconButton
                      icon={<BiCopy />}
                      aria-label='Copy URL'
                      onClick={() => handleCopy(image)}
                      size='lg'
                    />
                  </Td>
                  <Td>
                    <IconButton
                      icon={<MdDeleteOutline />}
                      aria-label='Delete URL'
                      onClick={() => openDeleteModal(asset)} // Pass the asset to be deleted
                      size='lg'
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            {assetToDelete && (
              <Text>
                Are you sure you want to delete <strong>{assetToDelete.name}</strong>?
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
            <Button
              colorScheme='red'
              onClick={() => {
                handleDelete(assetToDelete._id);
                onClose();
              }} // Call the delete function when confirmed
              ml={3}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
}

export default AssestImageTable;

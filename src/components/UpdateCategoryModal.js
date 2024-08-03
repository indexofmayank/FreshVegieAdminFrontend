import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Textarea,
  Center,
  HStack,
  Image,
  VStack,
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useCategoryContext } from '../context/category_context';

const UpdateCategoryModal = ({ id }) => {

  const {
    single_category: {
      name = '',
      image = ''
    },
    fetchCategory,
    fetchSingleCategory
  } = useCategoryContext();
 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();
  return (
    <>
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
          fetchSingleCategory(id);
          onOpen();
        }}
      >
        Edit
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Category Name'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={ () => {}}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
          <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='brown'
              onClick={() => {}}
            >
              Save
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateCategoryModal;

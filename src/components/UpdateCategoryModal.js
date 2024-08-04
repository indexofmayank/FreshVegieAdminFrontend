import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Center,
  Text,
  Image
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

  const [imageList, setImageList] = useState(image);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageList(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  return (
    <>
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
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
                onChange={() => { }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Images</FormLabel>
              <Center
                bg='brown.50'
                minHeight={100}
                my={5}
                borderWidth={3}
                borderColor='brown.200'
                borderStyle='dashed'
                borderRadius='lg'
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drag your files here</p>
                ) : (
                  <p>
                    Drag drop image files here, or click to select files
                    <br />
                    (Only *.jpeg and *.png images will be accepted)
                  </p>
                )}
              </Center>
              {imageList && (
                <Center>
                  <Image src={imageList} alt="Category" maxH="200px" my={3} />
                </Center>
              )}
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='brown'
              onClick={() => { }}
            >
              Save
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateCategoryModal;

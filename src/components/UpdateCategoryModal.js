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
  Image,
  Select,
  Option,
  HStack,
  VStack
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useCategoryContext } from '../context/category_context';

const UpdateCategoryModal = ({ id }) => {

  const {
    single_category: {
      name = '',
      image = '',
      status = ''
    },
    fetchSingleCategory,
    single_category_loading,
    updateExistingCategoryDetails,
    fetchCategory,
    updateCategory
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

  const handleRemoveImage = async () => {
    setImageList(null);
  };

  const handleSubmit = async () => {
    console.log(name);
    console.log(status);
    if (
      !name ||
      !status
    ) {
      return toast({
        position: 'top',
        descirption: 'Provide all the details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (imageList.length < 1) {
      return toast({
        position: 'top',
        description: 'Add alteast one image',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    setLoading(true);
    const category = {
      name,
      status,
      image: imageList
    };
    const responseCreate = await updateCategory(id, category);
    setLoading(false);
    if(responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'Category updated',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      await fetchCategory();
    } else {
      return toast({
        position: 'top',
        description: responseCreate.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  }

  useEffect(() => {
    setImageList(image);
  }, [single_category_loading]);
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
                onChange={updateExistingCategoryDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder='Select status'
                name='status'
                focusBorderColor='brown.500'
                value={status}
                onChange={updateExistingCategoryDetails}
              >
                <option value='true'>active</option>
                <option value='false'>nactive</option>
              </Select>
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
              <Input {...getInputProps()} />
            </FormControl>
            <FormControl mt={4}>
              <HStack>
                {imageList && (
                  <VStack>
                    <Image
                      src={imageList}
                      boxSize='70px'
                      objectFit='cover'
                      borderRadius='lg'
                    />
                    <Button
                      size='xs'
                      variant='outline'
                      colorScheme='red'
                      onClick={handleRemoveImage}
                    >
                      Remove
                    </Button>
                  </VStack>
                )}
              </HStack>
            </FormControl>


          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Updating Category'
              colorScheme='brown'
              onClick={handleSubmit}
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

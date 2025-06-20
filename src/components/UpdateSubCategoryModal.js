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
  Option,
  HStack,
  VStack
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useSubCategoryContext } from '../context/subcategory_context';
import Select from 'react-select';
import { useCategoryContext } from '../context/category_context';
const UpdateSubCategoryModal = ({ id }) => {

  const {
    single_subcategory: {
      name = '',
      category = '',
      image = '',
      status = '',
      order = ''
    },
    fetchSingleCategory,
    single_subcategory_loading,
    subcategoriesByName,
    updateExistingsubCategoryDetails,
    fetchCategory,
    fetchallCategory,
    updateCategory
  } = useSubCategoryContext();
  const { fetchCategoryByName,categoriesByName } = useCategoryContext();
  const statusoptions = [
    { value: true, label: 'active' },
    { value: false, label: 'Inactive' },
  ]

  const [imageList, setImageList] = useState(image);
  const [loading, setLoading] = useState(false);
  const [categoryoptions, setCategoryoptions] = useState([])
  const [selectedstatus, setSelectedstatus] = useState(false);
  const [selectedcategory, setSelectedcategory] = useState('');
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

  useEffect(() => {
    fetchCategoryByName();
  },[])

 

  useEffect(() =>{

    if(categoriesByName.data != undefined){
    if(categoriesByName.data.length >0){
        const newcat = categoriesByName.data;
        const ncategoryOptions = newcat.map(cat => ({
            value: cat._id,
            label: cat.name
          }));
          setCategoryoptions(ncategoryOptions)
    }
  }
  },[categoriesByName.data])

  useEffect(() => {
   
    if(categoryoptions.length >0){
      const selectedcategory = categoryoptions.find(
        (categoryy) => categoryy.value === category
    );
    setSelectedcategory(selectedcategory)
    }
  
    if(status){
      const selectedstatus = statusoptions.find(
        (statusoption) => statusoption.value === status
       );
       setSelectedstatus(selectedstatus)
    }

}, [single_subcategory_loading]);

  const handleRemoveImage = async () => {
    setImageList(null);
  };

  const handleCategorySelect = (event) => {
    setSelectedcategory(event);
    updateExistingsubCategoryDetails({
      target: {
        name: "category",
        value: event.value,
      },
    });
   
    // setCategoryDropdownOpen(false);
  };

  const onStatusSelect = (event) => {
    setSelectedstatus(event)
    updateExistingsubCategoryDetails({
          target: {
              name: 'status',
              value: event.value
          }
      });
  }

  const handleSubmit = async () => {
    console.log(name);
    console.log(status);
    console.log(order);
    console.log(category);
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
    const categoryy = {
      name,
      category,
      status,
      order,
      image: imageList
    };
    const responseCreate = await updateCategory(id, categoryy);
    console.log(responseCreate);
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
  }, [single_subcategory_loading]);
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
          <ModalHeader>Update Sub-category</ModalHeader>
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
                onChange={updateExistingsubCategoryDetails}
              />
            </FormControl>
            <FormControl mt={4}>
               <FormLabel>Select Category</FormLabel>
                  <Select options={categoryoptions}   value={selectedcategory} onChange={handleCategorySelect} />
              </FormControl>
            <FormControl mt={4}>
              <FormLabel>Order</FormLabel>
              <Input
                placeholder='order'
                name='order'
                focusBorderColor='brown.500'
                value={order}
                onChange={updateExistingsubCategoryDetails}
              />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Status</FormLabel>
                <Select options={statusoptions} value={selectedstatus} name="status"  onChange={onStatusSelect} />
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

export default UpdateSubCategoryModal;

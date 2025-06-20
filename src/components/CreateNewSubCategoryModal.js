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
    Radio,
    RadioGroup,
    Stack
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useSubCategoryContext } from '../context/subcategory_context';
import Select from 'react-select';
import { useCategoryContext } from '../context/category_context';



function CreateNewSubCategoryModal() {

    const {
        new_subcategory: {
            name,
            category,
            image,
            status,
            order
        },
        createNewsubCategory,
        subcategoriesByName,
        updateNewSubCategoryDetails,
        fetchallCategory
    } = useSubCategoryContext();
    const { fetchCategoryByName,categoriesByName } = useCategoryContext();
    const [imageList, setImageList] = useState(image);
    const [loading, setLoading] = useState(false);
    const [categoryoptions, setCategoryoptions] = useState([])


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
      
      const onStatusSelect = (event) => {
        // console.log(event)
        // console.log(event.value)
        // console.log(event.label)
        updateNewSubCategoryDetails({
            target: {
                name: 'category',
                value: event.value
            }
        });
    }

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

    const handleSubmit = async () => {
        if(
            !name ||
            !imageList ||
            !status
        ) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        if(imageList.length < 1) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        setLoading(true);
        console.log('uploading');
        const subcategory = {
            name,
            category,
            status,
            order,
            image: imageList
        };
        console.log(subcategory);
        const responseCreate = await createNewsubCategory(subcategory);
        setLoading(false);
        if(responseCreate.success) {
            onClose();
            return toast({
                position: 'top',
                description: 'Sub category created',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } else {
            return toast({
                position: 'top',
                description: responseCreate.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Button colorScheme='brown' onClick={onOpen}>
                Create New Sub-category
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new Sub-category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Sub-category Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='Sub category name'
                                name='name'
                                focusBorderColor='brown.500'
                                value={name}
                                onChange={updateNewSubCategoryDetails}
                            />

                        </FormControl> 
                        <FormControl mt={4}>
                            <FormLabel>Select Category</FormLabel>
                            <Select options={categoryoptions} name="status"  onChange={onStatusSelect} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Order</FormLabel>
                            <Input
                                placeholder='order'
                                type='number'
                                name='order'
                                focusBorderColor='brown.500'
                                value={order}
                                onChange={updateNewSubCategoryDetails}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <RadioGroup
                                name='status'
                                onChange={(value) => updateNewSubCategoryDetails({target: {name: 'status', value}})}
                                value={status}
                            >
                                <Stack spacing={4} direction='row'>
                                    <Radio value='true'>Acitve</Radio>
                                    <Radio value='false'>Inactive</Radio>
                                </Stack>
                            </RadioGroup>
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
                            {imageList && (
                                <Center>
                                    <Image src={imageList} alt="Category" maxH="200px" my={3} />
                                </Center>
                            )}

                            <Input {...getInputProps()} />
                        </FormControl>


                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            isLoading={loading}
                            colorScheme='brown'
                            onClick={handleSubmit}
                            loadingText='Creating categories'
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateNewSubCategoryModal;
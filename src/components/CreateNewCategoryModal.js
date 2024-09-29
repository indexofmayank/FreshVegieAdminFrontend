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
    Select,
    Radio,
    RadioGroup,
    Stack
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useCategoryContext } from '../context/category_context';



function CreateNewCategoryModal() {

    const {
        new_category: {
            name,
            image,
            status,
            order
        },
        createNewCategory,
        updateNewCategoryDetails
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
        const category = {
            name,
            status,
            order,
            image: imageList
        };
        const responseCreate = await createNewCategory(category);
        setLoading(false);
        if(responseCreate.success) {
            onClose();
            return toast({
                position: 'top',
                description: 'Category created',
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
                Create New Category
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='category name'
                                name='name'
                                focusBorderColor='brown.500'
                                value={name}
                                onChange={updateNewCategoryDetails}
                            />

                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <RadioGroup
                                name='status'
                                onChange={(value) => updateNewCategoryDetails({target: {name: 'status', value}})}
                                value={status}
                            >
                                <Stack spacing={4} direction='row'>
                                    <Radio value='true'>Acitve</Radio>
                                    <Radio value='false'>Inactive</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Order</FormLabel>
                            <Input
                                placeholder='order'
                                type='number'
                                name='order'
                                focusBorderColor='brown.500'
                                value={order}
                                onChange={updateNewCategoryDetails}
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

export default CreateNewCategoryModal;
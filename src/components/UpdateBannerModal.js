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
    VStack,
    HStack
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useBannerContext } from '../context/banner_context';



function UpdateBannerModal({ id }) {
    const {
        single_banner: {
            name = '',
            status = '',
            image = ''
        },
        single_banner_loading,
        fetchBanner,
        fetchSingleBanner,
        updateExistingBannerDetails,
        updateBanner
    } = useBannerContext();

    const [imageList, setImageList] = useState(image);
    const [loading, setLoading] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();
    const handleRemoveImage = async () => {
        setImageList(null);
    };
    
    const handleSubmit = async () => {
        console.log(name); console.log(image); console.log(status);
        if(
            !name ||
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
                description: 'Add alteast one image',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        setLoading(true);
        const banner = {
            name,
            status,
            image: imageList
        };
        const responseCreate = await updateBanner(id, banner);
        setLoading(false);
        if(responseCreate.success) {
            onClose();
            toast({
                position: 'top',
                description: 'Banner updated',
                status: 'success',
                duration: 5000,
                isClosable: true
            });
            await fetchBanner();
        } else {
            return toast({
                position: 'top',
                description: responseCreate.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
    };

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
    useEffect(() => {
        setImageList(image);
    }, [single_banner_loading]);


    return (
        <>
            <Text
                colorScheme='brown'
                minW='100%'
                onClick={() => {
                    fetchSingleBanner(id);
                    onOpen();
                }}
            >
                Edit
            </Text>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Banner</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='Banner name'
                                name='name'
                                focusBorderColor='brown.500'
                                value={name}
                                onChange={updateExistingBannerDetails}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={updateExistingBannerDetails}
                            >
                                <option value='true'>active</option>
                                <option value='false'>Inactive</option>
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
                            loadingText='Updating Banner'
                            colorScheme='brown'
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default UpdateBannerModal;

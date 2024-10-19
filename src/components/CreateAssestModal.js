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
    Stack,
    Box,
    Text,
    Divider
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

function CreateAssestModal() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        if(acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            toast({
                position: 'top',
                title: "File selected.",
                description: `File ${selectedFile.name} is ready for upload.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }

    }, [toast]);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
    });


    return (
        <>
            <Button colorScheme='brown' onClick={onOpen}>
                Create New Asset
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new asset</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder='Name'
                                    name='zip_name'
                                    focusBorderColor='brown.500'
                                    // value={}
                                    onChange={() => console.log('did')}
                                />
                        </FormControl>
                        <FormControl mt={4}>
                            <Box
                                {...getRootProps()}
                                border="2px dashed"
                                borderColor="gray.300"
                                p={6}
                                rounded="md"
                                textAlign="center"
                                bg={isDragActive ? "gray.100" : "white"}
                                cursor="pointer"
                                transition="background-color 0.2s"
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <Text>Drop the file here...</Text>
                                ) : (
                                    <Text>Drag and drop zip file here, or click to select one</Text>
                                )}
                            </Box>
                        </FormControl>
                        <Divider mt={3}/>
                        <Text  size='xl' mt={3}>OR</Text>
                        <Divider mt={3}/>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='name'
                                name='name'
                                focusBorderColor='brown.500'
                                // value={}
                                onChange={() => console.log('did')}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <Box
                                {...getRootProps()}
                                border='2px dashed'
                                p={6}
                                rounded="md"
                                textAlign="center"
                                bg={isDragActive ? "gray.100" : "white"}
                                cursor="pointer"
                                transition="background-color 0.2s"
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <Text>Drop the file here...</Text>
                                ):file ? (
                                    <Text>Selected file: {file.name}</Text>
                                ) :(
                                    <Text>Drag and drop the jpeg/png here or click to select one</Text>
                                )}
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme='brown'
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateAssestModal;
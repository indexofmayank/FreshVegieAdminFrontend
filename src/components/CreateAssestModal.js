import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    Button,
    FormControl,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast,
    Box,
    Text,
    Divider,
    Spinner
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import {zipAssetUpload_url,imageAssetUpload_url} from '../utils/constants'

function CreateAssestModal({ loaddata }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [zipFile, setZipFile] = useState(null);
    const [isSaveButtonLoading, setSaveButtonLoading] = useState(false);
    const [isSaveButtonDisable, setSaveButtonDisable] = useState(true);
    

    useEffect(() => {
        setSaveButtonDisable(false);
    }, [zipFile,imageFile]);

    // Dropzone for image files
    const onDropImage = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const selectedImage = acceptedFiles[0];
            setImageFile(selectedImage);
            toast({
                position: 'top',
                title: "Image selected.",
                description: `Image ${selectedImage.name} is ready for upload.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [toast]);
    
    const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive } = useDropzone({
        onDrop: onDropImage,
        accept: 'image/jpeg, image/png',
    });
    
    // Dropzone for zip files
    const onDropZip = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const selectedZip = acceptedFiles[0];
            setZipFile(selectedZip);
            toast({
                position: 'top',
                title: "ZIP file selected.",
                description: `File ${selectedZip.name} is ready for upload.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [toast]);
    
    const { getRootProps: getZipRootProps, getInputProps: getZipInputProps, isDragActive: isZipDragActive } = useDropzone({
        onDrop: onDropZip,
        accept: '.zip',
    });

    const handleSave = async () => {
        setLoading(true); // Show the loader
        setSaveButtonLoading(true);
        try {
            if (zipFile) {
                const zipData = new FormData();
                zipData.append("file", zipFile);
                const response = await axios.post(zipAssetUpload_url, zipData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (response.data.success) {
                    setZipFile(null);
                    await loaddata();
                    toast({
                        position: 'top',
                        description: response.data.message,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    onClose(); // Close modal on success
                }
            } else if (imageFile) {
                const imageData = new FormData();
                imageData.append("file", imageFile);
                const response = await axios.post(imageAssetUpload_url, imageData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (response.data.success) {
                    setImageFile(null);
                    await loaddata();
                    toast({
                        position: 'top',
                        description: response.data.message,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    onClose(); // Close modal on success
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Unexpected error";
            toast({
                position: 'top',
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false); // Hide the loader
            setSaveButtonLoading(false);
        }
    };


    return (
        <>
            <Button colorScheme='brown' onClick={onOpen}  style={{padding:'20px 50px'}}>
                Upload bulk images for product CSV
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new asset</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {/* Dropzone for ZIP files */}
                        <FormControl mt={4}>
                            <Box
                                {...getZipRootProps()}
                                border="2px dashed"
                                borderColor="gray.300"
                                p={6}
                                rounded="md"
                                textAlign="center"
                                bg={isZipDragActive ? "gray.100" : "white"}
                                cursor="pointer"
                                transition="background-color 0.2s"
                            >
                                <input {...getZipInputProps()} />
                                {isZipDragActive ? (
                                    <Text>Drop the ZIP file here...</Text>
                                ) : zipFile ? (
                                    <Text>Selected ZIP file: {zipFile.name}</Text>
                                ) : (
                                    <Text>Drag and drop a ZIP file here, or click to select one</Text>
                                )}
                            </Box>
                        </FormControl>
                        <Divider mt={3}/>
                        <Text size='xl' mt={3}>OR</Text>
                        <Divider mt={3}/>
                        {/* Dropzone for Image files */}
                        <FormControl mt={4}>
                            <Box
                                {...getImageRootProps()}
                                border="2px dashed"
                                borderColor="gray.300"
                                p={6}
                                rounded="md"
                                textAlign="center"
                                bg={isImageDragActive ? "gray.100" : "white"}
                                cursor="pointer"
                                transition="background-color 0.2s"
                            >
                                <input {...getImageInputProps()} />
                                {isImageDragActive ? (
                                    <Text>Drop the image here...</Text>
                                ) : imageFile ? (
                                    <Text>Selected image: {imageFile.name}</Text>
                                ) : (
                                    <Text>Drag and drop a JPEG/PNG image here, or click to select one</Text>
                                )}
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            isLoading={isSaveButtonLoading}
                            disabled={isSaveButtonDisable}
                            colorScheme='brown'
                            loading loadingText="Saving..."
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {loading && (
                <Box
                    position="fixed"
                    top="0"
                    left="0"
                    width="100vw"
                    height="100vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="rgba(0, 0, 0, 0.5)"
                    zIndex="9999"
                >
                    <Spinner size="xl" color="white" />
                </Box>
            )}
        </>
    );
}

export default CreateAssestModal;

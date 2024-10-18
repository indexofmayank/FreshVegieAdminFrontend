import React, { useCallback, useState } from "react";
import {
  Button,
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
  Input,
  InputGroup,
  Box,
  Text
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios'; 
import {bulkUploadProduct_url} from '../utils/constants';

function BulkUploadProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const toast = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
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
    accept: '.csv',
    multiple: false,
  });

  const handleUpload = async () => {
    setLoading(true);
    if (!file) {
      toast({
        position: 'top',
        title: "No file selected.",
        description: "Please select a CSV file before uploading.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // POST request to the backend API
      const response = await axios.post(bulkUploadProduct_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(response?.data?.success) {
        onClose();
        setLoading(false);
        return toast({
          position: 'top',
          title: "Upload successful.",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        onClose();
        setLoading(false);
        return toast({
          position: 'top',
          title: "Upload unsuccessful.",
          description: response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      }

    } catch (error) {
      setLoading(false);
      toast({
        position: 'top',
        title: "Upload failed.",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <Button 
        colorScheme="brown"
        leftIcon={<FaArrowUp />}
        onClick={onOpen}
      >
        Upload CSV
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bulk Upload Products</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Upload a CSV file</FormLabel>
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
                ) : file ? (
                  <Text>Selected file: {file.name}</Text>
                ) : (
                  <Text>Drag and drop a CSV file here, or click to select one</Text>
                )}
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleUpload}
              isDisabled={!file}
              isLoading={loading}
              loadingText="Uploading"
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BulkUploadProduct;

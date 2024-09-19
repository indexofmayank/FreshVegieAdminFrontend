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


function CreateNewDealOfTheDay() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    return (
        <>
            <Button colorScheme="brown" onClick={onOpen}>
                Create New Deal
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create new Deal</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <h2>mayank</h2>
                        </ModalBody>
                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                            >
                                Save
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    );

}

export default CreateNewDealOfTheDay;
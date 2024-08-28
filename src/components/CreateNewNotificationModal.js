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


function CreateNewNotificationModal() {
    
    return (
        <>
            <Button colorScheme='brown'>
                Create New Notification
            </Button>

            <Modal>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new nofitication</ModalHeader>
                </ModalContent>
            </Modal>
        </>
    );


}

export default CreateNewNotificationModal;
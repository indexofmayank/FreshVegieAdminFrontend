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
import {useNotificationContext} from '../context/notification_context';

function UpdateNotificationModal({id}) {

    const {
        single_notification: {
            name='',
            heading='',
            message='',
            redirect_to='',
            specific_product='',
            category='',
            link='',
            audience='',
            branch='',
            customFilters='',
            customer='',
            status='',
            image='',
            lastLive=''
        },
        single_notification_loading,
        single_notification_error,
        single_notification,
        fetchSingleNotification
    } = useNotificationContext();


    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();



    return (
        <>
            <Text
                colorScheme='brown'
                minW='100%'
                onClick={() => {
                    fetchSingleNotification(id);
                    onOpen();
                }}
            >
                Edit
            </Text>
            <Modal  initialRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Notification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button >
                        <Button
                            colorScheme='brown'
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default UpdateNotificationModal;
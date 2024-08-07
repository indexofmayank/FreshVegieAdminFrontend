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
    Image
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import {useBannerContext} from '../context/banner_context';

const UpdateBannerModal = ({ id }) => {


    return (
        <>
            <Text
                colorScheme='brown'
                minW='100%'

            >
                Edit
            </Text>
        </>
    )
}

export default UpdateBannerModal;
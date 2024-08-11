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
import {useGeoFancingContext} from '../context/geoFancing_context';


function UpdateGeoFancingModal({id}) {

    // const {
    //     single_geoFacing: {
    //         name = '',
    //         status = '',
    //         image = '',
    //         polygon='', 
    //     },
    //     single_geoFancing_loading,
    //     fetchGeoFancing,
    //     fetchSingleGeoFancing,
    //     updateExistingGeoFancingDetails,
    //     updateGeoFancing
    // } = useGeoFancingContext();

    const [imageList, setImageList] = useState(null);
    const [loading, setLoadint] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();

    const handleRemoveImage = () => {
        setImageList(null);
    };

    const handleSubmit = () => {
        setImageList(null);
    };

    return (
        <>
        <Text
            colorScheme='brown'
            minW='100%'
            onClick={() => {
                onOpen();
            }}
        >
            Edit
        </Text>
        
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Geo Fancing</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    mayank
                </ModalBody>
            </ModalContent>
        </Modal>
    </>

    );

};

export default UpdateGeoFancingModal;
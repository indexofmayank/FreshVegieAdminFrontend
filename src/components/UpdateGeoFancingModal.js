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
import { useGeoFancingContext } from '../context/geoFancing_context';
import GeoFancingPolygon from './GeoFancingPolygon';

function UpdateGeoFancingModal({ id }) {
    const divRef = useRef(null);

    const {
        single_geoFancing: {
            name = '',
            status = '',
            image = '',
            polygon = '',
        },      
        single_geoFancing_loading,
        fetchSingleGeoFancing,
        updateExistingGeoFancingDetails
    } = useGeoFancingContext();

    const [imageList, setImageList] = useState(null);
    const [loading, setLoadint] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();

    const handlePolygonComplete = (coordinates) => {
        console.log('Geofence Coordinates:', coordinates);
    };


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
                    fetchSingleGeoFancing(id);
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
                        <FormControl>
                            <Input
                                ref={initialRef}
                                placeholder='Geo fancing name'
                                name='name'
                                focusBorderColor='brown.500'
                                value={name}
                                onChange={updateExistingGeoFancingDetails}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={updateExistingGeoFancingDetails}
                            >
                                <option value='true'>active</option>
                                <option value='false'>Inactive</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Draw new polygon</FormLabel>
                            <div>
                                <GeoFancingPolygon onPolygonComplete={handlePolygonComplete} />
                            </div>
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            isLoading={loading}
                            loadingText='Updating geo fancing'
                            colorScheme='brown'
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    );

};

export default UpdateGeoFancingModal;
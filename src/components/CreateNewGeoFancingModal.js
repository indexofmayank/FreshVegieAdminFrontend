import React, { useState, useRef, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas';
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
    Select
} from '@chakra-ui/react';
// import { useGeoFancingContext } from '../context/geoFancing_context';
import GeoFancingPolygon from './GeoFancingPolygon';
import { useGeoFancingContext } from '../context/geoFancing_context';

function CreateNewGeoFancingModal() {
    const divRef = useRef(null);

    const {
        new_geoFancing: {
            name,
            image,
            status,
            polygon,
        },
        updateNewGeoFancingDetails,
        createNewGeoFancing
    } = useGeoFancingContext();

    const [imageList, setImageList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();

    const handlePolygonComplete = (coordinates) => {
        console.log('Geofence Coordinates:', coordinates);
        setPolygonCoordinates(coordinates);
    };

    const handleSubmit = async () => {
        if(
            !name ||
            !status ||
            !polygonCoordinates
        ) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }

        setLoading(true);


        if (divRef.current) {
            try {
                const canvas = await html2canvas(divRef.current, {
                    useCORS: true,
                    allowTaint: false,
                });
                const dataUrl = canvas.toDataURL('image/png');
                createNewGeoFancing({ name, status, polygon: polygonCoordinates, image: dataUrl });
                toast({
                    position: 'top',
                    title: 'Geofencing created.',
                    description: "A new geofencing has been created successfully.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                onClose();
            } catch (error) {
                console.error('Failed to capture screenshot:', error);
                toast({
                    position: 'top',
                    title: 'Error.',
                    description: "Failed to create geofencing. Please try again.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }

        setLoading(false);
    };

    return (
        <>
            <Button colorScheme='brown' onClick={onOpen}>
                Create New Geo Fancing
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new geo fancing</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} overflowX="auto">
                        <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='name'
                                name='name'
                                focusBorderColor='brown.500'
                                value={name}
                                onChange={updateNewGeoFancingDetails}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={updateNewGeoFancingDetails}
                            >
                                <option value={true}>active</option>
                                <option value={false}>Inactive</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Draw Polygon</FormLabel>
                            <div ref={divRef}>
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
                            loadingText='Create GeoFancing'
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
}

export default CreateNewGeoFancingModal;

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
    Option,
    HStack,
    VStack,
    Heading
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useGeoFancingContext } from '../context/geoFancing_context';
import GeoFancingPolygon from './GeoFancingPolygon';
import html2canvas from 'html2canvas';



const UpdateGeoFancingModal = ({ id }) => {
    const updateGeoFancingDivRef = useRef(null);

    const {
        single_geoFancing: {
            name = '',
            image = '',
            polygon = '',
            status = ''
        },
        fetchSingleGeoFancing,
        single_geoFancing_loading,
        updateExistingGeoFancingDetails,
        fetchGeoFancing,
        updateGeoFancing
    } = useGeoFancingContext();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [loading, setLoading] = useState(null);
    const initialRef = useRef();
    const [lastPolygonImage, setLastPolygonImage] = useState(null);
    const [imageList, setImageList] = useState(null);
    const [newPolygonCoordinates, setNewPolygonCoordinates] = useState([]);

    const handlePolygoncComplete = (coordinates) => {
        console.log('Geofence Coordinates: ', coordinates);
        setNewPolygonCoordinates(coordinates);
    };
    
    const handleSubmit = async () => {
        if(
            !name ||
            !status 
        ) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        setLoading(true);
        if(newPolygonCoordinates.length >= 2) {
            if(updateGeoFancingDivRef.current) {
                try {
                    const canvas = await html2canvas(updateGeoFancingDivRef.current, {
                        useCORS: true,
                        allowTaint: false,
                    });
                    const dataUrl = canvas.toDataURL('image/png');
                    await updateGeoFancing({name, image: dataUrl, status, polygon: newPolygonCoordinates}, id);
                } catch (error) {
                    console.log('Failed to capture screenshot: ', error);
                    toast({
                        title: 'Error',
                        description: "Failed to create geoFencing. Please try again",
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                    });
                }
            }
        } else {
            const geoFancing = {
                name,
                image,
                status,
                polygon
            };
            const responseUpdate = await updateGeoFancing(geoFancing, id);
            setLoading(false);
            if(responseUpdate.success) {
                onClose();
                toast({
                    position: 'top',
                    description: 'Geofancing updated',
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                });
                await fetchGeoFancing();
            } else {
                return toast({
                    position: 'top',
                    description: responseUpdate.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
            }
        }

    }


    return (
        <>
            <Text
                colorScheme='brown'
                minW='100%'
                onClick={() => {
                    fetchSingleGeoFancing(id)
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
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='Geo fancing name'
                                focusBorderColor='brown.500'
                                name='name'
                                value={name}
                                onChange={updateExistingGeoFancingDetails}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>status</FormLabel>
                            <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={updateExistingGeoFancingDetails}
                            >
                                <option value='true'>active</option>
                                <option value='false'>inactive</option>
                            </Select>
                        </FormControl>


                        <FormControl mt={4}>
                            <FormLabel>Draw Polygon</FormLabel>
                            <div ref={updateGeoFancingDivRef}>
                                <GeoFancingPolygon onPolygonComplete={handlePolygoncComplete} />
                            </div>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Last polygon</FormLabel>
                            <Image
                                src={image}
                                boxSize='70px'
                                objectFit='cover'
                                borderRadius='lg'
                            />
                        </FormControl>

                    </ModalBody>



                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            isLoading={loading}
                            loadingText='Updating Geo Fancing'
                            colorScheme='brown'
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </>
    )
}

export default UpdateGeoFancingModal;
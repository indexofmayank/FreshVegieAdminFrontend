import React, { useState, useRef, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas';
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
import { useGeoFancingContext } from '../context/geoFancing_context';
import GeoFancingPolygon from './GeoFancingPolygon';

function CreateNewGeoFancingModal() {
    const divRef = useRef(null)

    const {
        new_geoFancing: {
            name,
            image,
            status,
            circleInfo,
        },
        createNewGeoFancing,
        updateNewGeoFancingDetails
    } = useGeoFancingContext();

    const [imageList, setImageList] = useState(image);
    const [loading, setLoading] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();

    const handleSubmit = async () => {
        console.log(name);
        console.log(image);
        console.log(status);
        console.log(circleInfo);
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
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='name'
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
                            <FormLabel>Make Circle</FormLabel>
                            <div ref={divRef}>
                            <GeoFancingPolygon />
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

};

export default CreateNewGeoFancingModal;
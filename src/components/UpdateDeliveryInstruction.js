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

function UpdateDeliveryInstruction({id}) {
    console.log(id);

    const { isOpen, onOpen, onClose } = useDisclosure();



    const initialRef = useRef();

    return (
        <>
            <Text
                colorSchema="brown"
                minW="100%"
                onClick={() => {console.log('clicked')}}
            >
                Edit
            </Text>
            <Modal initialFocusRef ={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Delivery Instruction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="Name"
                                focusBorderColor="brown.500"
                                // value={}
                                onChange={() => {}}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select
                                placeholder="Select status"
                                name='status'
                                focusBorderColor='brown.500'
                                // value={}
                                onChange={() => {}}
                            >
                                <option>active</option>
                                <option>inactive</option>
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Total distance</FormLabel>
                            <Input
                                placeholder='total_distance'
                                name='total_distance'
                                focusBorderColor='brown.500'
                                // value={}
                                onChange={() => {}}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            // isLoading={}
                            // isLoadingText=''
                            colorSchema='brown'
                            onClick={() => {}}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateDeliveryInstruction;
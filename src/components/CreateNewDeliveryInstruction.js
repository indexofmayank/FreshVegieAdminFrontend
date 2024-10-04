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

function CreateNewDeliveryInstruction() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = useRef();

    return (
        <>
            <Button colorScheme='brown' onClick={onOpen}>
                Create New Delivery Instructions
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Dlivery Instructions</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='Delivery Instructions'
                                name='name'
                                focusBorderColor='brown.500'
                                // value={name}
                                onChange={() => { }}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                // value={}
                                onChange={() => { }}
                            >
                                <option value={true}>active</option>
                                <option value={false}>inactive</option>
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Total distance</FormLabel>
                            <Input
                                type='number'
                                placeholder='Total distance'
                                name='total_distance'
                                focusBorderColor='brown.500'
                                // value={}
                                onChange={() => { }}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Surge fee</FormLabel>
                            <Input
                                type='number'
                                placeholder='Surge fee'
                                focusBorderColor='brown.500'
                                // value={}
                                onChange={() => { }}
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
                            colorScheme='brown'
                            onClick={() => { }}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateNewDeliveryInstruction;
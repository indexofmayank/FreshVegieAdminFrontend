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
    HStack,
    Checkbox
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useDealOfTheDayContext } from '../context/dealoftheday_context';

function UpdateDealOfTheDayModal({ id, name, image }) {

    const {
        updateDealOfTheDay
    } = useDealOfTheDayContext();
    const initialRef = useRef();
    const [currentFeature, setCurrentFeature] = useState(true);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <>
            <Text
                colorScheme='brown'
                minW='100%'
                onClick={() => {
                    onOpen()
                    console.log(id)
                }}

            >
                Edit
            </Text>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Deal Of The Day</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text>{name || ''}</Text>
                        <Image
                            src={image || ''}
                            boxSize='100px'
                            objectFit='cover'
                            borderRadius='lg'
                        />

                        <FormControl>
                            <Checkbox
                                name='featured'
                                colorScheme='brown'
                                isChecked={currentFeature}
                                onChange={() => {
                                    setCurrentFeature(!currentFeature)
                                }}
                            >
                                Deal of the day
                            </Checkbox>
                        </FormControl>


                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            isLoading={loading}
                            loadingText='Updating Deal'
                            colorScheme='brown'
                            onClick={async() => {
                                setLoading(true);
                                const response = await updateDealOfTheDay(id);
                                setLoading(false);
                                onClose();
                                if(response.success) {
                                    return toast({
                                        position: 'top',
                                        description: response.message,
                                        status: 'success',
                                        duration: 5000,
                                        isClosable: true,
                                    })
                                } else {
                                    return toast({
                                        position: 'top',
                                        description: response.message,
                                        status: 'error',
                                        duration: 5000,
                                        isClosable: true,
                                    })
                                }
                            }}
                        >
                            Save
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateDealOfTheDayModal;
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
    Stack,
    InputGroup
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useDealOfTheDayContext } from '../context/dealoftheday_context';
import {useProductContext} from '../context/product_context';


function CreateNewDealOfTheDay() {


    const {
        new_dealOfTheDay: {
            name,
            status,
            products
        },
        udpateNewDealOfTheDetails,
        createNewDealOfTheDay
    } = useDealOfTheDayContext();

    const {
        productByName_loading,
        productByName_error,
        productByName,
        fetchProductByNameForDropdown
    } = useProductContext();

    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const [isProductDropdown, setProductDropdown] = useState(false);
    
    return (
        <>
            <Button 
            colorScheme="brown" 
            onClick={async() => {
                await fetchProductByNameForDropdown();
                onOpen();
            }}>
                Create New Deal
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new Deal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='Deal name'
                                name='name'
                                focusBorderColor='brown.500'
                                value={name}
                                onChange={udpateNewDealOfTheDetails}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={udpateNewDealOfTheDetails}
                            >
                                <option value={true}>active</option>
                                <option value={false}>Inactive</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Products</FormLabel>
                            <InputGroup>
                                <Input
                                    ref={initialRef}
                                    placeholder='products'
                                    name='products'
                                    focusBorderColor='brown.500'
                                    value={
                                        productByName.find(product => product._id === products)?.name || ''
                                    }
                                    readOnly
                                    // onClick={}
                                />
                            </InputGroup>
                        </FormControl>




                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

}

export default CreateNewDealOfTheDay;
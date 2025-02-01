import React, { useEffect, useRef, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    SimpleGrid,
    Spinner,
    useToast,
    HStack,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
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
    Textarea,
    Center,
    VStack,
    Checkbox,
    Select,
    Switch,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { UpdateDeliveryInstruction, DeliveryInstructionsPagination } from '../components';
import {useDeliveryInstructionContext} from '../context/deliveryInstruction_context';


function DeliveryInstructionsTable({ instructions = [] }) {

    const {
        fetchDeliveryInstruction,
        deliveryInstruction_loading,
        deliveryInstruction_error,
        deliveryInsturction: {
            minimumcart_amount='',
            delivery_charges='',
            initial_rewardpoint='',
            max_referral='',
            delivery_instruction=''
        },
        updateExistingDeliveryInstruction,
        updateDeliveryInstruction
    } = useDeliveryInstructionContext();

    const initialRef = useRef();
    const [saveButtonLoading, setSaveButtonLoading] = useState(false);
    const toast = useToast();


    useEffect(() => {
        fetchDeliveryInstruction();
    }, []);

    const handleUpdateButton = async () => {
        setSaveButtonLoading(true);
        if(
            !minimumcart_amount ||
            !delivery_charges ||
            !initial_rewardpoint ||
            !max_referral ||
            !delivery_instruction 
        ) {
            setSaveButtonLoading(false);
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        const updatedDeliveryInstruction = {
            minimumcart_amount,
            delivery_charges,
            initial_rewardpoint,
            max_referral,
            delivery_instruction 
        };
        const response = await updateDeliveryInstruction(updatedDeliveryInstruction);
        const {success, message} = response;
        if(success) {
            setSaveButtonLoading(false);
            toast({
                position: 'top',
                description: 'Update successfully',
                status: 'success',
                duration: 5000,
                isClosable: true
            });
            await fetchDeliveryInstruction();
        } else {
            setSaveButtonLoading(false);
            return toast({
                position: 'top',
                description: message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
    


        console.log(updatedDeliveryInstruction);
    }

    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
            <FormControl mt={4}>
                <FormLabel>Minimum cart amount</FormLabel>
                <Input
                    type='number'
                    placeholder='Minimum cart amount'
                    name='minimumcart_amount'
                    focusBorderColor='brown.500'
                    value={minimumcart_amount}
                    onChange={updateExistingDeliveryInstruction}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Delivery charges</FormLabel>
                <Input
                    type='number'
                    placeholder='Delivery charges'
                    name='delivery_charges'
                    focusBorderColor='brown.500'
                    value={delivery_charges}
                    onChange={updateExistingDeliveryInstruction}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Initial reward point</FormLabel>
                <Input
                    ref={initialRef}
                    type='number'
                    placeholder='Initial reward point'
                    name='initial_rewardpoint'
                    focusBorderColor='brown.500'
                    value={initial_rewardpoint}
                    onChange={updateExistingDeliveryInstruction}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Maximum referral amount allowed</FormLabel>
                <Input
                    ref={initialRef}
                    type='number'
                    placeholder='Initial reward point'
                    name='max_referral'
                    focusBorderColor='brown.500'
                    value={max_referral}
                    onChange={updateExistingDeliveryInstruction}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Delivery instructions</FormLabel>
                <Input
                    ref={initialRef}
                    type='text'
                    placeholder='Delivery instructions'
                    name='delivery_instruction'
                    focusBorderColor='brown.500'
                    value={delivery_instruction}
                    onChange={updateExistingDeliveryInstruction}
                />
            </FormControl>
            <FormControl mt={6}>
                <Button
                    isLoading={saveButtonLoading}
                    loadingText='Updating'
                colorScheme='brown'
                onClick={handleUpdateButton}
                >
                    Update
                </Button>
            </FormControl>
        </SimpleGrid>
    );
}

export default DeliveryInstructionsTable;
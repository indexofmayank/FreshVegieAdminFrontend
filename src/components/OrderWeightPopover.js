import React from "react";
import {
    Box,
    Button,
    Image,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    HStack,
    Text,
    Divider
  } from "@chakra-ui/react";
  
  const OrderWeightPopover = ({totalWeight, weightWiseOrder}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Button onClick={onOpen}>Weight   {totalWeight} Kg</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order Weight</ModalHeader>
            <ModalBody>
              <Box>
                <Heading size="sm" mb={4}>
                  Item Name
                </Heading>
                {weightWiseOrder.length > 0 ? (
                  weightWiseOrder.map((order, index) => {
                    const {name, image, quantity} = order;
                    return (
                      <HStack key={index} justifyContent="space-between" mb={3}>
                      <HStack>
                        <Image
                          src={image}
                          alt={name}
                          boxSize="40px"
                          borderRadius="md"
                        />
                        <Text>{name} Kg</Text>
                      </HStack>
                      <Text>{quantity} Kg</Text>
                    </HStack>
                    );
                  })
                ): (
                  <Text>No Items found</Text>
                )}
              </Box>
                <Divider/>
              <Text fontWeight="bold" mt={4}>
                Total Weight: {totalWeight} Kg
              </Text>
            </ModalBody>
            <Divider/>
            <ModalFooter>
              <Button colorScheme="red" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default OrderWeightPopover;
  
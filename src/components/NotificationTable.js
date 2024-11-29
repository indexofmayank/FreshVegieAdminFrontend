import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  SimpleGrid,
  Spinner,
  useToast,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Switch,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { UpdateNotificationModal } from "../components";
import { useNotificationContext } from "../context/notification_context";

function NotificationTable({ notifications }) {
    
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteNotification, fetchNotifications } = useNotificationContext();
  const [assetToDelete, setAssetToDelete] = useState({name: '', id: ''}); 
  const toast = useToast();


  useEffect(() => {
    console.log(assetToDelete)
  }, [assetToDelete]);


  const openDeleteModal = (name, _id) => {
    setAssetToDelete((prevState) => ({
      ...prevState,
      name: name,
      id: _id
    }));
    onOpen();
  }

  const loading = false;

  return (
    <SimpleGrid bg="white" p={5} shadow="lg" borderRadius="lg" overflowX="auto">
      {loading ? (
        <HStack my={8} alignItems="center" justifyContent="center">
          <Spinner size="lg" color="brown.500" />
        </HStack>
      ) : (
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Message</Th>
              <Th>Heading</Th>
              <Th>Banner</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => {
                const {
                  name,
                  banner,
                  status,
                  message,
                  heading,
                  _id,
                } = notification;
                return (
                  <Tr key={index}>
                    <Td>{name}</Td>
                    <Td>{message}</Td>
                    <Td>{heading}</Td>
                    <Td>
                      <Image
                        src={banner}
                        boxSize="50px"
                        objectFit="content"
                        borderRadius="lg"
                      />
                    </Td>
                    <Td>
                      <Switch colorScheme="green" isChecked={status} />
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                          Actions
                        </MenuButton>
                        <MenuList>
                          <MenuItem>
                            <UpdateNotificationModal id={_id} />
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              openDeleteModal(name, _id)
                            }}
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={6}> No Notification data found</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            {assetToDelete && (
              <Text>
                Are you sure you want to delete{" "}
                <strong>{assetToDelete.name}</strong>?
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={ async () => {
                const response = await deleteNotification(assetToDelete.id);
                console.log(response);
                if(response.success){
                  await fetchNotifications();
                  onClose();
                  return toast({
                    position: 'top',
                    description: `${assetToDelete.name} deleted successfully`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                  });
                } else {
                  onClose();
                  return toast({
                    position: 'top',
                    description: `${assetToDelete.name} deleting Unsuccessfully`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                  });
                }
              }} 
              ml={3}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
}

export default NotificationTable;

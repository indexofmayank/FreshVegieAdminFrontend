import React, { useState,useEffect } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSubCategoryContext } from '../context/subcategory_context';
import { useCategoryContext } from '../context/category_context';
import { UpdateSubCategoryModal } from '../components';
import Pagination from "./Pagination";

export const SubCategoryTable = ({ categories, pagination, setPagination }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { fetchCategory, deleteCategory } = useSubCategoryContext();
  const { fetchCategoryByName,categoriesByName } = useCategoryContext();
  const [assetToDelete, setAssetToDelete] = useState({ name: "", id: "" });
  const [loading, setLoading] = useState(false);

  const openDeleteModal = (name, _id) => {
    setAssetToDelete((prevState) => ({
      ...prevState,
      name: name,
      id: _id,
    }));
    onOpen();
  };

  useEffect(() => {
    fetchCategoryByName();
  },[])

  return (
    <SimpleGrid bg="white" p={5} shadow="lg" borderRadius="lg" overflowX="auto">
      {loading ? (
        <HStack my={8} alignItems="center" justifyContent="center">
          <Spinner size="lg" color="brown.500" />
        </HStack>
      ) : (
        <Table variant="striped" colorScheme="whiteAlpha" size="sm">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Sub category Name</Th>
              <Th>category Name</Th>
              <Th>Order</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.length > 0 ? (
              categories.map((categoryy, index) => {
                const { image, name,category, _id, status, order } = categoryy;
                const categoryObj = categoriesByName.data.find(cat => cat._id === category);
                const categoryName = categoryObj ? categoryObj.name : 'Unknown';
                return (
                  <Tr key={index}>
                    <Td>
                      <Image
                        src={image}
                        boxSize="60px"
                        objectFit="content"
                        borderRadius="lg"
                      />
                    </Td>
                    <Td>{name}</Td>
                    <Td>{categoryName}</Td>
                    <Td>{order}</Td>
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
                            <UpdateSubCategoryModal id={_id} />
                          </MenuItem>
                          <MenuItem onClick={() => openDeleteModal(name, _id)}>
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <></>
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
                This'll also delete all associate products
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={async () => {
                const response = await deleteCategory(assetToDelete.id);
                if (response.success) {
                  await fetchCategory();
                  onClose();
                  return toast({
                    position: "top",
                    description: `${assetToDelete.name} deleted successfully`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  await fetchCategory();
                } else {
                  onClose();
                  return toast({
                    position: "top",
                    description: `${assetToDelete.name} deleting Unsuccessfully`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </SimpleGrid>
  );
};

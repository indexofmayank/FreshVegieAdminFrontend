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
    Box,
    List,
    ListItem,
    InputGroup,
    InputRightElement,
    IconButton
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useBannerContext } from '../context/banner_context';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useNotificationContext } from '../context/notification_context';

function UpdateBannerModal({ id }) {
    const {
        single_banner: {
            name = '',
            status = '',
            image = '',
            redirect_to = "",
            specific_product = "",
            specific_category = ""
        },
        single_banner_loading,
        fetchBanner,
        fetchSingleBanner,
        updateExistingBannerDetails,
        updateBanner,
        
    } = useBannerContext();

    const {
        notificationProductName,
        fetchProductNameForNotification,
        notificationcategorieName,
        fetchCategoryNameForNotification,
    } = useNotificationContext();

    const [imageList, setImageList] = useState(image);
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();
    const handleRemoveImage = async () => {
        setImageList(null);
    };
    
    const handleSubmit = async () => {
        console.log(name); console.log(image); console.log(status);
        if(
            !name ||
            !status 
        ) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        if(imageList.length < 1) {
            return toast({
                position: 'top',
                description: 'Add atleast one image',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        setLoading(true);
        const specificProduct = (redirect_to == 'specific_product'?specific_product:'');
        const specificCategory = (redirect_to == 'category'?specific_category:'')
        const banner = {
            name,
            status,
            image: imageList,
            redirect_to,
            specific_product:specificProduct,
            specific_category:specificCategory
        };
        const responseCreate = await updateBanner(id, banner);
        setLoading(false);
        if(responseCreate.success) {
            onClose();
            toast({
                position: 'top',
                description: 'Banner updated',
                status: 'success',
                duration: 5000,
                isClosable: true
            });
            await fetchBanner();
        } else {
            return toast({
                position: 'top',
                description: responseCreate.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
    };

    const handleProductSelect = (product) => {
        updateExistingBannerDetails({
          target: {
            name: "specific_product",
            value: product._id,
          },
        });
        
        setDropdownOpen(false);
      };
    
      const handleCategorySelect = (name, _id) => {
        updateExistingBannerDetails({
          target: {
            name: "specific_category",
            value: _id,
          },
        });
    
        setCategoryDropdownOpen(false);
      };

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setImageList(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
    });
    useEffect(() => {
        setImageList(image);
    }, [single_banner_loading]);


    return (
        <>
            <Text
                colorScheme='brown'
                minW='100%'
                onClick={async () => {
                    fetchSingleBanner(id);
                    await fetchProductNameForNotification();
                    await fetchCategoryNameForNotification();
                    onOpen();
                }}
            >
                Edit
            </Text>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Banner</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='Banner name'
                                name='name'
                                focusBorderColor='brown.500'
                                value={name}
                                onChange={updateExistingBannerDetails}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={updateExistingBannerDetails}
                            >
                                <option value='true'>active</option>
                                <option value='false'>Inactive</option>
                            </Select>
                        </FormControl>
                        <FormControl>
              <FormLabel>Redirect To</FormLabel>
              <Select
                placeholder="Redirect To"
                name="redirect_to"
                focusBorderColor="brown.500"
                value={redirect_to}
                onChange={updateExistingBannerDetails}
              >
                <option key="1" value="specific_product">
                  Specific Product
                </option>
                <option key="2" value="category">
                  category
                </option>
              </Select>
            </FormControl>
            {redirect_to === "specific_product" && (
              <FormControl mt={4}>
                <FormLabel>Specific Product</FormLabel>
                <InputGroup>    
                  <Input
                    ref={initialRef}
                    placeholder="Select specific product"
                    name="specific_product"
                    focusBorderColor="brown.500"
                    value={
                      notificationProductName.find(
                        (product) => product._id === specific_product
                      )?.name || ""
                    }
                    readOnly
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Open dropdown"
                      icon={isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                      size="sm"
                      variant="ghost"
                      onClick={() => setDropdownOpen(!isDropdownOpen)}
                    />
                  </InputRightElement>
                </InputGroup>

                {isDropdownOpen && (
                  <Box
                    maxHeight="200px"
                    overflowY="auto"
                    borderWidth="1px"
                    borderRadius="md"
                    mt="2"
                    zIndex="10"
                    bg="white"
                    position="absolute"
                    width="100%"
                  >
                    <List spacing={3}>
                      {notificationProductName.map((product, index) => (
                        <ListItem
                          key={index}
                          onClick={() => handleProductSelect(product)}
                          cursor="pointer"
                          _hover={{ bg: "gray.100" }}
                          p="2"
                          borderWidth={
                            specific_product === product._id ? "1px" : "0"
                          }
                          borderColor={
                            specific_product === product._id
                              ? "brown.500"
                              : "transparent"
                          }
                          borderRadius="md"
                        >
                          {product.name}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </FormControl>
            )}
            {redirect_to === "category" && (
              <FormControl mt={4}>
                <FormLabel>Select category</FormLabel>
                <InputGroup>
                  <Input
                    ref={initialRef}
                    placeholder="Select specific category"
                    name="specific_category"
                    focusBorderColor="brown.500"
                    value={
                      notificationcategorieName.find((cat) => cat._id === specific_category)?.name || ""
                    }
                    // readOnly
                    onClick={() =>
                      setCategoryDropdownOpen(!isCategoryDropdownOpen)
                    }
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Open dropdown"
                      icon={
                        isCategoryDropdownOpen ? <FaAngleUp /> : <FaAngleDown />
                      }
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setCategoryDropdownOpen(!isCategoryDropdownOpen)
                      }
                    />
                  </InputRightElement>
                </InputGroup>
                {isCategoryDropdownOpen && (
                  <Box
                    maxHeight="200px"
                    overflowY="auto"
                    borderWidth="1px"
                    borderRadius="md"
                    mt="2"
                    zIndex="10"
                    bg="white"
                    position="absolute"
                    width="100%"
                  >
                    <List spacing={3}>
                      {notificationcategorieName.map((category, index) => {
                        const { _id, name } = category;
                        return (
                          <ListItem
                            key={index}
                            onClick={() => handleCategorySelect(name, _id)}
                            cursor="pointer"
                            _hover={{ bg: "gray.100" }}
                            p="2"
                            borderWidth={category === _id ? "1px" : "0"}
                            borderColor={
                              category === _id ? "brown.500" : "transparent"
                            }
                            borderRadius="md"
                          >
                            {category.name}
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                )}
              </FormControl>
            )}

                        <FormControl mt={4}>
                            <FormLabel>Images</FormLabel>
                            <Center
                                bg='brown.50'
                                minHeight={100}
                                my={5}
                                borderWidth={3}
                                borderColor='brown.200'
                                borderStyle='dashed'
                                borderRadius='lg'
                                {...getRootProps()}
                            >
                                {isDragActive ? (
                                    <p>Drag your files here</p>
                                ) : (
                                    <p>
                                        Drag drop image files here, or click to select files
                                        <br />
                                        (Only *.jpeg and *.png images will be accepted)
                                    </p>
                                )}
                            </Center>
                            <Input {...getInputProps()} />
                        </FormControl>
                        <FormControl mt={4}>
                            <HStack>
                                {imageList && (
                                    <VStack>
                                        <Image
                                            src={imageList}
                                            boxSize='70px'
                                            objectFit='cover'
                                            borderRadius='lg'
                                        />
                                        <Button
                                            size='xs'
                                            variant='outline'
                                            colorScheme='red'
                                            onClick={handleRemoveImage}
                                        >
                                            Remove
                                        </Button>
                                    </VStack>
                                )}
                            </HStack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            isLoading={loading}
                            loadingText='Updating Banner'
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

export default UpdateBannerModal;

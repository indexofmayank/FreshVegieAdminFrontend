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
    IconButton,
    InputGroup,
    InputRightElement,
    Box,
    List,
    ListItem
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useNotificationContext } from '../context/notification_context';
import { useBannerContext } from '../context/banner_context';

function CreateNewBannerModal() {

    const {
        new_banner: {
            name,
            image,
            status,
            redirect_to,
            specific_product,
            specific_category
        },
        createNewBanner,
        updateNewBannerDetails
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
    const intialRef = useRef();
    const toast = useToast();

    const handleProductSelect = (product) => {
        updateNewBannerDetails({
            target: {
                name: 'specific_product',
                value: product._id
            }
        });
        setDropdownOpen(false);
    };

    const handleCategorySelect = (name, _id) => {
        updateNewBannerDetails({
            target: {
                name: 'specific_category',
                value: _id
            }
        });

        setCategoryDropdownOpen(false);
    }

    const handleSubmit = async () => {
        console.log(name);
        console.log(status);
        console.log(imageList);
        if(
            !name ||
            !imageList ||
            !status
        ) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        if(imageList.length < 1) {
            return toast({
                position: 'top',
                description: 'Provied all the details',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        setLoading(true);
        console.log('uploading');
        const banner = {
            name,
            status,
            image: imageList,
            redirect_to,
            specific_product,
            specific_category
        };
        const responseCreate = await createNewBanner(banner);
        setLoading(false);
        if(responseCreate.success) {
            onClose();
            return toast({
                position: 'top',
                description: 'Banner created',
                status: 'success',
                duration: 5000,
                isClosable: true
            });
        } else {
            return toast({
                position: 'top',
                description: responseCreate.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
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


    return (
        <>
            <Button colorScheme="brown"
              onClick={async () => {
                 await fetchProductNameForNotification();
                 await fetchCategoryNameForNotification();
                 onOpen()
                }}>
                Create New Banner
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new banner</ModalHeader>
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
                                onChange={updateNewBannerDetails}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={updateNewBannerDetails}
                            >
                                <option value={true}>active</option>
                                <option value={false}>Inactive</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Redirect To</FormLabel>
                            <Select
                                placeholder='Redirect To'
                                name='redirect_to'
                                focusBorderColor='brown.500'
                                value={redirect_to}
                                onChange={updateNewBannerDetails}
                            >
                                <option key='1' value='specific_product'>Specific Product</option>
                                <option key='2' value='category'>category</option>
                                {/* <option key='3' value='link'>Link</option> */}
                            </Select>
                        </FormControl>
                        {redirect_to === 'specific_product' && (
                            <FormControl mt={4}>
                                <FormLabel>Specific Product</FormLabel>
                                <InputGroup>
                                    <Input
                                        ref={intialRef}
                                        placeholder='Select specific product'
                                        name='specific_product'
                                        focusBorderColor='brown.500'
                                        value={
                                            notificationProductName.find(product => product._id === specific_product)?.name || ''
                                        }
                                        readOnly
                                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            aria-label='Open dropdown'
                                            icon={isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                                            size='sm'
                                            variant='ghost'
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
                                                    _hover={{ bg: 'gray.100' }}
                                                    p="2"
                                                    borderWidth={specific_product === product._id ? '1px' : '0'}
                                                    borderColor={specific_product === product._id ? 'brown.500' : 'transparent'}
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

                        {redirect_to === 'category' && (
                            <FormControl mt={4}>
                                <FormLabel>Select category</FormLabel>
                                <InputGroup>
                                    <Input
                                        ref={intialRef}
                                        placeholder='Select specific category'
                                        name='specific_category'
                                        focusBorderColor='brown.500'
                                        value={notificationcategorieName.find(cat => cat._id === specific_category)?.name || ''}
                                        readOnly
                                        onClick={() => setCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                    />
                                    <InputRightElement>
                                        <IconButton         
                                            aria-label='Open dropdown'
                                            icon={isCategoryDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                                            size='sm'
                                            variant='ghost'
                                            onClick={() => setCategoryDropdownOpen(!isCategoryDropdownOpen)}
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
                                                        _hover={{ bg: 'gray.100' }}
                                                        p="2"
                                                        borderWidth={category === _id ? '1px' : '0'}
                                                        borderColor={category === _id ? 'brown.500' : "transparent"}
                                                        borderRadius="md"
                                                    >
                                                        {name}
                                                    </ListItem>
                                                )
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
                            {imageList && (
                                <Center>
                                    <Image src={imageList} alt="Category" maxH="200px" my={3} />
                                </Center>
                            )}
                            <Input {...getInputProps()} />
                        </FormControl>


                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            isLoading={loading}
                            loadingText='Creating Banner'
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

export default CreateNewBannerModal;                            

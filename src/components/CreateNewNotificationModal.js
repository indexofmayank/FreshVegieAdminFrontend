import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    Box,
    Button,
    List,
    ListItem,
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
    input,
    InputGroup,
    InputRightElement,
    useToast,
    Textarea,
    Center,
    HStack,
    Image,
    VStack,
    Checkbox,
    Radio,
    RadioGroup,
    Stack,
    IconButton,
    Badge,
    CloseButton
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useNotificationContext } from '../context/notification_context';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Select from 'react-select';
import {getFilteredUserNameForNotification_url} from '../utils/constants';


function CreateNewNotificationModal() {

    const {
        new_notification: {
            name,
            heading,
            message,
            redirect_to,
            specific_product,
            specific_category,
            link,
            audience,
            branch,
            customFilters,
            customers,
            status,
            image
        },
        createNewNotification,
        udpateNewNotificationDetails,
        notificationProductName_loading,
        notificationProductName_error,
        notificationProductName,
        fetchProductNameForNotification,
        categoryName_loading,
        categoryName_error,
        notificationcategorieName,
        fetchCategoryNameForNotification,
        userName_loading,
        userName_error,
        userName,
        fetchUserNameForNotification
    } = useNotificationContext();

    const redirectooptions = [
        { value: 'specific_product', label: 'Specific Product' },
        { value: 'category', label: 'category' },
      ]
      const statusoptions = [
        { value: true, label: 'active' },
        { value: false, label: 'Inactive' },
      ]
      const customfilter = [
        { value: 'zeroOrders', label: 'New user' },
        { value: 'moreThanOneOrder', label: 'Active user' },
        { value: 'all', label: 'All' },
      ]

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

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png'
    });
    const intialRef = useRef();
    const [imageList, setImageList] = useState(image);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [isUsernameDropdownOpen, setUsernameDropdownOpen] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [redirect_too, setRedirect_too] = useState('');
    const [selectedproduct, setSelectedproduct] = useState('');
    const [selectedcategory, setSelectedcategory] = useState('');
    const [handleSubmitLoading, setHandleSubmitLoading] = useState(false);
    const [selectedCustomFilter, setSelectedCustomFilter] = useState(null);
    const toast = useToast();

    const onRedirecttoSelect = (event) => {
        setRedirect_too(event.value)
        udpateNewNotificationDetails({
            target: {
                name: 'redirect_to',
                value: event.value
            }
        });
    }
    const onStatusSelect = (event) => {
        udpateNewNotificationDetails({
            target: {
                name: 'status',
                value: event.value
            }
        });
    }
    const oncustomfilterSelect = (event) => {
        udpateNewNotificationDetails({
            target: {
                name: 'customFilters',
                value: event.value
            }
        });
    }
    


    const handleSubmit = async () => {
        console.log(name);
        console.log(heading);
        console.log(message);
        console.log(redirect_to);
        console.log(specific_product);
        console.log(selectedCustomers);
        console.log(link);
        console.log(audience);
        console.log(branch);
        console.log(customFilters);
        console.log(status);
        console.log(imageList);

        if (
            !name ||
            !imageList ||
            !status ||
            !heading ||
            !message 
        ) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: 5000,
                isClosable: true
            });
        }
        if (imageList.length < 1) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        setHandleSubmitLoading(true);
        const specificProduct = (redirect_to == 'specific_product'?specific_product:'');
        const specificCategory = (redirect_to == 'category'?specific_category:'')
        const notification = {
            name,
            heading,
            message,
            redirect_to,
            specific_product:specificProduct,
            specific_category:specificCategory,
            link,
            audience,
            branch,
            customFilters,
            customers: selectedCustomers,
            status,
            image: imageList
        }
        const responseCreate = await createNewNotification(notification);
        setHandleSubmitLoading(false);
        if (responseCreate.success) {
            onClose();
            return toast({
                position: 'top',
                description: 'Notification created',
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
                isClosable: true
            });
        }
    }

    const handleProductSelect = (event) => {
        udpateNewNotificationDetails({
            target: {
                name: 'specific_product',
                value: event._id
            }
        });

        setSelectedproduct(event);
    };

    const handleUserSelect = (name, _id) => {
        setSelectedCustomers(prevState => [...prevState, { _id, name }]);
        udpateNewNotificationDetails({
            target: {
                name: 'customer',
                value: _id
            }
        });

        // setUsernameDropdownOpen(false);

    }

    const handleCategorySelect = (event) => {

        udpateNewNotificationDetails({
            target: {
                name: 'specific_category',
                value: event._id
            }
        });

        setSelectedcategory(event);
    }

    const handleRemoveCustomer = (_id) => {
        setSelectedCustomers(prevState =>
            prevState.filter(customer => customer._id !== _id)
        );
    }


    useEffect(() => {
        console.log(customFilters)
        const loadData = async () => {
            const filter = customFilters
            await fetchUserNameForNotification(filter)
        }
        loadData();
    }, [customFilters]);

    return (
        <>
            <Button colorScheme='brown'
                onClick={async () => {
                    await fetchProductNameForNotification();
                    await fetchCategoryNameForNotification();
                    await fetchUserNameForNotification();
                    onOpen();
                }}>
                Create New Notification
            </Button>

            <Modal initialFocusRef={intialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new nofitication</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={intialRef}
                                placeholder='Notification name'
                                name='name'
                                focusBorderColor='brown.500'
                                value={name}
                                onChange={udpateNewNotificationDetails}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            {/* <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={udpateNewNotificationDetails}
                            >
                            <option value={true}>active</option>
                            <option value={false}>inactive</option>
                            </Select> */}
                             <Select options={statusoptions} name="status"  onChange={onStatusSelect} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Heading</FormLabel>
                            <Input
                                placeholder='Heading'
                                name='heading'
                                focusBorderColor='brown.500'
                                value={heading}
                                onChange={udpateNewNotificationDetails}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Message</FormLabel>
                            <Input
                                placeholder='Message'
                                name='message'
                                focusBorderColor='brown.500'
                                value={message}
                                onChange={udpateNewNotificationDetails}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Redirect To</FormLabel>
                            {/* <Select
                                placeholder='Redirect To'
                                name='redirect_to'
                                focusBorderColor='brown.500'
                                value={redirect_to}
                                onChange={udpateNewNotificationDetails}
                            >
                                <option key='1' value='specific_product'>Specific Product</option>
                                <option key='2' value='category'>category</option>
                               
                            </Select> */}
                             <Select options={redirectooptions} name="redirect_to"  onChange={onRedirecttoSelect} />
                        </FormControl>

                        {redirect_to === 'specific_product' && (
                            <FormControl mt={4}>
                                <FormLabel>Specific Product</FormLabel>
                                
                                <Select 
                                    getOptionLabel={option =>
                                        `${option.name}`
                                        } 
                                        value={selectedproduct}
                                        onChange={handleProductSelect}
                                        // onChange={this.handleSelect}
                                        // getOptionValue={option => `${option}`}
                                        getOptionValue={(option) => option._id} 
                                        options={notificationProductName}
                                        isSearchable={true}
                                        // filterOption={this.customFilter}
                                        // onInputChange={this.handleInputChange}
                                        noOptionsMessage={() => null}
                                        placeholder={'Enter product name'}
                                        autoFocus={true}
                                        // menuIsOpen={this.state.menuOpen}
                                        />
                               
                            </FormControl>
                        )}

                        {redirect_to === 'category' && (
                            <FormControl mt={4}>
                                <FormLabel>Select category</FormLabel>
                                <Select 
                                    getOptionLabel={option =>
                                        `${option.name}`
                                        } 
                                        value={selectedcategory}
                                        onChange={handleCategorySelect}
                                        getOptionValue={(option) => option._id} 
                                        options={notificationcategorieName}
                                        isSearchable={true}
                                        // filterOption={this.customFilter}
                                        noOptionsMessage={() => null}
                                        placeholder={'Enter category name'}
                                        autoFocus={true}
                                        // menuIsOpen={this.state.menuOpen}
                                        /> 
                            </FormControl>
                        )}

                        {/* {redirect_to === 'link' && (
                            <FormControl>
                                <FormLabel>Link</FormLabel>
                                <Input
                                    placeholder='link'
                                    name='link'
                                    focusBorderColor='brown.500'
                                    value={link}
                                    onChange={udpateNewNotificationDetails}
                                />
                            </FormControl>

                        )} */}

                        {/* <FormControl>
                            <FormLabel>Audience</FormLabel>
                            <Select
                                placeholder='audience'
                                name='audience'
                                focusBorderColor='brown.500'
                                value={audience}
                                onChange={udpateNewNotificationDetails}
                            >
                                <option key='1' value='branch'>Branch</option>
                                <option key='2' value='custom'>Custom</option>
                            </Select>
                        </FormControl> */}

                        {audience === 'custom' && (
                            <FormControl>
                                <FormLabel>Custom Filter</FormLabel>
                                {/* <Select
                                    placeholder='Select Filter'
                                    name='customFilters'
                                    focusBorderColor='brown.500'
                                    value={customFilters}
                                    onChange={udpateNewNotificationDetails}
                                >
                                    <option key='2' value='zeroOrders'>New user</option>
                                    <option key='3' value='moreThanOneOrder'>Active user</option>
                                    <option key='4' value='all'>All</option>
                                </Select> */}
                                 <Select options={customfilter} name="customFilters"  onChange={oncustomfilterSelect} />
                                
                            </FormControl>
                         )}

                        {/* {audience === 'branch' && (
                            <FormControl>
                                <FormLabel>Branch</FormLabel>
                                <Select
                                    placeholder='branch'
                                    name='branch'
                                    focusBorderColor='brown.500'
                                    value={branch}
                                    onChange={udpateNewNotificationDetails}
                                >
                                    <option key='1' value='all_branch'>All Branch</option>
                                    <option key='2' value='uttar_pradesh'>Uttar Pradesh</option>
                                </Select>

                            </FormControl>
                        )} */}

                        {/* {audience && (
                            <FormControl mt={4}>
                                <FormLabel>Customers</FormLabel>
                                <InputGroup>
                                    <Input
                                        ref={intialRef}
                                        placeholder='Customer'
                                        name='customer'
                                        focusBorderColor='brown.500'
                                        value={
                                            userName?.users.find(user => user._id === customers)?.name || ''
                                        }
                                        readOnly
                                        onClick={() => setUsernameDropdownOpen(!isUsernameDropdownOpen)}
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            aria-label='Open dropdown'
                                            icon={isUsernameDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                                            size='sm'
                                            variant='ghost'
                                            onClick={() => setUsernameDropdownOpen(!isCategoryDropdownOpen)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <Box mt={2} display="flex" flexWrap="wrap">
                                    {selectedCustomers.map((customer, index) => {
                                        const { _id, name } = customer;
                                        return (
                                            <Badge
                                                key={index}
                                                mr={1}
                                                mb={1}
                                                variant="solid"
                                                colorScheme="brown"
                                                borderRadius="full"
                                                px={2}
                                                display="flex"
                                                alignItems="center"
                                            >
                                                {name}
                                                <CloseButton
                                                    size='sm'
                                                    ml={2}
                                                    onClick={() => handleRemoveCustomer(customer._id)}
                                                />
                                            </Badge>
                                        )
                                    })}
                                </Box>
                                {isUsernameDropdownOpen && (
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
                                            {userName?.users.map((user, index) => {
                                                const { _id, name } = user;
                                                return (
                                                    <ListItem
                                                        key={index}
                                                        onClick={() => handleUserSelect(name, _id)}
                                                        cursor="pointer"
                                                        _hover={{ bg: 'gray.100' }}
                                                        p="2"
                                                        borderWidth={customers === _id ? '1px' : '0'}
                                                        borderColor={customers === _id ? 'brown.500' : 'transparent'}
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
                        )} */}


                        <FormControl>
                            <FormLabel>Banner</FormLabel>
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
                                    <Image src={imageList} alt='name' maxH='200px' my={3} />
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
                            isLoading={handleSubmitLoading}
                            loadingText='Creating Notification'
                            colorScheme='brown'
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );


}

export default CreateNewNotificationModal;
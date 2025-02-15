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
import Select from 'react-select';

function CreateNewBannerModal() {

    const {
        new_banner: {
            name,
            image,
            status,
            specific_product,
            specific_category
        },
        createNewBanner,
        updateNewBannerDetails
    } = useBannerContext();

    const redirectooptions = [
        { value: 'specific_product', label: 'Specific Product' },
        { value: 'category', label: 'category' },
      ]
      const statusoptions = [
        { value: true, label: 'active' },
        { value: false, label: 'Inactive' },
      ]
    const {
        notificationProductName,
        fetchProductNameForNotification,
        notificationcategorieName,
        fetchCategoryNameForNotification,
    } = useNotificationContext();

    const [imageList, setImageList] = useState(image);
    const [loading, setLoading] = useState(false);
    const [redirect_to, setRedirect_to] = useState('');
    const [selectedproduct, setSelectedproduct] = useState('');
    const [selectedcategory, setSelectedcategory] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const intialRef = useRef();
    const toast = useToast();

    const onRedirecttoSelect = (event) => {
        // console.log(event)
        // console.log(event.value)
        // console.log(event.label)
        setRedirect_to(event.value)
        updateNewBannerDetails({
            target: {
                name: 'redirect_to',
                value: event.value
            }
        });
        // const userId = event._id;
        // setRedirect_to()
    }
    const onStatusSelect = (event) => {
        // console.log(event)
        // console.log(event.value)
        // console.log(event.label)
        // setRedirect_to(event.value)
        updateNewBannerDetails({
            target: {
                name: 'status',
                value: event.value
            }
        });
        // const userId = event._id;
        // setRedirect_to()
    }

    

    const handleProductSelect = (event) => {
        console.log(event)
        updateNewBannerDetails({
            target: {
                name: 'specific_product',
                value: event._id
            }
        });
        setSelectedproduct(event);
    };

    const handleCategorySelect = (event) => {
        updateNewBannerDetails({
            target: {
                name: 'specific_category',
                value: event._id
            }
        });
        setSelectedcategory(event);
    }
    // console.log(notificationProductName)
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
        console.log(banner);
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
                            <Select options={statusoptions} name="status"  onChange={onStatusSelect} />
                            {/* <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={updateNewBannerDetails}
                            >
                                <option value={true}>active</option>
                                <option value={false}>Inactive</option>
                            </Select> */}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Redirect To</FormLabel>
                            {/* <Select
                                placeholder='Redirect To'
                                name='redirect_to'
                                focusBorderColor='brown.500'
                                value={redirect_to}
                                onChange={updateNewBannerDetails}
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

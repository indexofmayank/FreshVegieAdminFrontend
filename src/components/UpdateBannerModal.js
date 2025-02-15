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
import Select from 'react-select';
function UpdateBannerModal({ id }) {
    const {
        single_banner: {
            name = '',
            status = '',
            image = '',
            redirect_to = '',
            specific_product = "",
            specific_category = ""
        },
        single_banner_loading,
        fetchBanner,
        fetchSingleBanner,
        updateExistingBannerDetails,
        updateBanner,
        
    } = useBannerContext();

    const redirectooptions = [
      { value: 'specific_product', label: 'Specific Product' },
      { value: 'category', label: 'category' },
    ]
    const statusoptions = [
      { value: true, label: 'active' },
      { value: false, label: 'Inactive' },
    ]
// console.log(updateExistingBannerDetails);
    const {
        notificationProductName,
        fetchProductNameForNotification,
        notificationcategorieName,
        fetchCategoryNameForNotification,
    } = useNotificationContext();

    const [imageList, setImageList] = useState(image);
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [redirect_too, setRedirect_too] = useState('');
    const [selectedproduct, setSelectedproduct] = useState('');
    const [selectedcategory, setSelectedcategory] = useState('');
    const [selectedstatus, setSelectedstatus] = useState(false);
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
            !name || !redirect_to

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

    const onRedirecttoSelect = (event) => {
      setRedirect_too(event)
      updateExistingBannerDetails({
          target: {
              name: 'redirect_to',
              value: event.value
          }
      });
     
  }
  const onStatusSelect = (event) => {
    setSelectedstatus(event)
    updateExistingBannerDetails({
          target: {
              name: 'status',
              value: event.value
          }
      });
  }

    const handleProductSelect = (event) => {
      setSelectedproduct(event);
        updateExistingBannerDetails({
          target: {
            name: "specific_product",
            value: event._id,
          },
        });
        // setDropdownOpen(false);
      };
    
      const handleCategorySelect = (event) => {
        updateExistingBannerDetails({
          target: {
            name: "specific_category",
            value: event._id,
          },
        });
        setSelectedcategory(event);
        // setCategoryDropdownOpen(false);
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

    useEffect(() => {
      if(notificationcategorieName.length >0){
        const selectedcategory = notificationcategorieName.find(
          (category) => category._id === specific_category
      );
      setSelectedcategory(selectedcategory)
      }
      if(notificationProductName.length >0){
        const selectedproductt = notificationProductName.find(
          (product) => product._id === specific_product
         );
        setSelectedproduct(selectedproductt)
      }
      if(redirect_to){
        const selectedoption = redirectooptions.find(
          (redirectoption) => redirectoption.value === redirect_to
         );
        setRedirect_too(selectedoption)
      }

      if(status){
        const selectedstatus = statusoptions.find(
          (statusoption) => statusoption.value === status
         );
         setSelectedstatus(selectedstatus)
      }

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
                            <Select options={statusoptions} value={selectedstatus} name="status"  onChange={onStatusSelect} />
                            {/* <Select
                                placeholder='Select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={updateExistingBannerDetails}
                            >
                                <option value='true'>active</option>
                                <option value='false'>Inactive</option>
                            </Select> */}
                        </FormControl>
                        <FormControl>
              <FormLabel>Redirect To</FormLabel>
              <Select options={redirectooptions}  value={redirect_too} name="redirect_to"  onChange={onRedirecttoSelect} />
              {/* <Select
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
              </Select> */}
            </FormControl>
            {redirect_to === "specific_product" && (
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
            {redirect_to === "category" && (
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

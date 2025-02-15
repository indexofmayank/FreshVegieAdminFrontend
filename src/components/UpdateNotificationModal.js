import React, { useState, useRef, useCallback, useEffect } from "react";
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
  CloseButton,
  Text,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useNotificationContext } from "../context/notification_context";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Select from 'react-select';

function UpdateNotificationModal({ id }) {
  const {
    single_notification: {
      name = "",
      heading = "",
      message = "",
      redirect_to = "",
      specific_product = "",
      specific_category = "",
      link = "",
      audience = "",
      branch = "",
      customFilters = "",
      customers = "",
      status = "",
      banner = "",
      lastLive = "",
    },
    single_notification_loading,
    single_notification_error,
    fetchSingleNotification,
    updateExistingNotificationDetails,
    fetchProductNameForNotification,
    notificationProductName_loading,
    // notificationProductName_error,
    notificationProductName,
    // categoryName_loading,
    // categoryName_error,
    notificationcategorieName,
    fetchCategoryNameForNotification,
    // userName_loading,
    // userName_error,
    // userName,
    // fetchUserNameForNotification,
    updateNotification,
    fetchNotifications
  } = useNotificationContext();

  const redirectooptions = [
    { value: 'specific_product', label: 'Specific Product' },
    { value: 'category', label: 'category' },
  ]
  const statusoptions = [
    { value: "true", label: 'active' },
    { value: "false", label: 'Inactive' },
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
    accept: "image/jpeg, image/png",
  });

  const initialRef = useRef();
  const toast = useToast();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [imageList, setImageList] = useState(banner);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isUsernameDropdownOpen, setUsernameDropdownOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [redirect_too, setRedirect_too] = useState('');
  const [selectedproduct, setSelectedproduct] = useState('');
  const [selectedcategory, setSelectedcategory] = useState('');
  const [selectedstatus, setSelectedstatus] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setImageList(banner);
    // setSelectedCustomers(prevState=>([...prevState, ...customers]));
  }, [single_notification_loading]);


  // useEffect(() => {
  //   if (redirect_to === "specific_product") {
  //     fetchProductNameForNotification();
  //   }
  //   if (redirect_to === "category") {
  //     fetchCategoryNameForNotification();
  //   }
  // }, [redirect_to]);

  // useEffect(() => {
  //   const loadData = async () => {
  //     const filter = customFilters;
  //     await fetchUserNameForNotification(filter);
  //   };
  //   loadData();
  // }, [customFilters]);

  const onRedirecttoSelect = (event) => {
    setRedirect_too(event)
    updateExistingNotificationDetails({
        target: {
            name: 'redirect_to',
            value: event.value
        }
    });
   
}
const onStatusSelect = (event) => {
  setSelectedstatus(event)
  updateExistingNotificationDetails({
        target: {
            name: 'status',
            value: event.value
        }
    });
}


  const handleRemoveImage = async () => {
    setImageList(null);
  };

  const handleProductSelect = (event) => {
    updateExistingNotificationDetails({
      target: {
        name: "specific_product",
        value: event._id,
      },
    });
    setSelectedproduct(event);
  };

  const handleCategorySelect = (event) => {
    updateExistingNotificationDetails({
      target: {
        name: "specific_category",
        value: event._id,
      },
    });
    setSelectedcategory(event);
  };

  useEffect(() => {
    // console.log(status)
    // console.log(notificationcategorieName.length)
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
      // console.log(selectedproductt);
      // console.log(notificationProductName);
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

}, [notificationProductName_loading]);

  // const handleUserSelect = (name, _id) => {
  //   setSelectedCustomers((prevState) => [...prevState, { _id, name }]);
  //   updateExistingNotificationDetails({
  //     target: {
  //       name: "customer",
  //       value: _id,
  //     },
  //   });
  // };

  // const handleRemoveCustomer = (_id) => {
  //   setSelectedCustomers((prevState) =>
  //     prevState.filter((customer) => customer._id !== _id)
  //   );
  // };

  const handleSubmit = async () => {

    console.log('name', name);
    console.log('heading', heading);
    console.log('message', message);
    console.log('redirect_to', redirect_to);
    console.log('specific_product', specific_product);
    console.log('category', specific_category);
    console.log('link', link);
    console.log('audience', audience);
    console.log('branch', branch);
    console.log('customFilters', customFilters);
    console.log('customers', customers);
    console.log('status', status);
    console.log('banner', banner);
    console.log('lastLive', lastLive); 


    if(
      !name ||  
      !banner ||
      !redirect_to
    ) {
      return toast({
        position: 'top',
        description: 'Provide all the details',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    if(!imageList) {
      return toast({
        position: 'top',
        description: 'Add atleast one image',
        status: 'error',
        duration: 5000,
        duration: 5000,
        isClosable: true
      });
    }
    setLoading(true);
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
      customers,
      status,
      banner: imageList,
      lastLive
    }
    const responseCreate = await updateNotification(id, notification);
    setLoading(false);
    if(responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'Notification udpated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchNotifications();
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

  return (
    <>
      <Text
        colorScheme="brown"
        minW="100%"
        onClick={async () => {
          await fetchSingleNotification(id);    
          await fetchProductNameForNotification();
          await fetchCategoryNameForNotification();
          // await fetchUserNameForNotification();
          onOpen();
        }}
      >
        Edit
      </Text>
      <Modal initialRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Notification name"
                name="name"
                focusBorderColor="brown.500"
                value={name}
                onChange={updateExistingNotificationDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              {/* <Select
                placeholder="Select status"
                name="status"
                focusBorderColor="brown.500"
                value={status}
                onChange={updateExistingNotificationDetails}
              >
                <option value={true}>active</option>
                <option value={false}>inactive</option>
              </Select> */}
               <Select options={statusoptions} value={selectedstatus} name="status"  onChange={onStatusSelect} />
            </FormControl>
            <FormControl>
              <FormLabel>Heading</FormLabel>
              <Input
                placeholder="Heading"
                name="heading"
                focusBorderColor="brown.500"
                value={heading}
                onChange={updateExistingNotificationDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Message</FormLabel>
              <Input
                placeholder="Message"
                name="message"
                focusBorderColor="brown.500"
                value={message}
                onChange={updateExistingNotificationDetails}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Redirect To</FormLabel>
              {/* <Select
                placeholder="Redirect To"
                name="redirect_to"
                focusBorderColor="brown.500"
                value={redirect_to}
                onChange={updateExistingNotificationDetails}
              >
                <option key="1" value="specific_product">
                  Specific Product
                </option>
                <option key="2" value="category">
                  category
                </option>
              </Select> */}
               <Select options={redirectooptions}  value={redirect_too} name="redirect_to"  onChange={onRedirecttoSelect} />
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
            {/* {redirect_to === "link" && (
              <FormControl>
                <FormLabel>Link</FormLabel>
                <Input
                  placeholder="link"
                  name="link"
                  focusBorderColor="brown.500"
                  value={link}
                  onChange={updateExistingNotificationDetails}
                />
              </FormControl>
            )} */}

            {/* <FormControl>
              <FormLabel>Audience</FormLabel>
              <Select
                placeholder="audience"
                name="audience"
                focusBorderColor="brown.500"
                value={audience}
                onChange={updateExistingNotificationDetails}
              >
                <option key="1" value="branch">
                  Branch
                </option>
                <option key="2" value="custom">
                  Custom
                </option>
              </Select>
            </FormControl> */}

            {audience === "custom" && (
              <FormControl>
                <FormLabel>Custom Filter</FormLabel>
                <Select
                  placeholder="Select Filter"
                  name="customFilters"
                  focusBorderColor="brown.500"
                  value={customFilters}
                  onChange={updateExistingNotificationDetails}
                >
                  <option key="2" value="zeroOrders">
                    New user
                  </option>
                  <option key="3" value="moreThanOneOrder">
                    Active user
                  </option>
                  <option key="4" value="all">
                    All
                  </option>
                </Select>
              </FormControl>
            )}
            {/* {audience === "branch" && (
              <FormControl>
                <FormLabel>Branch</FormLabel>
                <Select
                  placeholder="branch"
                  name="branch"
                  focusBorderColor="brown.500"
                  value={branch}
                  onChange={updateExistingNotificationDetails}
                >
                  <option key="1" value="all_branch">
                    All Branch
                  </option>
                  <option key="2" value="uttar_pradesh">
                    Uttar Pradesh
                  </option>
                </Select>
              </FormControl>
            )}

            {audience && (
              <FormControl mt={4}>
                <FormLabel>Customers</FormLabel>
                <InputGroup>
                  <Input
                    ref={initialRef}
                    placeholder="Customer"
                    name="customer"
                    focusBorderColor="brown.500"
                    // value={}
                    readOnly
                    onClick={() =>
                      setUsernameDropdownOpen(!isUsernameDropdownOpen)
                    }
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Open dropdown"
                      icon={
                        isUsernameDropdownOpen ? <FaAngleUp /> : <FaAngleDown />
                      }
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setUsernameDropdownOpen(!isUsernameDropdownOpen)
                      }
                    />
                  </InputRightElement>
                </InputGroup>
                <Box mt={2} display="flex" flexWrap="wrap">
                  {selectedCustomers.map((data, index) => {
                    const { _id, name } = data || {};
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
                          size="sm"
                          ml={2}
                          onClick={() => handleRemoveCustomer(data._id)}
                        />
                      </Badge>
                    );
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
                            _hover={{ bg: "gray.100" }}
                            p="2"
                            borderWidth={customers === _id ? "1px" : "0"}
                            borderColor={
                              customers === _id ? "brown.500" : "transparent"
                            }
                            borderRadius="md"
                          >
                            {name}
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                )}
              </FormControl>
            )} */}
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Center
                bg="brown.50"
                minHeight={100}
                my={5}
                borderWidth={3}
                borderColor="brown.200"
                borderStyle="dashed"
                borderRadius="lg"
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
                      boxSize="70px"
                      objectFit="cover"
                      borderRadius="lg"
                    />
                    <Button
                      size="xs"
                      variant="outline"
                      colorScheme="red"
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
            colorScheme="brown"
            loadingText="Updating Notification"
            isLoading={loading}
            onClick={handleSubmit}
            >Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateNotificationModal;

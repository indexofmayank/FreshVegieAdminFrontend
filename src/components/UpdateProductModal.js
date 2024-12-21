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
  Text,
  Stack,
  Radio,
  RadioGroup,
  Select,
  onOpen,
  toast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useProductContext } from '../context/product_context';
import { useCategoryContext } from '../context/category_context';

function UpdateProductModal({ id }) {
  const {
    single_productForUpdate: {
      name = '',
      price = '',
      offer_price = '',
      purchase_price = '',
      stock = '',
      information = '',
      description = '',
      status = '',
      category = '',
      add_ons = '',
      search_tags = '',
      selling_method = '',
      sku = '',
      barcode = '',
      stock_notify = '',
      tax = '',
      product_detail_max = '',
      product_detail_min = '',
      increment_value = '',
      featured = '',
      product_status = '',
      variant_type = '',
      variant_value = '',
      product_weight_type = '',
      product_weight = '',
      images = [],
    },
    single_productForUpdate_loading,
    single_productForUpdate_error,
    fetchSingleProductForUpdate,
    updateExistingProductDetails,
    updateProduct,
    fetchProducts,
  } = useProductContext();

  const {
    categoriesByName,
    fetchCategoryByName,
    fetchSingleCategory,
    single_category
  } = useCategoryContext();



  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const initialRef = useRef();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        // Append the new image to the existing array
        setImageList((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  useEffect(() => {
    setImageList(images);
  }, [single_productForUpdate_loading]);

  const removeImage = (index) => {
    setImageList((prev) => {
      prev.splice(index, 1);
      console.log(prev);
      return [...prev];
    });
  };

  const handleSubmit = async () => {
    console.log(name);
    console.log(product_status);
    console.log(price);
    console.log(offer_price);
    console.log(purchase_price);
    console.log(stock);
    console.log(description);
    console.log(category);
    console.log(add_ons);
    console.log(search_tags);
    console.log(selling_method);
    console.log(sku);
    console.log(barcode);
    console.log(stock_notify);
    console.log(tax);
    console.log(product_detail_max);
    console.log(product_detail_min);
    console.log(increment_value);
    console.log(imageList);
    if (
      !name ||
      !product_status ||
      !price ||
      !offer_price ||
      !purchase_price ||
      !stock ||
      // !description ||
      // !information ||
      !category ||
      // !add_ons ||
      // !search_tags ||
      !selling_method ||
      // !sku ||
      // !barcode ||
      !stock_notify ||
      // !tax ||
      !product_detail_min ||
      !product_detail_max ||
      !increment_value ||
      !imageList
    ) {
      return toast({
        position: 'top',
        description: 'Provide all the details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (imageList.length < 1) {
      return toast({
        position: 'top',
        description: 'Add atleast one image',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(true);
    const product = {
      name,
      product_status,
      price,
      offer_price,
      stock,
      information,
      description,
      category,
      add_ons,
      selling_method,
      sku,
      purchase_price,
      barcode,
      search_tags,
      stock_notify,
      tax,
      product_detail_max,
      product_detail_min,
      increment_value,
      featured,
      product_weight_type,
      product_weight,
      images: imageList,
    };
    const responseCreate = await updateProduct(id, product)
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'Product updated',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      await fetchProducts();
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
  const { data = [] } = categoriesByName;

  return (
    <>
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
          fetchSingleProductForUpdate(id)
          onOpen();
        }}
      >
        Edit
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name*</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Product Name'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price*</FormLabel>
              <Input
                type='number'
                placeholder='Product Price'
                name='price'
                focusBorderColor='brown.500'
                value={price}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Offer Price*</FormLabel>
              <Input
                type='number'
                placeholder='Offer Price'
                name='offer_price'
                focusBorderColor='brown.500'
                value={offer_price}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Purchase Price*</FormLabel>
              <Input
                type='number'
                placeholder='Purchase Price'
                name='purchase_price'
                focusBorderColor='brown.500'
                value={purchase_price}
                onChange={updateExistingProductDetails}
              />
            </FormControl>


            <FormControl mt={4}>
              <FormLabel>Stock*</FormLabel>
              <Input
                type='number'
                placeholder='Product Stock'
                name='stock'
                focusBorderColor='brown.500'
                value={stock}
                onChange={updateExistingProductDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Product information</FormLabel>
              <Textarea
                placeholder='Product information'
                name='information'
                focusBorderColor='brown.500'
                value={information}
                onChange={updateExistingProductDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder='Product Description'
                name='description'
                focusBorderColor='brown.500'
                value={description}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status*</FormLabel>
              <Select
                placeholder='Select status'
                name='product_status'
                focusBorderColor='brown.500'
                value={product_status}
                onChange={updateExistingProductDetails}
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category*</FormLabel>
              <Select
                placeholder=''
                name='category'
                focusBorderColor='brown.500'
                value={category}
                onChange={updateExistingProductDetails}
              >
                {data.map((cat, index) => {
                  const { name, _id } = cat;
                  return (
                    <option value={_id}>{name}</option>
                  )
                })}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Add ons</FormLabel>
              <Input
                placeholder='add ons'
                name='add_ons'
                focusBorderColor='brown.500'
                value={add_ons}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Search Tags</FormLabel>
              <Input
                placeholder='search tags'
                name='search_tags'
                value={search_tags}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Selling Method*</FormLabel>
              <RadioGroup
                name='selling_method'
                onChange={(value) => updateExistingProductDetails({ target: { name: 'selling_method', value } })}
                value={selling_method}
              >
                <Stack spacing={4} direction='row'>
                  <Radio value='unit'>Unit</Radio>
                  <Radio value='weight'>Weight</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Sku</FormLabel>
              <Input
                placeholder='sku'
                name='sku'
                value={sku}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>HSN Code</FormLabel>
              <Input
                placeholder='HSN Code'
                name='barcode'
                value={barcode}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Stock Notify*</FormLabel>
              <Input
                type='number'
                placeholder='stock notify'
                name='stock_notify'
                value={stock_notify}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tax</FormLabel>
              <Input
                type='number'
                placeholder='tax'
                name='tax'
                value={tax}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Detail Min*</FormLabel>
              <Input
                type='number'
                placeholder='product detail min'
                name='product_detail_min'
                value={product_detail_min}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Detail Max*</FormLabel>
              <Input
                type='number'
                placeholder='product detail max'
                name='product_detail_max'
                value={product_detail_max}
                onChange={updateExistingProductDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Increment value*</FormLabel>
              <Input
                type='number'
                placeholder='Increment value'
                name='increment_value'
                value={increment_value}
                onChange={updateExistingProductDetails}
              />
              <FormControl mt={4}>
                <FormLabel>Variations</FormLabel>
                <HStack spacing={4}>
                  <Select
                    value={variant_type}
                    name='variant_type'
                    onChange={updateExistingProductDetails}
                    placeholder='Select variant type'
                    width='200px' // Adjust width as needed
                  >
                    {/* <option value='Size'>Size</option>
                  <option value='Color'>Color</option>
                  <option value='Material'>Material</option>
                  <option value='Style'>Style</option> */}
                    <option value='Weight/Volume'>Weight/Volume</option>
                  </Select>
                  <Input
                    type='text'
                    placeholder='Variant value'
                    name='variant_value'
                    value={variant_value}
                    onChange={updateExistingProductDetails}
                    width='200px' // Adjust width as needed
                  />
                </HStack>
              </FormControl>
              <Accordion allowToggle mt={4}>
                <AccordionItem>
                  <AccordionButton bg="green.100" borderRadius="md" _hover={{ bg: 'green.200' }}>
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      Product weight
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Box mb={4} fontSize="sm" color="brown.600">
                      Provide accurate information and streamline logistics with precise product weight details for shipping and handling.
                    </Box>
                    <SimpleGrid columns={2} spacing={4}>
                      <FormControl>
                        <FormLabel>Weight</FormLabel>
                        <Input placeholder="Eg. 10" name='product_weight' value={product_weight} onChange={updateExistingProductDetails} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Unit</FormLabel>
                        <Select placeholder="Please select" name='product_weight_type' value={product_weight_type} onChange={updateExistingProductDetails}>
                        <option value="kg">kg</option>
                        <option value="gram">g</option>
                        <option value="pkt">pkt</option>
                        <option value="pcs">pcs</option>
                        <option value="unit">unit</option>
                        <option value="l">ltr</option>
                        <option value="ml">ml</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

            </FormControl>
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
                {imageList.map((image, index) => {
                  return (
                    <VStack key={index} spacing={3}>
                      <Image
                        src={image?.secure_url ? image.secure_url : image}
                        boxSize='70px'
                        objectFit='cover'
                        borderRadius='lg'
                      />
                      <Button
                        size='xs'
                        variant='outline'
                        colorScheme='red'
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </Button>
                    </VStack>
                  );
                })}
              </HStack>
            </FormControl>


            <FormControl mt={4}>
              <Checkbox
                name="featured"
                colorScheme="brown"
                isChecked={featured} // Replace with the appropriate state, e.g., featured
                onChange={(event) => {
                  console.log(event.target.checked);
                  updateExistingProductDetails({
                    target: { name: 'featured', value: event.target.checked },
                  })
                }}
              >
                 Deal of the day
              </Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Updating Product'
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

export default UpdateProductModal;

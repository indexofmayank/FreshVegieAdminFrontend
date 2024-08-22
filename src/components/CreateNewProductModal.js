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
  Stack
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useProductContext } from '../context/product_context';
import { useCategoryContext } from '../context/category_context';

function CreateNewProductModal() {
  const {
    new_product: {
      name,
      product_status,
      price,
      offer_price,
      stock,
      description,
      category,
      add_ons,
      search_tags,
      selling_method,
      sku,
      barcode,
      stock_notify,
      tax,
      product_detail_max,
      product_detail_min,
      shipping,
      featured,
      purchase_price
    },
    updateNewProductDetails,
    createNewProduct,
  } = useProductContext();

  const {
    categoriesByName,
    fetchCategoryByName
  } = useCategoryContext();
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategoryByName();
  }, []);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImageList((prev) => {
          return [...prev, reader.result];
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  const removeImage = (index) => {
    setImageList((prev) => {
      prev.splice(index, 1);
      console.log(prev);
      return [...prev];
    });
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !product_status ||
      !price ||
      !offer_price ||
      !purchase_price ||
      !stock ||
      !description ||
      !category ||
      !add_ons ||
      !search_tags ||
      !selling_method ||
      !sku ||
      !barcode ||
      !stock_notify ||
      !tax ||
      !product_detail_min ||
      !product_detail_max ||
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
    console.log('uploading');
    const product = {
      name,
      product_status,
      price,
      offer_price,
      stock,
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
      featured,
      images: imageList,
    };
    const responseCreate = await createNewProduct(product);
    setLoading(false);
    if (responseCreate.success) {
      onClose();
      return toast({
        position: 'top',
        description: 'Product created',
        status: 'success',
        duration: 5000,
        isClosable: true,
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
  const {data = []} = categoriesByName;

  return (
    <>
      <Button colorScheme='brown' onClick={onOpen}>
        Create New Product
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Product Name'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type='number'
                placeholder='Product Price'
                name='price'
                focusBorderColor='brown.500'
                value={price}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Offer Price</FormLabel>
              <Input
                type='number'
                placeholder='Offer Price'
                name='offer_price'
                focusBorderColor='brown.500'
                value={offer_price}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Purchase Price</FormLabel>
            <Input
                type='number'
                placeholder='Purchase Price'
                name='purchase_price'
                focusBorderColor='brown.500'
                value={purchase_price}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Stock</FormLabel>
              <Input
                type='number'
                placeholder='Product Stock'
                name='stock'
                focusBorderColor='brown.500'
                value={stock}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder='Product Description'
                name='description'
                focusBorderColor='brown.500'
                value={description}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder='Select status'
                name='product_status'
                focusBorderColor='brown.500'
                value={product_status}
                onChange={updateNewProductDetails}
              >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder='Select category'
                name='category'
                focusBorderColor='brown.500'
                value={category}
                onChange={updateNewProductDetails}
              >
               {data.map((cat, index) => {
                const {name, _id} = cat;
                return(
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
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Search Tags</FormLabel>
              <Input
                placeholder='search tags'
                name='search_tags'
                value={search_tags}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Selling Method</FormLabel>
              <RadioGroup
                name='selling_method'
                onChange={(value) => updateNewProductDetails({ target: { name: 'selling_method', value } })}
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
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Barcode</FormLabel>
              <Input
                placeholder='barcode'
                name='barcode'
                value={barcode}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Stock Notify</FormLabel>
              <Input
                type='number' 
                placeholder='stock notify'
                name='stock_notify'
                value={stock_notify}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tax</FormLabel>
              <Input
                type='number'
                placeholder='tax'
                name='tax'
                value={tax}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Detail Min</FormLabel>
              <Input
                type='number'
                placeholder='product detail min'
                name='product_detail_min'
                value={product_detail_min}
                onChange={updateNewProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Detail Max</FormLabel>
              <Input
                type='number'
                placeholder='product detail max'
                name='product_detail_max'
                value={product_detail_max}
                onChange={updateNewProductDetails}
              />
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
                        src={image}
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
                name='featured'
                colorScheme='brown'
                isChecked={featured}
                onChange={updateNewProductDetails}
              >
                Featured
              </Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Creating Product'
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

export default CreateNewProductModal;

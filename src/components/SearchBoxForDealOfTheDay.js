import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  List,
  ListItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Checkbox,
  Image,
  Text,
  useToast
} from "@chakra-ui/react";
import { FaSistrix } from "react-icons/fa";
import { useDealOfTheDayContext } from "../context/dealoftheday_context";
import { UpdateDealOfTheDayModal } from "../components";

const SearchBoxForDealOfTheDay = () => {
  const {
    getDealOfTheDayForDropdown,
    fetchDealOfTheDayById,
    single_dealOfTheDay_loading,
    single_dealOfTheDay_error,
    single_dealOfTheDay,
    updateSingleDealOfTheDay,
    fetchDealOfTheDayForTable
  } = useDealOfTheDayContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentFeatureStatus, setCurrentFeatureStatus] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");


  useEffect(() => {
    setCurrentFeatureStatus(single_dealOfTheDay?.[0]?.featured);
  }, [single_dealOfTheDay]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        try {
          const response = await getDealOfTheDayForDropdown(query);
          setSuggestions(response?.data || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };
    fetchSuggestions();
  }, [query, getDealOfTheDayForDropdown]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Box position="relative">
      <InputGroup>
        <Input
          value={query}
          placeholder="Search deals..."
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 150);
          }}
        />
        <InputRightElement>
          <FaSistrix />
        </InputRightElement>
      </InputGroup>

      {showSuggestions && suggestions.length > 0 && (
        <Box
          position="absolute"
          bg="white"
          w="100%"
          zIndex={10}
          border="1px solid #e2e8f0"
          borderRadius="md"
          mt={2}
        >
          <List maxH="200px" overflowY="auto">
            {suggestions.map((suggestion, index) => {
              const { name, _id } = suggestion;
              return (
                <ListItem
                  key={index}
                  p={2}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={async () => {
                    onOpen();
                    setQuery(name);
                    setShowSuggestions(false);
                    setSelectedId(_id);
                    await fetchDealOfTheDayById(_id);
                  }}
                >
                  {name}
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Deal Of The Day</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text>{single_dealOfTheDay?.[0]?.name || ""}</Text>
              <Image
                src={single_dealOfTheDay?.[0]?.images || ""}
                boxSize="100px"
                objectFit="cover"
                borderRadius="lg"
              />
              <FormControl>
                <Checkbox
                  mt={4}
                  name="featured"
                  colorScheme="brown"
                  isChecked={currentFeatureStatus}
                  onChange={() => {
                    setCurrentFeatureStatus(!currentFeatureStatus);
                  }}
                >
                  Deal of the day
                </Checkbox>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button  mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="brown"
                isLoading={loading}
                loadingText="Updating Product"
                onClick={ async () => {
                  setLoading(true);
                  const response = await updateSingleDealOfTheDay(selectedId, currentFeatureStatus);
                  await fetchDealOfTheDayForTable();
                  setLoading(false);
                  onClose();
                  if(response.success) {
                    return toast({
                      position: 'top',
                      description: response.message,
                      status: 'success',
                      duration: 5000,
                      isClosable: true
                    });
                  } else {
                    return toast({
                      position: 'top',
                      description: response.message,
                      status: 'error',
                      duration: 5000,
                      isClosable: true
                    });
                  }
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
};

export default SearchBoxForDealOfTheDay;

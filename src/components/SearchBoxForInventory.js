import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputRightElement, Box, List, ListItem } from '@chakra-ui/react';
import { useInventoryContext } from '../context/inventory_context';
import { FaSistrix } from 'react-icons/fa';


const SearchBoxForInventory = ({ placeholder, onSelectProduct, category }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { fetchInventory, updateInventory } = useInventoryContext();

  const {
    inventoryProductName,
    inventoryProductName_loading,
    fetchProductByNameForInventory
  } = useInventoryContext();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        await fetchProductByNameForInventory(query, category);
      } else {
        setSuggestions(inventoryProductName);
      }
    };

    fetchSuggestions();
  }, [ query, category]);

  useEffect(() => {
    if (!inventoryProductName_loading) {
      setSuggestions(inventoryProductName || []);
    }
  }, [inventoryProductName, inventoryProductName_loading]);

  const handleInputChange = (e) => {
    const data = e.target.value;
    setQuery(data);
    setShowSuggestions(true);
  };


  const handleSelectSuggestion = (product) => {
    setQuery(product.name);
    setShowSuggestions(false);
    onSelectProduct(product); 
  };

  return (
    <Box position="relative">
      <InputGroup>
        <Input
          value={query}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={() => {
            setShowSuggestions(true)
          }}
        />
        <InputRightElement>
          <FaSistrix />
        </InputRightElement>
        {showSuggestions && suggestions.length > 0 && (
          <Box position="absolute" bg="white" w="100%" zIndex={10} border="1px solid #e2e8f0" borderRadius="md" mt={10}>
            <List maxH="200px" overflowY="auto">
              {suggestions.map((suggestion, index) => {
                const { name, _id } = suggestion;
                return (
                  <ListItem
                    key={index}
                    p={2}
                    cursor='pointer'
                    _hover={{ bg: 'gray.100' }}
                    onClick={ async () => {
                      handleSelectSuggestion(suggestion);
                      await fetchInventory('', '', '', _id);
                    }}
                  >
                    {name}
                  </ListItem>
                );
              })}
            </List>
          </Box>
        )}
      </InputGroup>
    </Box>
  );
};

export default SearchBoxForInventory;

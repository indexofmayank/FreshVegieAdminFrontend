import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputRightElement, Box, List, ListItem } from '@chakra-ui/react';
import { useInventoryContext } from '../context/inventory_context';

const SearchBoxForInventory = ({ placeholder, onSelectProduct, initialProductName = [] }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    inventoryProductName,
    inventoryProductName_loading,
    fetchProductByNameForInventory
  } = useInventoryContext();


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        await fetchProductByNameForInventory(query);
      } else {
        setSuggestions(inventoryProductName);
      }
    };

    fetchSuggestions();
  }, [query, fetchProductByNameForInventory]);

  useEffect(() => {
    if (!inventoryProductName_loading) {
      setSuggestions(inventoryProductName || []);
    }
  }, [inventoryProductName, inventoryProductName_loading]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (product) => {
    setQuery(product.name);
    setShowSuggestions(false);
    onSelectProduct(product); // Pass the selected product back to the parent component
  };
  console.log(suggestions);

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
          {/* Add any icon here if needed */}
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default SearchBoxForInventory;


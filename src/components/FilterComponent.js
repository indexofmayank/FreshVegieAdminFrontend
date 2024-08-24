import React from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  InputLeftElement,
  Checkbox,
  CheckboxGroup,
  Button,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  IconButton,
} from "@chakra-ui/react";
// import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";

function FilterComponent() {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        {/* <Button rightIcon={<ChevronDownIcon />} colorScheme="gray"> */}
        <Button  colorScheme="gray">
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent boxShadow="lg" borderRadius="md" width="350px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Tabs variant="soft-rounded" colorScheme="gray">
            <TabList>
              <Tab>Category</Tab>
              <Tab>Brand</Tab>
              <Tab>Availability</Tab>
              <Tab>Status</Tab>
            </TabList>

            <TabPanels>
              {/* Category Tab Panel */}
              <TabPanel>
                <InputGroup mb={4}>
                  <InputLeftElement pointerEvents="none">
                    {/* <SearchIcon color="gray.300" /> */}
                  </InputLeftElement>
                  <Input type="text" placeholder="Search category" />
                </InputGroup>

                <CheckboxGroup colorScheme="green">
                  <VStack align="start">
                    <Checkbox>Vegetables</Checkbox>
                    <Checkbox>Fruits</Checkbox>
                    <Checkbox>Flash Deal</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </TabPanel>

              {/* Other Tab Panels (Brand, Availability, Status) */}
              <TabPanel> {/* Placeholder for other filters */} </TabPanel>
            </TabPanels>
          </Tabs>

          <Box mt={4} display="flex" justifyContent="space-between">
            <Button variant="outline" colorScheme="gray">
              Clear All
            </Button>
            <Button colorScheme="blackAlpha">Apply Filter</Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default FilterComponent;

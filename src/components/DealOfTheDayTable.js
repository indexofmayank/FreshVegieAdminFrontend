import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  SimpleGrid,
  Image,
  FormControl,
  Checkbox,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  HStack,
  Text
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { UpdateDealOfTheDayModal } from "../components";

function DealOfTheDayTable({ dealOfTheDay, updatedDeals, setUpdatedDeals }) {
  
  const [allFeatured, setAllFeatured] = useState(true);

  useEffect(() => {
    if (dealOfTheDay && dealOfTheDay.length > 0) {
      setUpdatedDeals(
        dealOfTheDay.map((deal) => ({
          ...deal,
          featured: deal.featured || false,
        }))
      );
    }
  }, [dealOfTheDay]);

  const handleCheckboxChange = (index) => {
    const updated = [...updatedDeals];
    updated[index].featured = !updated[index].featured;
    setUpdatedDeals(updated);

    const changedDeals = updated.filter(
      (deal) => deal.isChecked !== deal.featured
    );
  };

  const handleAllFeatured = (e) => {
    setAllFeatured(!allFeatured);
    setUpdatedDeals( prevItems => 
      prevItems.map(item => ({
        ...item,
        featured: !allFeatured
      }))
    );
  }

  return (
    <SimpleGrid bg="white" p={5} shadow="lg" borderRadius="lg" overflowX="auto">
      <Table variant="striped" colorScheme="whiteAlpha" size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>
              <HStack>
              <Text>Featured</Text>
              <FormControl>
                <Checkbox
                  mt={3}
                  name="featured"
                  colorScheme="brown"
                  isChecked={allFeatured}
                  onChange={(e) => handleAllFeatured(e)}
                />
              </FormControl>
              </HStack>
            </Th>

            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {updatedDeals.length > 0 ? (
            updatedDeals.map((deal, index) => {
              const { name, image, _id, featured } = deal;
              return (
                <Tr key={index}>
                  <Td>{name}</Td>
                  <Td>
                    <Image
                      src={image}
                      boxSize="50px"
                      objectFit="content"
                      borderRadius="lg"
                    />
                  </Td>
                  <Td>
                    <FormControl>
                      <Checkbox
                        mt={3}
                        name="featured"
                        colorScheme="brown"
                        isChecked={featured}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </FormControl>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                        Actions
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <UpdateDealOfTheDayModal
                            id={_id}
                            name={name}
                            image={image}
                          />
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={4}>No data available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </SimpleGrid>
  );
}

export default DealOfTheDayTable;

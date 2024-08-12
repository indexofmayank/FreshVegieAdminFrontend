import React from 'react';
import { Input, InputGroup, InputRightElement, IconButton, Button, InputLeftElement, Select, option } from '@chakra-ui/react';
import { FaSistrix } from "react-icons/fa";

function SearchBox({ placeholder, onSearch }) {

    return (
        <InputGroup>
            <Input
                placeholder={placeholder || "Search..."}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch(e.target.value);
                    }
                }}
            />
            <InputLeftElement>
                <IconButton
                    aria-label="Search"
                    icon={<FaSistrix />}
                    onClick={() => onSearch(document.querySelector("input").value)}
                />
            </InputLeftElement>
        </InputGroup>
    );
}

export default SearchBox;
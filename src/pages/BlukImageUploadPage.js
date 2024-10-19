import React, { useEffect, useState }  from "react";
import {
    SidebarWithHeader,
    CreateAssestModal,
    AssestImageTable
} from '../components';
import {
    HStack,
    Button,
    VStack,
    Spinner,
    Heading,
    InputGroup,
    Input
} from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import {zipAssetUpload_url} from '../utils/constants';
import axios from "axios";


function BlukImageUploadPage() {
    const [assetList, setAssetList] = useState([]);
    const [assetSearchQuery, setAssetSearchQuery] = useState('');



    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateAssestModal />
                <Button
                    colorScheme="brown"
                    variant="outline"
                    leftIcon={<MdOutlineRefresh />}
                >   
                    Refresh
                </Button>
                <InputGroup>
                    <Input
                        placeholder="Search for asset"
                        name="Asset search query"
                        focusBorderColor="brown.500"
                        value={assetSearchQuery}
                        onChange={async (event) => {
                            setAssetSearchQuery(event.target.value);
                            const response = await axios.get(`${zipAssetUpload_url}?name=${event.target.value}`, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                }
                            });
                            const {success, data} = response.data;
                            setAssetList(data);
                        }}
                    />
                </InputGroup>
            </HStack>
            <AssestImageTable />
        </SidebarWithHeader>
    );
}

export default BlukImageUploadPage;
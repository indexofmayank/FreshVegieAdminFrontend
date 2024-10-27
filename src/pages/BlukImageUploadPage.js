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
    const loaddata = async () => {
        const response = await axios.get(`${zipAssetUpload_url}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        const {success, data} = response.data;
        setAssetList(data)
    }

    useEffect(() => {
       
        loaddata()
       
    }, []);

// console.log(assetList)
    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateAssestModal loaddata={loaddata}/>
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
            <AssestImageTable  assetList={assetList} />
        </SidebarWithHeader>
    );
}

export default BlukImageUploadPage;
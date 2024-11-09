import React, { useEffect, useState } from "react";
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
    Input,
    useToast
} from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { zipAssetUpload_url } from '../utils/constants';
import { deleteAsset_url } from '../utils/constants';
import axios from "axios";


function BlukImageUploadPage() {
    const [assetList, setAssetList] = useState([]);
    const [assetSearchQuery, setAssetSearchQuery] = useState('');
    const toast = useToast();


    // useEffect(() => {

        const loaddata = async () => {
            const response = await axios.get(`${zipAssetUpload_url}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const { success, data } = response.data;
            setAssetList(data)
        }

        useEffect(() => {

            loaddata()

        }, []);

        const handleDelete = async (id) => {
            const response = await axios.delete(`${deleteAsset_url}${id}`);
            console.log(response);
            const { success, data } = response.data;
            if (success) {
                const responseTwo = await axios.get(`${zipAssetUpload_url}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                const { success, data } = responseTwo.data;
                setAssetList(data)
                return toast({
                    position: 'top',
                    description: 'Asset deleted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                });
            } else {
                return toast({
                    position: 'top',
                    description: data,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
            }
        }

        console.log(assetList)
        return (
            <SidebarWithHeader>
                <HStack mb={5}>
                    <CreateAssestModal loaddata={loaddata} />
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
                                const { success, data } = response.data;
                                setAssetList(data);
                            }}
                        />
                    </InputGroup>
                </HStack>
                <AssestImageTable assetList={assetList} handleDelete={handleDelete} />
            </SidebarWithHeader>
        );
    }

export default BlukImageUploadPage;
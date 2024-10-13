import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    SidebarWithHeader,
    ImagesList,
    SingleProductInfo,
    SingleProductReviews,
  } from '../components';
import { Stack } from '@chakra-ui/react';
  

function EditOrderPage() {

    const { id } = useParams();

    console.log(id)
    return (
        <SidebarWithHeader>
           <Stack>
                <p>{id}</p>
            </Stack> 
        </SidebarWithHeader>
    )
}

export default EditOrderPage;